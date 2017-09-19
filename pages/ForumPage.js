import React from 'react';
import { Text, View, Image, TextInput, ScrollView, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import IMAGES from '../common/images';
import COLORS, { alpha } from '../common/colors';
import { commonStyle as cs, font, fullWidth } from '../common/styles';
import { IconButton } from '../components';
import { STUDENT_ROLE } from '../common/constants';
import { postsAPI } from '../common/api';
import { getCategoryById, getUserImage } from '../common/helper';

class ForumPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    filters: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      questions: null,
    };
  }

  async componentDidMount() {
    await this.fetchPosts();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.filters.length !== this.props.filters.length) {
      await this.fetchPosts(nextProps.filters);
    }
  }

  onSearchInputChange = (searchTerm) => {
    this.setState({
      searchTerm,
    });
  }

  onSubmit = () => {
    this.fetchPosts();
  }

  clearSearch = () => {
    this.setState({
      searchTerm: '',
    }, this.fetchPosts);
  }

  fetchPosts = async (sentFilters = null) => {
    const { authToken } = this.props;
    const filters = sentFilters || this.props.filters;
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    const questions = await postsAPI(authToken, filters, searchTerm) || {};
    this.setState({ questions, loading: false });
  }

  openDrawer = () => {
    this.props.navigation.navigate('DrawerOpen');
  }

  selectCategory = () => {
    const { navigation } = this.props;
    navigation.navigate('CategorySelectionPage', { fromForum: true });
  }


  goToQuestion = question => () => {
    const { navigation } = this.props;
    navigation.navigate('QuestionPage', { id: question.id, category_id: question.category_id });
  }

  renderUser = (user_id) => {
    const user = this.state.questions.user_stream[user_id];
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
    const reply_count = post.posts_count ? post.posts_count - 1 : post.reply_count;
    const showAnswer = post.posts_count && post.posts_count > 1;
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
            marginRight: 5,
          }}
        />
        <Text
          style={{
            ...font(9),
            marginRight: 3,
            marginLeft: 10,
            color: COLORS.SECONDARY,
          }}
        >
          {reply_count}
        </Text>
        <Image
          source={showAnswer ? IMAGES.ANSWERS : IMAGES.REPLY}
          style={{
            height: 16,
            width: 16,
            resizeMode: 'contain',
            marginRight: 5,
          }}
        />
      </View>
    );
  };

  renderCategoryLabel = category => (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'flex-end',
    }}
    >
      <View style={{
        backgroundColor: COLORS.PRIMARY,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 3,
        shadowColor: alpha(COLORS.BLACK, 0.4),
        shadowOffset: { height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 2,
      }}
      >
        <Text style={{
          ...font(12),
          color: COLORS.WHITE,
          backgroundColor: COLORS.TRANSPARENT,
        }}
        >
          {category.name}
        </Text>
      </View>
    </View>
  );

renderQ = question => (
  <View style={{
    padding: 5,
    paddingRight: 8,
  }}
  >
    <Text
      style={{
        position: 'absolute',
        top: -8,
        left: -12,
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
      <Text
        numberOfLines={2}
        style={{
          ...font(13),
          marginBottom: 8,
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
        {this.renderUser(question.user_id)}
        {this.renderTime(question.created_at)}
        {this.renderButtons(question)}
      </View>
    </View>
  </View>
)

  renderA = answer => (
    <View
      style={{
        paddingTop: 8,
        padding: 5,
        paddingRight: 8,
      }}
    >
      <Text
        style={{
          position: 'absolute',
          top: 8,
          left: -12,
          ...font(40),
          color: alpha(COLORS.SECONDARY, 0.3),
        }}
      >
        A
      </Text>
      <View style={{
        borderTopWidth: 1,
        borderColor: '#B1E0EC',
        paddingLeft: 15,
        paddingTop: 8,
        marginBottom: 4,
      }}
      >
        <Text
          numberOfLines={2}
          style={{
            ...font(13),
            marginBottom: 8,
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
          {this.renderUser(answer.user_id)}
          {this.renderTime(answer.created_at)}
          {this.renderButtons(answer)}
        </View>
      </View>
    </View>
  )

  renderQA = (detail) => {
    const { categories } = this.props;
    const question = {
      ...detail,
      ...detail.post_stream[0],
    };
    const answer = detail.post_stream.length > 1 ? detail.post_stream[1] : null;
    return (<TouchableOpacity
      style={{
        margin: 8,
        backgroundColor: COLORS.WHITE,
        borderRadius: 10,
        padding: 6,
        overflow: 'hidden',
      }}
      key={detail.id}
      onPress={this.goToQuestion(detail)}
    >
      {this.renderCategoryLabel(getCategoryById(categories, question.category_id))}
      {this.renderQ(question)}
      {answer ? this.renderA(answer) : null}
    </TouchableOpacity>);
  }

  render() {
    const { filters } = this.props;
    const { loading, questions } = this.state;
    const { details_stream } = questions || {};
    return (
      <View
        style={[cs.container, { backgroundColor: alpha(COLORS.PRIMARY, 0.3) }]}
      >
        <View style={cs.header}>
          <Image
            source={IMAGES.HEADER_BG}
            style={cs.headerImage}
          />
          <Text style={cs.headerText}> {filters.length < 8 ? 'Filtered Posts' : 'All Posts'} </Text>
          <IconButton
            source={IMAGES.EDIT}
            style={{
              position: 'absolute',
              right: 50,
              top: 36,
            }}
            imageStyle={{
              height: 22,
              width: 22,
              resizeMode: 'contain',
            }}
            onPress={this.selectCategory}
          />
          <IconButton
            source={IMAGES.FILTER}
            style={{
              position: 'absolute',
              right: 10,
              top: 40,
            }}
            imageStyle={{
              height: 18,
              width: 18,
              resizeMode: 'contain',
            }}
            onPress={this.openDrawer}
          />
        </View>
        <View
          style={{
            padding: 8,
            backgroundColor: '#F8F8F8',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#CDCDCD',
              borderRadius: 4,
              padding: 4,
              paddingHorizontal: 15,
              alignItems: 'center',
            }}
          >
            <Image
              source={IMAGES.SEARCH}
              style={{
                height: 14,
                width: 14,
                resizeMode: 'contain',
                marginRight: 15,
              }}
            />
            <TextInput
              style={{
                flex: 1,
                color: COLORS.BLACK,
                ...font(14),
                paddingVertical: 3,
              }}
              value={this.state.searchTerm}
              placeholder="Search"
              placeholderTextColor={COLORS.SEARCH_TEXT}
              underlineColorAndroid={COLORS.TRANSPARENT}
              onChangeText={this.onSearchInputChange}
              onSubmitEditing={this.onSubmit}
            />
            {this.state.searchTerm ? <IconButton
              source={IMAGES.CLOSE}
              style={{
                marginLeft: 15,
                padding: 3,
              }}
              imageStyle={{
                height: 14,
                width: 14,
                resizeMode: 'contain',
              }}
              onPress={this.clearSearch}
            /> : null}
          </View>
        </View>
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
          ) : ((filters.length === 0 || !details_stream || details_stream.length === 0) ? (
            <Text
              style={{
                color: COLORS.SECONDARY,
                textAlign: 'center',
                marginHorizontal: 40,
                marginTop: 40,
              }}
            >
            No results found. Please select different categories or try another search term.
            </Text>
          ) :
            details_stream.map(this.renderQA)
          ) }
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps
  = ({ filters, loginState: { authToken }, categories }) => ({ filters, authToken, categories });

export default connect(mapStateToProps)(ForumPage);
