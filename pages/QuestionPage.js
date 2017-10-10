import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
  Keyboard,
  TextInput,
  RefreshControl } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';

import IMAGES from '../common/images';
import COLORS, { alpha } from '../common/colors';
import { commonStyle as cs, font, fullWidth, fullHeight, questionPageStyle as s } from '../common/styles';
import { STUDENT_ROLE } from '../common/constants';
import { questionAPI, createAnswerAPI, unlikePostAPI, likePostAPI, updateAnswerAPI, deleteAnswerAPI } from '../common/api';
import { getCategoryById, getUserImage } from '../common/helper';
import { IconButton, Button } from '../components';

const defaultInputHeight = 19.5;

class QuestionPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const { navigation } = props;
    const { params = {} } = navigation.state;
    const { id, category_id = null } = params;
    this.state = {
      id,
      question: null,
      loading: true,
      category: category_id ? getCategoryById(props.categories, category_id) : null,
      inputHeight: defaultInputHeight,
      keyboardHeight: 0,
      backedupInputHeight: undefined,
      reply_to_post_number: null,
      reply: '',
      refreshing: false,
      liking: false,
      swipedOutId: null,
      originalReply: '',
    };
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', this.keyBoardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', this.keyBoardDidHide);
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const { focusReply = false } = params;
    if (focusReply && this.input) {
      this.input.focus();
    }
    await this.fetchQuestion();
  }

  componentWillUnmount() {
    this.keyboardDidHideSub.remove();
    this.keyboardDidShowSub.remove();
  }

  onRefresh = () => {
    this.setState({ refreshing: true, swipedOutId: null });
    this.fetchQuestion();
  }

  onInputHeightChange = (event) => {
    let inputHeight = event.nativeEvent.contentSize.height;
    if (Platform.OS === 'ios') {
      const width = event.nativeEvent.contentSize.width;
      if (width > fullWidth - 75) {
        inputHeight = 19.5 * Math.ceil((width) / (fullWidth - 75));
      }
    }
    this.setState({ inputHeight: Math.min(inputHeight, 150) });
  }

  onChangeText = reply => this.setState({ reply });

  onEdit = reply =>
    () => this.setState({ reply, reply_to_post_number: null, originalReply: reply }, this.focus);

  resetSwipeOnScroll = () => {
    if (!this.state.keyboardHeight) {
      this.setState({ swipedOutId: null, originalReply: '' });
    }
  }

  adjustScroll = () => {
    if (this.scrollView) {
      setTimeout(() => this.scrollView.scrollToEnd({ animated: false }), 500);
    }
  }

  processQuestion = (question) => {
    const details = question.details_stream.details;
    const post_stream = details.post_stream;
    const replies = {};
    const new_stream = [];
    const post_structure = {};
    post_stream.forEach((post) => {
      if (post.reply_to_post_number) {
        post_structure[post.reply_to_post_number] = post_structure[post.reply_to_post_number] || [];
        post_structure[post.reply_to_post_number].push(post.post_number);
      } else {
        post_structure[post.post_number] = [];
        new_stream.push(post);
      }
      replies[post.post_number] = post;
    });
    details.post_stream = new_stream;
    details.replies = replies;
    details.post_structure = post_structure;
    return {
      ...question,
      details_stream: {
        ...question.details_stream,
        details,
      },
    };
  };

  fetchQuestion = async () => {
    const { authToken } = this.props;
    const { id } = this.state;
    const question = await questionAPI(authToken, id, 1, 50) || {};
    if (question.success !== false) {
      const processedQuestion = this.processQuestion(question);
      let category = this.state.category;
      if (category === null) {
        const { category_id } = processedQuestion.details_stream.details;
        category = getCategoryById(this.props.categories, category_id);
      }
      this.setState({ question: processedQuestion, loading: false, category, refreshing: false });
    }
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  handleSwipeOut = (_, swipedOutId) => {
    this.setState({ swipedOutId });
  }

  keyBoardDidShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    this.setState({ keyboardHeight });
  }

  keyBoardDidHide = () => {
    const { reply, reply_to_post_number } = this.state;
    this.setState({
      keyboardHeight: 0,
      reply_to_post_number: reply.length ? reply_to_post_number : null,
    });
  }

  focus = () => {
    if (this.input) { this.input.focus(); }
  }

  replyTo = post => () => {
    this.setState({
      swipedOutId: null,
      reply_to_post_number:
        post.reply_to_post_number ? post.reply_to_post_number : post.post_number,
    }, this.focus);
  }

  toggleLikeOnPost = postId => (post) => {
    if (post.id === postId) {
      return {
        ...post,
        current_user_liked: !post.current_user_liked,
        like_count: post.like_count + (post.current_user_liked ? -1 : 1),
      };
    }
    return post;
  }

  toggleLikeOnStream = (postId, postNumber) => {
    const { question } = this.state;
    const details = question.details_stream.details;
    const replies = details.replies;
    const post_stream = details.post_stream;
    const newQuestion = {
      ...question,
      details_stream: {
        ...question.details_stream,
        details: {
          ...details,
          post_stream: post_stream.map(this.toggleLikeOnPost(postId)),
          replies: {
            ...replies,
            [postNumber]: {
              ...replies[postNumber],
              current_user_liked: !replies[postNumber].current_user_liked,
              like_count: replies[postNumber].like_count +
              (replies[postNumber].current_user_liked ? -1 : 1),
            },
          },
        },
      },
    };
    this.setState({ question: newQuestion });
  }

  likeOrUnlikePost = post => async () => {
    const { currentUserId, authToken } = this.props;
    const { user_id, current_user_liked, id, post_number } = post;
    this.setState({ liking: true });
    if (user_id !== currentUserId) {
      let response = null;
      this.toggleLikeOnStream(id, post_number);
      if (current_user_liked) {
        response = await unlikePostAPI(authToken, id);
      } else {
        response = await likePostAPI(authToken, id);
      }
      if (response.success === false) {
        this.toggleLikeOnStream(id, post_number);
      }
      this.setState({ liking: false });
    }
  }

  addPostToStream = (user, post) => {
    const { question } = this.state;
    const user_stream = question.user_stream;
    const details = question.details_stream.details;
    const replies = details.replies;
    const post_stream = details.post_stream;
    const post_structure = details.post_structure;
    const newQuestion = {
      ...question,
      user_stream: {
        ...user_stream,
        [user.id]: user,
      },
      details_stream: {
        ...question.details_stream,
        details: {
          ...details,
          post_stream: !post.reply_to_post_number ? [...post_stream, post] : post_stream,
          replies: {
            ...replies,
            [post.post_number]: post,
          },
          post_structure: !post.reply_to_post_number ? {
            ...post_structure,
            [post.post_number]: [],
          } : {
            ...post_structure,
            [post.reply_to_post_number]: [
              ...post_structure[post.reply_to_post_number],
              post.post_number,
            ],
          },
        },
      },
    };
    this.setState({ question: newQuestion }, () => {
      if (!post.reply_to_post_number) {
        this.adjustScroll();
      }
    });
  }

  editReplyOnPost = (postId, reply) => (post) => {
    if (post.id === postId) {
      return {
        ...post,
        raw: reply,
      };
    }
    return post;
  }

  editReplyOnStream = (answerId, reply) => {
    const { question } = this.state;
    const details = question.details_stream.details;
    const replies = details.replies;
    const post_stream = details.post_stream;
    const newReplies = Object.keys(replies).reduce((tillNow, id) => {
      const post = replies[id];
      tillNow[id] = { // eslint-disable-line no-param-reassign
        ...post,
        raw: post.id === answerId ? reply : post.raw,
      };
      return tillNow;
    }, {});
    const newQuestion = {
      ...question,
      details_stream: {
        ...question.details_stream,
        details: {
          ...details,
          post_stream: post_stream.map(this.editReplyOnPost(answerId, reply)),
          replies: {
            ...newReplies,
          },
        },
      },
    };
    this.setState({ question: newQuestion });
  }

  deleteOnStream = (answerId) => {
    const { question } = this.state;
    const details = question.details_stream.details;
    const replies = details.replies;
    const post_stream = details.post_stream;
    const newReplies = Object.keys(replies).reduce((tillNow, id) => {
      const post = replies[id];
      if (post.id !== answerId) {
        tillNow[id] = post; // eslint-disable-line no-param-reassign
      }
      return tillNow;
    }, {});
    const newQuestion = {
      ...question,
      details_stream: {
        ...question.details_stream,
        details: {
          ...details,
          post_stream: post_stream.filter(post => post.id !== answerId),
          replies: {
            ...newReplies,
          },
        },
      },
    };
    this.setState({ question: newQuestion });
  }

  deleteReply = id => async () => {
    const { authToken } = this.props;
    this.setState({
      reply: '',
      reply_to_post_number: null,
      swipedOutId: null,
      originalReply: '',
      refreshing: true,
    });
    Keyboard.dismiss();
    const response = await deleteAnswerAPI(authToken, id);
    if (response.success !== false) {
      this.deleteOnStream(id);
    }
    this.setState({
      refreshing: false,
    });
  }

  submitReply = async () => {
    const { reply, reply_to_post_number, question, swipedOutId, originalReply } = this.state;
    const { authToken, currentUser } = this.props;
    this.setState({
      reply: '',
      reply_to_post_number: null,
      swipedOutId: null,
      originalReply: '',
      refreshing: true,
    });
    Keyboard.dismiss();
    if (reply === null || reply.length === 0) {
      this.setState({
        refreshing: false,
      });
      return;
    }
    if (swipedOutId) {
      if (reply === originalReply) {
        this.setState({
          refreshing: false,
        });
        return;
      }
      const response = await updateAnswerAPI(authToken, reply, swipedOutId);
      if (response.success !== false) {
        this.editReplyOnStream(swipedOutId, reply);
      }
    } else {
      const response =
      await createAnswerAPI(authToken,
          reply,
          question.details_stream.details.id,
          reply_to_post_number);
      if (response.success !== false) {
        const post = {
          created_at: response.created_at,
          post_number: response.post_number,
          raw: response.cooked.replace(/(<([^>]+)>)/ig, ''),
          id: response.id,
          reply_to_post_number,
          reply_count: 0,
          like_count: 0,
          user_id: currentUser.id,
          current_user_liked: false,
        };
        const user = {
          ...currentUser,
          user_fields: currentUser,
        };
        this.addPostToStream(user, post);
      }
    }
    this.setState({
      refreshing: false,
    });
  }

  renderUser = (user_id) => {
    const user = this.state.question.user_stream[user_id];
    const image = getUserImage(user);
    let [ display, ...ignore ] = user.name.split(' '); // eslint-disable-line
    if (user.user_fields.role === STUDENT_ROLE) {
      const grade = Math.min(12 - (user.user_fields.graduation_year - 2018), 12);
      display = `${display} (${grade}th)`;
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: (fullWidth / 2) - 35,
          paddingRight: 5 }}
      >
        <Image
          source={image}
          style={{
            height: 20,
            width: 20,
            borderRadius: 4,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            ...font(11),
            marginLeft: 6,
          }}
          numberOfLines={1}
        >
          {display}
        </Text>
      </View>
    );
  }

  renderTime = time => (
    <Text style={{
      flex: 1,
      marginRight: 8,
      ...font(10),
      color: COLORS.SECONDARY,
    }}
    >
      {moment(time).fromNow()}
    </Text>
  )
  renderDeleteButton = id => (
    <Button
      text="Delete"
      style={{
        backgroundColor: COLORS.DELETE_BG,
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      imageStyle={{
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginBottom: 10,
      }}
      imageSource={IMAGES.TRASH}
      textStyle={{
        textAlign: 'center',
        ...font(14),
        color: COLORS.WHITE,
      }}
      onPress={this.deleteReply(id)}
    />
  );

  renderEditButton = text => (
    <Button
      text="Edit"
      style={{
        backgroundColor: COLORS.EDIT_BG,
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      imageStyle={{
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginBottom: 10,
      }}
      imageSource={IMAGES.ESSAY}
      textStyle={{
        textAlign: 'center',
        ...font(14),
        color: COLORS.WHITE,
      }}
      onPress={this.onEdit(text)}
    />
  );

  renderButtons = (post) => {
    const isQuestion = post.posts_count > 0;
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text
          style={{
            ...font(11),
            marginRight: 0,
            color: COLORS.SECONDARY,
          }}
        >
          {post.like_count}
        </Text>
        <IconButton
          source={post.current_user_liked ? IMAGES.HEART_FILL : IMAGES.HEART}
          style={{
            marginRight: 5,
            padding: 10,
            paddingLeft: 5,
          }}
          imageStyle={{
            height: 16,
            width: 16,
            resizeMode: 'contain',
          }}
          onPress={this.likeOrUnlikePost(post)}
        />
        {!isQuestion ?
          <IconButton
            source={IMAGES.REPLY}
            onPress={this.replyTo(post)}
            style={{
              marginRight: 5,
              padding: 10,
              paddingLeft: 5,
            }}
            imageStyle={{
              height: 16,
              width: 16,
              resizeMode: 'contain',
            }}
          /> : null}
      </View>
    );
  };

  renderQ = (question) => {
    const { currentUser } = this.props;
    const isCurrentUser = question.user_id === currentUser.id;
    const swipeoutBtns = [
      {
        component: this.renderEditButton(question.raw),
      },
    ];
    return (
      <View
        style={{
          margin: 8,
          backgroundColor: COLORS.WHITE,
          borderRadius: 10,
          padding: 6,
          overflow: 'hidden',
        }}
      >
        {isCurrentUser ? (
          <Swipeout
            rowID={question.id}
            right={swipeoutBtns}
            backgroundColor={COLORS.TRANSPARENT}
            autoClose
            onOpen={this.handleSwipeOut}
            close={question.id !== this.state.swipedOutId}
            buttonWidth={80}
          >
            {this.renderQInner(question)}
          </Swipeout>
        ) : this.renderQInner(question)}
      </View>);
  }

  renderQInner = question => (
    <View style={{
      padding: 5,
      paddingRight: 8,
    }}
    >
      <Text
        style={{
          position: 'absolute',
          top: 14,
          left: -14,
          ...font(40),
          color: alpha(COLORS.SECONDARY, 0.3),
        }}
      >
          Q
      </Text>
      <View style={{
        paddingLeft: 15,
        paddingBottom: 4,
      }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {this.renderUser(question.user_id)}
          {this.renderButtons(question)}
        </View>
        <Text
          style={{
            ...font(13),
            marginBottom: 8,
            marginTop: 2,
          }}
        >
          {question.raw}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {this.renderTime(question.created_at)}
        </View>
      </View>
    </View>
  )

  renderA = (answer, showBorder) => {
    if (!answer) return null;
    const { currentUser } = this.props;
    const isCurrentUser = answer.user_id === currentUser.id;
    const swipeoutBtns = [
      {
        component: this.renderEditButton(answer.raw),
      },
      {
        component: this.renderDeleteButton(answer.id),
      },
    ];
    return isCurrentUser ? (
      <Swipeout
        rowID={answer.id}
        right={swipeoutBtns}
        backgroundColor={COLORS.TRANSPARENT}
        autoClose
        onOpen={this.handleSwipeOut}
        close={answer.id !== this.state.swipedOutId}
        buttonWidth={80}
      >
        {this.renderAInner(answer, showBorder)}
      </Swipeout>
    ) : this.renderAInner(answer, showBorder);
  }

  renderAInner = (answer, showBorder) => {
    const isReply = !!answer.reply_to_post_number;
    return (
      <View
        style={{
          borderTopWidth: showBorder ? 1 : 0,
          borderColor: '#B1E0EC',
          paddingLeft: 15,
          paddingTop: showBorder ? 12 : 4,
          marginBottom: 1,
          marginTop: 1,
          paddingBottom: 2,
        }}
        key={answer.id}
      >
        <View
          style={isReply ? {
            borderLeftColor: COLORS.PRIMARY,
            borderLeftWidth: 4,
            paddingLeft: 6,
          } : null}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {this.renderUser(answer.user_id)}
            {this.renderButtons(answer)}
          </View>
          <Text
            style={{
              ...font(13),
              marginBottom: 2,
              marginTop: 2,
            }}
          >
            {answer.raw}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {this.renderTime(answer.created_at)}
          </View>
        </View>
      </View>
    );
  };

  renderAs = (detail) => {
    const replies = detail.replies;
    const post_structure = detail.post_structure;
    return (
      <View
        style={{
          margin: 8,
          backgroundColor: COLORS.WHITE,
          borderRadius: 10,
          padding: 6,
          overflow: 'hidden',
        }}
      >
        <Text
          style={{
            position: 'absolute',
            top: 24,
            left: -4,
            ...font(40),
            color: alpha(COLORS.SECONDARY, 0.3),
          }}
        >
        A
        </Text>
        {Object.keys(post_structure).slice(1).map((post_id, index) => {
          const threads = post_structure[post_id];
          return (<View key={post_id}>
            {this.renderA(replies[post_id], index > 0)}
            {threads.map(thread => this.renderA(replies[thread], true))}
          </View>);
        })}
      </View>
    );
  }

  renderQA = (detail) => {
    const question = {
      ...detail,
      ...detail.post_stream[0],
    };
    const showAnswers = question.replies && Object.keys(question.replies).length > 1;
    return (<View>
      {this.renderQ(question)}
      {showAnswers ? this.renderAs(detail) : null}
    </View>);
  }

  render() {
    const { inputHeight, keyboardHeight = 0, refreshing } = this.state;
    const extraHeight = inputHeight === defaultInputHeight ? 93 : 85;
    const availableHeight = fullHeight - inputHeight - keyboardHeight - extraHeight;
    const { loading, question, category } = this.state;
    const { details_stream } = question || {};
    return (
      <View
        style={[cs.container, { backgroundColor: alpha(COLORS.PRIMARY, 0.3) }]}
      >
        <View style={cs.header}>
          <Image
            source={IMAGES.HEADER_BG}
            style={cs.headerImage}
          />
          <IconButton
            source={IMAGES.BACK}
            onPress={this.goBack}
            style={[cs.backButton, { top: 22 }]}
            imageStyle={cs.backImage}
          />
          <Text style={cs.headerText}> {category ? category.name : 'Loading ...'} </Text>
        </View>
        <View style={{ height: availableHeight }}>
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                onRefresh={this.onRefresh}
                refreshing={refreshing}
              />
            }
            ref={scrollView => this.scrollView = scrollView}
          >
            { loading ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginHorizontal: 40,
                  marginTop: 20,
                }}
              >
                <ActivityIndicator
                  size={Platform.OS === 'ios' ? 1 : 20}
                  color={COLORS.SECONDARY}
                />
              </View>
            ) : this.renderQA(details_stream.details)
            }
          </ScrollView>
        </View>
        <View style={s.inputWrapper}>
          <View
            style={s.inputContainer}
          >
            <TextInput
              style={[s.input, { height: inputHeight }]}
              multiline
              onContentSizeChange={this.onInputHeightChange}
              underlineColorAndroid={COLORS.TRANSPARENT}
              value={this.state.reply}
              onChangeText={this.onChangeText}
              ref={input => this.input = input}
            />
            <IconButton
              source={IMAGES.SEND}
              style={s.sendButton}
              imageStyle={s.sendImage}
              onPress={this.submitReply}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps
  = ({ loginState: { authToken }, categories, currentUser }) =>
    ({ authToken, categories, currentUserId: currentUser.id, currentUser });

export default connect(mapStateToProps)(QuestionPage);
