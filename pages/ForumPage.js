import React from 'react';
import { Text, View, Image, TextInput, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';

import IMAGES from '../common/images';
import COLORS, { alpha } from '../common/colors';

import { commonStyle as cs, font } from '../common/styles';
import { IconButton } from '../components';

const questions = [{
  id: 1,
  text: 'What is UCLA\'s average ACT score?',
  role: 'student',
  user: 'Aaron',
  ago: '5 hours ago',
  category: 'SAT/ACT/AP',
  liked: false,
  likes: 3,
  replies: 10,
  answers: [{
    text: 'Some logical answer, can be spanned into multiple lines',
    user: 'Greg',
    grade: '11th',
    likes: 3,
    replies: 3,
    role: 'student',
    ago: '3 hours ago',
  },
  {
    text: 'Thanks',
    user: 'Julian',
    grade: '12th',
    likes: 8,
    replies: 5,
    role: 'student',
    ago: '3 hours ago',
  }],
}, {
  id: 2,
  text: 'What is SAT application deadline?',
  role: 'student',
  user: 'Aaron',
  ago: '5 hours ago',
  category: 'Applications',
  liked: false,
  likes: 99,
  replies: 12,
  answers: [{
    text: 'Today is last day',
    user: 'Rohin',
    grade: '7th',
    likes: 13,
    replies: 0,
    role: 'student',
    ago: '3 hours ago',
  },
  {
    text: 'Getting up to finish it',
    user: 'Julian',
    grade: '12th',
    likes: 8,
    replies: 3,
    role: 'student',
    ago: '3 hours ago',
  }],
}];
export default class ForumPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  openDrawer = () => {
    this.props.navigation.navigate('DrawerOpen');
  }

  selectCategory = () => {
    const { navigation } = this.props;
    navigation.navigate('CategorySelectionPage', { fromForum: true });
  }

  renderCategoryLabel = (category) => {
    return (<View style={{
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
          {category}
        </Text>
      </View>
    </View>);
  }

  renderQ = (question) => {
    return (
      <View style={{
        padding: 5,
        paddingRight: 8,
      }}
      >
        <Text
          style={{
            position: 'absolute',
            top: -8,
            left: -15,
            ...font(40),
            color: alpha(COLORS.SECONDARY, 0.3),
          }}
        >
        Q
        </Text>
        <View style={{
          borderBottomWidth: 1,
          borderColor: COLORS.SECONDARY,
          paddingLeft: 15,
          paddingBottom: 4,
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
            {question.text}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} >
              <Image
                source={IMAGES.POST_BY}
                style={{
                  height: 16,
                  width: 16,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  ...font(13),
                  marginLeft: 6,
                }}
              >
                {question.user}
              </Text>
            </View>
            <Text style={{
              flex: 1,
              marginHorizontal: 8,
              ...font(8),
              color: COLORS.SECONDARY,
            }}
            >
              {question.ago}
            </Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text
                style={{
                  ...font(9),
                  marginRight: 3,
                  marginLeft: 10,
                  color: COLORS.SECONDARY,
                }}
              >
                {question.likes}
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
                {question.replies}
              </Text>
              <Image
                source={IMAGES.ANSWERS}
                style={{
                  height: 16,
                  width: 16,
                  resizeMode: 'contain',
                  marginRight: 5,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  renderA = (answer, key, hideBorder = false) => {
    return (
      <View
        style={{
          padding: 5,
          paddingRight: 8,
        }}
        key={key}
      >
        {key === 0 ? <Text
          style={{
            position: 'absolute',
            top: -8,
            left: -15,
            ...font(40),
            color: alpha(COLORS.SECONDARY, 0.3),
          }}
        >
        A
        </Text> : null}
        <View style={{
          borderBottomWidth: hideBorder ? 0 : 1,
          borderColor: COLORS.SECONDARY,
          paddingLeft: 15,
          paddingBottom: 4,
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
            {answer.text}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} >
              <Image
                source={IMAGES.ANSWER_BY}
                style={{
                  height: 16,
                  width: 16,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  ...font(13),
                  marginLeft: 6,
                }}
              >
                {answer.user}
              </Text>
            </View>
            <Text style={{
              flex: 1,
              marginHorizontal: 8,
              ...font(8),
              color: COLORS.SECONDARY,
            }}
            >
              {answer.ago}
            </Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Text
                style={{
                  ...font(9),
                  marginRight: 3,
                  marginLeft: 10,
                  color: COLORS.SECONDARY,
                }}
              >
                {answer.likes}
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
                {answer.replies}
              </Text>
              <Image
                source={IMAGES.REPLY}
                style={{
                  height: 16,
                  width: 16,
                  resizeMode: 'contain',
                  marginRight: 5,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  renderQA = (question) => {
    const lastAnswerIndex = question.answers.length - 1;
    return (
      <View
        style={{
          margin: 8,
          backgroundColor: COLORS.WHITE,
          borderRadius: 10,
          padding: 6,
          overflow: 'hidden',
        }}
        key={question.id}
      >
        {this.renderCategoryLabel(question.category)}
        {this.renderQ(question)}
        {question.answers.map(
          (answer, index) => this.renderA(answer, index, index === lastAnswerIndex),
        )}
      </View>
    );
  }
  render() {
    return (
      <View
        style={[cs.container, { backgroundColor: alpha(COLORS.PRIMARY, 0.3) }]}
      >
        <View style={cs.header}>
          <Image
            source={IMAGES.HEADER_BG}
            style={cs.headerImage}
          />
          <Text style={cs.headerText}> All Posts </Text>
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
              padding: 8,
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
              }}
              placeholder="Search"
              placeholderTextColor={COLORS.SEARCH_TEXT}
              underlineColorAndroid={COLORS.TRANSPARENT}
            />
          </View>
        </View>
        <ScrollView
          style={{ flex: 1 }}
        >
          {questions.map(this.renderQA)}
        </ScrollView>
      </View>
    );
  }
}
