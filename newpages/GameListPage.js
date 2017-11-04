import React from 'react';
import {
  Text,
  View,
  // Image,
  // TextInput,
  // TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import moment from 'moment';
import { Font } from 'expo';

// import IMAGES from '../common/images';
import COLORS, { alpha } from '../common/colors';
import { commonStyle as cs, font } from '../common/styles';
// import { IconButton } from '../components';
import { GamesList, SignUpForm, GameDetails } from '../components';
// import { STUDENT_ROLE, COUNSELOR_ROLE } from '../common/constants';
import { gamesAPI } from '../common/api';
// import { getCategoryById, getUserImage } from '../common/helper';

class GameListPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    // filters: PropTypes.array.isRequired,
    // categories: PropTypes.array.isRequired,
    // forumNumber: PropTypes.number.isRequired,
    // currentUser: PropTypes.object.isRequired,
    authToken: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      // searchTerm: '',
      questions: null,
      refreshing: false,
      loading: false,
      currentPage: 1,
      addingMore: false,
      total: 0,
      fontLoaded: false,
    };
  }
  // async componentWillMount() {
  //   await Font.loadAsync({
  //     'Roboto': require('native-base/Fonts/Roboto.ttf'),
  //     'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  //   });
  //   this.setState({ fontLoaded: true });
  // }
  async componentDidMount() {
    await this.fetchPosts(true);
  }

  // async componentWillReceiveProps(nextProps) {
  //   const newValues = nextProps.filters.sort((a, b) => a.id > b.id).map(a => a.id).join();
  //   const oldValues = this.props.filters.sort((a, b) => a.id > b.id).map(a => a.id).join();
  //   if (oldValues !== newValues) {
  //     await this.fetchPosts(nextProps.filters, true);
  //   } else if (nextProps.forumNumber !== this.props.forumNumber) {
  //     await this.fetchPosts();
  //   }
  // }

  // onSearchInputChange = (searchTerm) => {
  //   this.setState({
  //     searchTerm,
  //   });
  // }

  // onSubmit = () => {
  //   this.fetchPosts(null, true);
  // }

  onRefresh = () => {
    if (!this.state.refreshing) {
      this.fetchPosts();
    }
  }

  // clearSearch = () => {
  //   this.setState({
  //     searchTerm: '',
  //   }, () => this.fetchPosts(null, true));
  // }

  fetchPosts = (loading = false) => {
    const { authToken } = this.props;
    // const filters = sentFilters || this.props.filters;
    // const { searchTerm } = this.state;
    this.setState({ loading, refreshing: !loading, questions: null }, async () => {
      const questions = await gamesAPI(authToken) || {};
      // console.log(questions);
      let total = false;
      if (questions && questions.id_stream && questions.id_stream.topic_list) {
        total = questions.id_stream.topic_list.length;
      }
      this.setState({ questions, loading: false, refreshing: false, currentPage: 1, total });
    });
  }

  addPosts = async () => {
    const { authToken, filters } = this.props;
    const {
      searchTerm,
      addingMore,
      currentPage,
      refreshing,
      questions,
      total,
    } = this.state;
    const hasMore = questions && questions.details_stream &&
      total > questions.details_stream.length;
    if (!addingMore && !refreshing && hasMore) {
      this.setState({ addingMore: true });
      const nextQuestions = await gamesAPI(authToken, filters, searchTerm, currentPage + 1);
      if (nextQuestions && nextQuestions.details_stream && nextQuestions.details_stream) {
        const resultQuestions = {
          ...questions,
          details_stream: [
            ...questions.details_stream,
            ...nextQuestions.details_stream,
          ],
          user_stream: {
            ...questions.user_stream,
            ...nextQuestions.user_stream,
          },
        };
        this.setState({
          addingMore: false,
          currentPage: currentPage + 1,
          questions: resultQuestions,
        });
      } else {
        this.setState({ addingMore: false });
      }
    }
  }

  openDrawer = () => {
    this.props.navigation.navigate('DrawerOpen');
  }

  // selectCategory = () => {
  //   const { navigation } = this.props;
  //   navigation.navigate('CategorySelectionPage', { fromForum: true });
  // }


  goToQuestion = (question, focusReply = false) => () => {
    const { navigation } = this.props;
    navigation.navigate('QuestionPage', { id: question.id, category_id: question.category_id, focusReply });
  }

  keyExtractor = detail => detail.id;

  // isUserCounselor = (user_id) => {
  //   const user = this.state.questions.user_stream[user_id];
  //   return (user.user_fields.role === COUNSELOR_ROLE || user.username === 'cherylbot');
  // }

  // renderUser = (user_id, time) => {
  //   const { currentUser } = this.props;
  //   const user = this.state.questions.user_stream[user_id];
  //   const isCurrentUser = currentUser.id === user.id;
  //   const image = isCurrentUser ? currentUser.image : getUserImage(user);
  //   const isChatBot = user.username === 'cherylbot';
  //   let [ display, ...ignore ] = user.name.split(' '); // eslint-disable-line
  //   if (user.user_fields.role === STUDENT_ROLE) {
  //     const grade = Math.min(12 - (user.user_fields.graduation_year - 2018), 12);
  //     display = `${display} (${grade}th)`;
  //   } else {
  //     display = `${display} (Counselor)`;
  //   }
  //   return (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         width: fullWidth - 160,
  //         paddingRight: 5,
  //       }}
  //     >
  //       <Image
  //         source={image}
  //         style={{
  //           height: 20,
  //           width: 20,
  //           borderRadius: 4,
  //           resizeMode: 'contain',
  //         }}
  //       />
  //       <Text
  //         style={{
  //           ...font(11),
  //           marginLeft: 2,
  //           flex: 1,
  //         }}
  //         numberOfLines={1}
  //       >
  //         {isChatBot ? 'Cheryl (Bot)' : display}
  //       </Text>
  //       <Text
  //         style={{
  //           ...font(11),
  //           color: COLORS.SECONDARY,
  //           width: 38,
  //         }}
  //         numberOfLines={1}
  //       >
  //         {moment(time).fromNow()}
  //       </Text>
  //     </View>
  //   );
  // }

  // renderTime = time => (
  //   <Text
  //     style={{
  //       flex: 1,
  //       marginRight: 8,
  //       ...font(11),
  //       color: COLORS.SECONDARY,
  //     }}
  //     numberOfLines={1}
  //   >
  //     {moment(time).fromNow()}
  //   </Text>
  // )

  // renderButtons = (post, detail) => {
  //   const reply_count = post.posts_count ? post.posts_count - 1 : post.reply_count;
  //   const showAnswer = post.posts_count && post.posts_count > 1;
  //   return (
  //     <View style={{ flexDirection: 'row' }}>
  //       <Text
  //         style={{
  //           ...font(11),
  //           marginRight: 3,
  //           color: COLORS.SECONDARY,
  //         }}
  //       >
  //         {post.like_count}
  //       </Text>
  //       <Image
  //         source={post.current_user_liked ? IMAGES.HEART_FILL : IMAGES.HEART}
  //         style={{
  //           marginRight: 12,
  //           height: 16,
  //           width: 16,
  //           resizeMode: 'contain',
  //         }}
  //       />
  //       <Text
  //         style={{
  //           ...font(11),
  //           marginRight: 3,
  //           marginLeft: 10,
  //           color: COLORS.SECONDARY,
  //         }}
  //       >
  //         {reply_count}
  //       </Text>
  //       {
  //         showAnswer ?
  //           (<Image
  //             source={IMAGES.ANSWERS}
  //             style={{
  //               height: 16,
  //               width: 16,
  //               resizeMode: 'contain',
  //               marginRight: 5,
  //             }}
  //           />) :
  //           (<IconButton
  //             source={IMAGES.REPLY}
  //             style={{ marginRight: 5,
  //             }}
  //             imageStyle={{
  //               height: 16,
  //               width: 16,
  //               resizeMode: 'contain',
  //             }}
  //             onPress={this.goToQuestion(detail, true)}
  //           />
  //           )
  //       }
  //     </View>
  //   );
  // };

  // renderCategoryLabel = category => (category && category.name ?
  //   <View style={{
  //     flexDirection: 'row',
  //     justifyContent: 'flex-end',
  //   }}
  //   >
  //     <View style={{
  //       backgroundColor: COLORS.PRIMARY,
  //       borderRadius: 5,
  //       paddingHorizontal: 8,
  //       paddingVertical: 3,
  //       shadowColor: alpha(COLORS.BLACK, 0.4),
  //       shadowOffset: { height: 3 },
  //       shadowOpacity: 0.25,
  //       shadowRadius: 3,
  //       elevation: 2,
  //     }}
  //     >
  //       <Text
  //         style={{
  //           ...font(12),
  //           color: COLORS.WHITE,
  //           backgroundColor: COLORS.TRANSPARENT,
  //           width: 120,
  //           textAlign: 'center',
  //         }}
  //         numberOfLines={1}
  //       >
  //         {category.name}
  //       </Text>
  //     </View>
  //   </View>
  //   : null);

  // renderQ = (question, detail, isCounselor = false) => (
  //   <View style={{
  //     padding: 5,
  //     paddingRight: 8,
  //   }}
  //   >
  //     { !isCounselor ? <Text
  //       style={{
  //         position: 'absolute',
  //         top: -8,
  //         left: -12,
  //         ...font(40),
  //         color: alpha(COLORS.SECONDARY, 0.3),
  //       }}
  //     >
  //         Q
  //     </Text> : null}
  //     <View style={{
  //       paddingLeft: 15,
  //       paddingBottom: 4,
  //     }}
  //     >
  //       <Text
  //         numberOfLines={2}
  //         style={{
  //           ...font(13),
  //           marginBottom: 8,
  //         }}
  //       >
  //         {question.raw}
  //       </Text>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //           alignItems: 'center',
  //         }}
  //       >
  //         {this.renderUser(question.user_id, question.created_at)}
  //         {this.renderButtons(question, detail)}
  //       </View>
  //     </View>
  //   </View>
  // )

  // renderA = (answer, detail, isCounselor = false) => (
  //   <View
  //     style={{
  //       paddingTop: 8,
  //       padding: 5,
  //       paddingRight: 8,
  //     }}
  //   >
  //     {!isCounselor ? <Text
  //       style={{
  //         position: 'absolute',
  //         top: 8,
  //         left: -12,
  //         ...font(40),
  //         color: alpha(COLORS.SECONDARY, 0.3),
  //       }}
  //     >
  //       A
  //     </Text> : null}
  //     <View style={{
  //       borderTopWidth: 1,
  //       borderColor: '#B1E0EC',
  //       paddingLeft: 15,
  //       paddingTop: 8,
  //       marginBottom: 4,
  //     }}
  //     >
  //       <Text
  //         numberOfLines={2}
  //         style={{
  //           ...font(13),
  //           marginBottom: 8,
  //         }}
  //       >
  //         {answer.raw}
  //       </Text>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //           alignItems: 'center',
  //         }}
  //       >
  //         {this.renderUser(answer.user_id, answer.created_at)}
  //         {this.renderButtons(answer, detail)}
  //       </View>
  //     </View>
  //   </View>
  // )

  // renderQA = ({ item: detail }) => {
  //   const { categories } = this.props;
  //   const question = {
  //     ...detail,
  //     ...detail.post_stream[0],
  //   };
  //   const answer = detail.post_stream.length > 1 ? detail.post_stream[1] : null;
  //   const isCounselor = this.isUserCounselor(question.user_id);
  //   return (<TouchableOpacity
  //     style={{
  //       margin: 8,
  //       backgroundColor: isCounselor ? COLORS.BEIGE : COLORS.WHITE,
  //       borderRadius: 10,
  //       padding: 6,
  //       overflow: 'hidden',
  //     }}
  //     key={detail.id}
  //     onPress={this.goToQuestion(detail)}
  //   >
  //     {this.renderCategoryLabel(getCategoryById(categories, question.category_id))}
  //     {this.renderQ(question, detail, isCounselor)}
  //     {answer ? this.renderA(answer, detail, isCounselor) : null}
  //   </TouchableOpacity>);
  // }

  render() {
    const { questions, refreshing, loading, addingMore } = this.state;
    const { game_list } = questions || {
      game_list: [],
    };
    return (
      <GameDetails />
    );
  }
}

const mapStateToProps
  = ({
    filters,
    loginState: { authToken },
    categories,
    currentUser,
    appState: { forumNumber },
  }) => ({ filters, authToken, categories, forumNumber, currentUser });

export default connect(mapStateToProps)(GameListPage);
