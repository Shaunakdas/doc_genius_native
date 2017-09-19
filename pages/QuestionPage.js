import React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator, Platform, Keyboard, TextInput } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import IMAGES from '../common/images';
import COLORS, { alpha } from '../common/colors';
import { commonStyle as cs, font, fullWidth, fullHeight, questionPageStyle as s } from '../common/styles';
import { STUDENT_ROLE } from '../common/constants';
import { questionAPI } from '../common/api';
import { getCategoryById, getUserImage } from '../common/helper';
import { IconButton } from '../components';

const defaultInputHeight = 19.5;

class QuestionPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    filters: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    const { navigation } = props;
    const { params = {} } = navigation.state;
    const { id, category_id } = params;
    this.state = {
      id,
      question: null,
      loading: true,
      category: getCategoryById(props.categories, category_id),
      inputHeight: defaultInputHeight,
      keyboardHeight: 0,
      backedupInputHeight: undefined,
      reply_to_post_number: null,
      reply: '',
    };
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', this.keyBoardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', this.keyBoardDidHide);
  }

  async componentDidMount() {
    await this.fetchQuestion();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.filters.length !== this.props.filters.length) {
      await this.fetchQuestion(nextProps.filters);
    }
  }

  componentWillUnmount() {
    this.keyboardDidHideSub.remove();
    this.keyboardDidShowSub.remove();
  }

  onInputHeightChange = (event) => {
    let inputHeight = event.nativeEvent.contentSize.height;
    if (Platform.OS === 'ios') {
      const width = event.nativeEvent.contentSize.width;
      if (width > fullWidth - 85) {
        inputHeight = 19.5 * Math.ceil((width) / (fullWidth - 85));
      }
    }
    this.setState({ inputHeight: Math.min(inputHeight, 150) });
  }

  onChangeText = reply => this.setState({ reply });

  fetchQuestion = async () => {
    const { authToken } = this.props;
    const { id } = this.state;
    const question = await questionAPI(authToken, id) || {};
    this.setState({ question, loading: false });
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  keyBoardDidShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    this.setState({ keyboardHeight });
  }

  keyBoardDidHide = () => {
    this.setState({
      keyboardHeight: 0,
    });
  }

  renderUser = (user_id) => {
    const user = this.state.question.user_stream[user_id];
    const image = getUserImage(user);
    let [ display, ...ignore ] = user.name.split(' '); // eslint-disable-line
    if (user.user_fields.role === STUDENT_ROLE) {
      const grade = 12 - (user.user_fields.graduation_year - 2017);
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

  renderButtons = (post) => {
    const isQuestion = post.posts_count > 0;
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text
          style={{
            ...font(9),
            marginRight: 3,
            marginLeft: 10,
            color: COLORS.SECONDARY,
          }}
        >
          {post.like_count}
        </Text>
        <Image
          source={IMAGES.HEART}
          style={{
            height: 16,
            width: 16,
            resizeMode: 'contain',
            marginRight: 12,
          }}
        />
        {!isQuestion ? <Image
          source={IMAGES.REPLY}
          style={{
            height: 16,
            width: 16,
            resizeMode: 'contain',
            marginRight: 5,
          }}
        /> : null}
      </View>
    );
  };

renderQ = question => (
  <View
    style={{
      margin: 8,
      backgroundColor: COLORS.WHITE,
      borderRadius: 10,
      padding: 6,
      overflow: 'hidden',
    }}
  >
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
          numberOfLines={2}
          style={{
            ...font(13),
            marginBottom: 8,
            marginTop: 12,
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
  </View>
)
  renderA = (answer, index) => {
    const isReply = !!answer.reply_to_post_number;
    return (
      <View
        style={{
          borderTopWidth: index ? 1 : 0,
          borderColor: '#B1E0EC',
          paddingLeft: 15,
          paddingTop: index ? 12 : 4,
          marginBottom: 4,
          marginTop: 4,
          paddingBottom: 4,
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
            numberOfLines={2}
            style={{
              ...font(13),
              marginBottom: 8,
              marginTop: 12,
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

  renderAs = answers => (
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
      {answers.map(this.renderA)}
    </View>
  )

  renderQA = (detail) => {
    const question = {
      ...detail,
      ...detail.post_stream[0],
    };
    const answers = detail.post_stream.slice(1);
    return (<View>
      {this.renderQ(question)}
      {answers.length ? this.renderAs(answers) : null}
    </View>);
  }

  render() {
    const { inputHeight, keyboardHeight = 0 } = this.state;
    const extraHeight = inputHeight === defaultInputHeight ? 85 : 78;
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
          <Text style={cs.headerText}> {category.name} </Text>
        </View>
        <View style={{ height: availableHeight }}>
          <ScrollView
            style={{ flex: 1 }}
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
            />
            <IconButton
              source={IMAGES.SEND}
              style={s.sendButton}
              imageStyle={s.sendImage}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps
  = ({ filters, loginState: { authToken }, categories }) => ({ filters, authToken, categories });

export default connect(mapStateToProps)(QuestionPage);
