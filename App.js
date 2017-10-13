import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import {
  StatusBar,
  View,
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { Provider } from 'react-redux';
import moment from 'moment';
import { BlurView } from 'expo';
import SwipeALot from 'react-native-swipe-a-lot';


import configureStore from './store/configureStore';
import PAGES from './pages';
import COLORS, { alpha } from './common/colors';
import { font, chatPageStyle as chs, fullWidth } from './common/styles';
import IMAGES from './common/images';
import { DISMISSED_FILTER, REFRESH_PROFILE, STUDENT_ROLE } from './common/constants';
import { Navigation, CategoryDrawer } from './components';
import { disconnectFromSendbird } from './common/api';

const getNavigator = () => {
  const ChatNavigator = StackNavigator({
    ChatPage: {
      screen: PAGES.ChatPage,
    },
    ChatCategorySelectionPage: {
      screen: PAGES.CategorySelectionPage,
    },
    ChatAskForumPage: {
      screen: PAGES.AskQuestionPage,
    },
    ChatWebPage: {
      screen: PAGES.WebPage,
    },
  }, {
    headerMode: 'none',
    initialRouteName: 'ChatPage',
    navigationOptions: {
      gesturesEnabled: false,
    } });

  const ForumNavigator = DrawerNavigator({
    ForumPage: {
      screen: PAGES.ForumPage,
    },
    QuestionPage: {
      screen: PAGES.QuestionPage,
    },
    AskForumPage: {
      screen: PAGES.AskQuestionPage,
    },
    CategorySelectionPage: {
      screen: PAGES.CategorySelectionPage,
    },
  }, {
    drawerWidth: 280,
    drawerPosition: 'right',
    contentOptions: {
      style: {
        backgroundColor: alpha(COLORS.BLACK, 0.3),
      },
    },
    contentComponent: CategoryDrawer,
    navigationOptions: {
      drawerLockMode: 'locked-closed',
    },
  });

  const ProfileNavigator = StackNavigator({
    ProfilePage: {
      screen: PAGES.ProfilePage,
    },
    ProfileEditPage: {
      screen: PAGES.ProfileEditPage,
    },
    FeedbackPage: {
      screen: PAGES.FeedbackPage,
    },
    PrivacyPage: {
      screen: PAGES.PrivacyPage,
    },
    TermsPage: {
      screen: PAGES.TermsPage,
    },
    NotificationsPage: {
      screen: PAGES.NotificationsPage,
    },
    NotificationQuestionPage: {
      screen: PAGES.QuestionPage,
    },
  }, {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  });

  const AppNavigator = TabNavigator({
    ForumPage: {
      screen: ForumNavigator,
    },
    ProfilePage: {
      screen: ProfileNavigator,
    },
    ChatPage: {
      screen: ChatNavigator,
    },
  }, {
    tabBarPosition: 'bottom',
    tabBarComponent: Navigation,
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'none',
  });

  const MainNavigator = StackNavigator({
    SplashPage: {
      screen: PAGES.SplashPage,
    },
    LandingPage: {
      screen: PAGES.LandingPage,
    },
    SelectionPage: {
      screen: PAGES.SelectionPage,
    },
    SignupPage: {
      screen: PAGES.SignupPage,
    },
    LoginPage: {
      screen: PAGES.LoginPage,
    },
    AppPage: {
      screen: AppNavigator,
    },
    VerifyPage: {
      screen: PAGES.VerifyPage,
    },
    ForgotPasswordPage: {
      screen: PAGES.ForgotPasswordPage,
    },
  }, {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    } });

  return MainNavigator;
};

const store = configureStore();

class MainApp extends Component {
  componentWillMount() {
    this.navigator = getNavigator();
    this.state = {
      showOnboarding: false,
      role: STUDENT_ROLE,
    };

    moment.updateLocale('en', {
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: '%ss',
        ss: '%ss',
        m: '%dm',
        mm: '%dm',
        h: '%dh',
        hh: '%dh',
        d: '%dd',
        dd: '%dd',
        M: '%dM',
        MM: '%dM',
        y: '%dY',
        yy: '%dY',
      },
    });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (Platform.OS === 'android') {
        BackHandler.exitApp();
        return true;
      }
      return false;
    });
  }

  onChange = (_, __, action) => {
    const { routeName, params = {} } = action;
    if (routeName === 'DrawerClose' && !params.filtersApplied) {
      store.dispatch({ type: DISMISSED_FILTER });
    }
    if (routeName === 'ProfilePage') {
      store.dispatch({ type: REFRESH_PROFILE });
    }
    if (params.onLaunch) {
      this.showOnboarding(params.role);
    }
  }

  async componentWillUnMount() {
    BackHandler.removeEventListener('hardwareBackPress');
    try {
      await disconnectFromSendbird();
    } catch (_) {
      console.log(_); // eslint-disable-line no-console
    }
  }

  showOnboarding = (role) => {
    this.setState({ showOnboarding: true, role });
  }

  hideOnboarding = () => {
    this.setState({ showOnboarding: false });
  }

  renderOnBoarding = () => (
    this.state.role === STUDENT_ROLE ?
      this.renderStudentOnBoarding() : this.renderCounselorOnBoarding());

  renderCounselorOnBoarding = () => {
    const fontStyle = {
      ...font(12, 'light'),
      color: COLORS.WHITE,
      textAlign: 'center',
    };
    return (<BlurView tint="dark" intensity={80} style={StyleSheet.absoluteFill}>
      <SwipeALot
        autoPlay={{
          enable: false,
        }}
        wrapperStyle={{
          paddingTop: 36,
        }}
        circleDefaultStyle={{
          width: 6,
          height: 6,
          borderRadius: 3,
        }}
        circleWrapperStyle={{
          bottom: 15,
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.97 }} >
          <Image
            source={IMAGES.ONBOARD_LOGO}
            style={{
              height: 100,
              width: 100,
            }}
          />
          <View
            style={{
              marginHorizontal: 20,
              borderColor: COLORS.WHITE,
              borderWidth: 1,
              padding: 20,
            }}
          >
            <Text style={[fontStyle, { ...font(20, 'semibold'), marginBottom: 30 }]}>
              Welcome to ConnecPath.
            </Text>
            <Text style={fontStyle}>
              {'Connecting students to their college goals.\nLet us show you how it works.'}
            </Text>
          </View>
          <Text
            onPress={this.hideOnboarding}
            style={{
              position: 'absolute',
              bottom: 70,
              textAlign: 'center',
              width: 70,
              ...font(13),
              color: COLORS.WHITE,
              alignSelf: 'center',
            }}
          >
              Skip
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', opacity: 0.97 }}>
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 5,
              alignSelf: 'flex-end',
              marginRight: 18,
            }}
          >
            <Text
              style={{
                color: COLORS.OB_TEXT,
                ...font(14),
                textAlign: 'center',
              }}
            >
              POST
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginTop: 40,
              alignSelf: 'flex-start',
              paddingLeft: 12,
            }}
          >
            <Image
              style={chs.chatImage}
              source={IMAGES.WHITE_BOT_USER}
            />
            <View style={[chs.chatBotTextContainer, { backgroundColor: COLORS.WHITE }]}>
              <Text
                style={[chs.chatBotText, { color: COLORS.OB_TEXT }]}
              >
              Hello, my name is Cheryl. I can answer any college questions that you may have.
              </Text>
            </View>
            <Image
              style={[chs.botBubbleImage, { left: 52 }]}
              source={IMAGES.WHITE_BOTBUBBLE}
            />
          </View>
          <Text
            style={[
              fontStyle,
              {
                marginHorizontal: 25,
                marginTop: 30,
                lineHeight: 18,
              },
            ]}
          >
            {'Students first ask '}
            <Text
              style={{
                ...font(13, 'semibold'),
                color: COLORS.WHITE,
              }}
            >
              Cheryl, a chatbot,
            </Text>
            {'any question they might have about college applications, finding scholarships, financial aid, or likewise.'}
          </Text>
        </View>
        <View style={{ flex: 1, paddingTop: 20, opacity: 0.97 }}>
          <View
            style={{
              marginHorizontal: 8,
              borderRadius: 10,
              backgroundColor: COLORS.WHITE,
              padding: 8,
              paddingLeft: 0,
              marginBottom: 40,
            }}
          >
            <View
              style={{
                backgroundColor: '#3F575D',
                padding: 4,
                borderRadius: 5,
                paddingHorizontal: 10,
                alignSelf: 'flex-end',
                overflow: 'hidden',
              }}
            >
              <Text style={fontStyle}>Others</Text>
            </View>
            <View
              style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: COLORS.OB_TEXT, overflow: 'hidden' }}
            >
              <Text
                style={{ ...font(12), color: COLORS.OB_TEXT, paddingLeft: 30 }}
              >
                  SOS send help how do I college?
              </Text>
              <Text
                style={{ position: 'absolute', ...font(35), top: -8, left: -8, color: COLORS.OB_TEXT, backgroundColor: COLORS.TRANSPARENT }}
              >
                Q
              </Text>
            </View>
            <View
              style={{ paddingVertical: 10, overflow: 'hidden' }}
            >
              <Text
                style={{ ...font(12), color: COLORS.OB_TEXT, paddingLeft: 30 }}
              >
                  Ask Cheryl or Post in the Forum for help!
              </Text>
              <Text
                style={{ position: 'absolute', ...font(35), top: -4, left: -8, color: COLORS.OB_TEXT, backgroundColor: COLORS.TRANSPARENT }}
              >
                A
              </Text>
            </View>
          </View>
          <Text style={[fontStyle, { marginHorizontal: 25 }]}>
            {'When Cheryl doesn’t know answers for questions asked by students, it transfers the questions to the'}
            <Text style={{
              ...font(13, 'semibold'),
              color: COLORS.WHITE,
            }}
            >
              {' Forum.\n\n'}
            </Text>
            {'Then, it’s time for '}
            <Text style={{
              ...font(13, 'semibold'),
              color: COLORS.WHITE,
            }}
            >
              you
            </Text>
            {' to answer them. Once you answer a question, the answer is shared with all of your students. No need to repeat same asnwers to each student over and over again.'}
          </Text>
        </View>
        <View style={{ flex: 1, opacity: 0.97, alignItems: 'center' }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.WHITE,
              paddingTop: 50,
              marginBottom: 50,
            }}
          >
            <Image
              source={IMAGES.OB_PROFILE_BG}
              style={{
                width: fullWidth - 40,
                height: 100,
                resizeMode: 'cover',
              }}
            />
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                backgroundColor: COLORS.WHITE,
                position: 'absolute',
                top: 35,
                left: fullWidth / 2 - 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={IMAGES.NORMAL_USER}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
          <Text
            style={[fontStyle, { marginHorizontal: 25 }]}
          >
            {'Check to see any notifications such as if a new question is posted, and update information in your '}
            <Text style={{
              ...font(13, 'semibold'),
              color: COLORS.WHITE,
            }}
            >
              Profile
            </Text>
            {' so people know more easily who you are.'}
          </Text>
          <Text
            onPress={this.hideOnboarding}
            style={{
              position: 'absolute',
              bottom: 70,
              textAlign: 'center',
              width: fullWidth,
              ...font(13),
              color: COLORS.WHITE,
              lineHeight: 18,
              textDecorationLine: 'underline',
            }}
          >
              Get Started
          </Text>
        </View>
      </SwipeALot>
    </BlurView>);
  };

  renderStudentOnBoarding = () => {
    const fontStyle = {
      ...font(12, 'light'),
      color: COLORS.WHITE,
      textAlign: 'center',
    };
    return (<BlurView tint="dark" intensity={80} style={StyleSheet.absoluteFill}>
      <SwipeALot
        autoPlay={{
          enable: false,
        }}
        wrapperStyle={{
          paddingTop: 36,
          backgroundColor: Platform.OS === 'android' ? alpha(COLORS.BLACK, 0.7) : COLORS.TRANSPARENT,
        }}
        circleDefaultStyle={{
          width: 6,
          height: 6,
          borderRadius: 3,
        }}
        circleWrapperStyle={{
          bottom: 15,
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.97 }} >
          <Image
            source={IMAGES.ONBOARD_LOGO}
            style={{
              height: 100,
              width: 100,
            }}
          />
          <View
            style={{
              marginHorizontal: 20,
              borderColor: COLORS.WHITE,
              borderWidth: 1,
              padding: 20,
            }}
          >
            <Text style={[fontStyle, { ...font(20, 'semibold'), marginBottom: 30 }]}>
              Welcome to ConnecPath.
            </Text>
            <Text style={fontStyle}>
              {'Connecting students to their college goals.\nLet us show you how it works.'}
            </Text>
          </View>
          <Text
            onPress={this.hideOnboarding}
            style={{
              position: 'absolute',
              bottom: 70,
              textAlign: 'center',
              width: 70,
              ...font(13),
              alignSelf: 'center',
              color: COLORS.WHITE,
            }}
          >
              Skip
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', opacity: 0.97 }}>
          <View
            style={{
              backgroundColor: COLORS.WHITE,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 5,
              alignSelf: 'flex-end',
              marginRight: 18,
            }}
          >
            <Text
              style={{
                color: COLORS.OB_TEXT,
                ...font(14),
                textAlign: 'center',
              }}
            >
              POST
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginTop: 40,
              alignSelf: 'flex-start',
              paddingLeft: 12,
            }}
          >
            <Image
              style={chs.chatImage}
              source={IMAGES.WHITE_BOT_USER}
            />
            <View style={[chs.chatBotTextContainer, { backgroundColor: COLORS.WHITE }]}>
              <Text
                style={[chs.chatBotText, { color: COLORS.OB_TEXT }]}
              >
              Hello, my name is Cheryl. I can answer any college questions that you may have.
              </Text>
            </View>
            <Image
              style={[chs.botBubbleImage, { left: 52 }]}
              source={IMAGES.WHITE_BOTBUBBLE}
            />
          </View>
          <Text
            style={[
              fontStyle,
              {
                marginHorizontal: 25,
                marginTop: 30,
                lineHeight: 18,
              },
            ]}
          >
            {'Ask '}
            <Text
              style={{
                ...font(13, 'semibold'),
                color: COLORS.WHITE,
              }}
            >
              Cheryl,
            </Text>
            {' any question you might have about college applications, finding scholarships, financial aid, or likewise.'}
          </Text>
          <Text
            style={{
              position: 'absolute',
              width: fullWidth,
              paddingHorizontal: 30,
              textAlign: 'center',
              bottom: 70,
              ...font(12, 'light'),
              color: COLORS.WHITE,
            }}
          >
            {'___Tips___\n\n\nIf you don’t like her answer, Post your question. Be as short as possible with questions and she’ll be more likely to respond.'}
          </Text>
        </View>
        <View style={{ flex: 1, paddingTop: 20, opacity: 0.97 }}>
          <View
            style={{
              marginHorizontal: 8,
              borderRadius: 10,
              backgroundColor: COLORS.WHITE,
              padding: 8,
              paddingLeft: 0,
              marginBottom: 40,
            }}
          >
            <View
              style={{
                backgroundColor: '#3F575D',
                padding: 4,
                borderRadius: 5,
                paddingHorizontal: 10,
                alignSelf: 'flex-end',
                overflow: 'hidden',
              }}
            >
              <Text style={fontStyle}>Others</Text>
            </View>
            <View
              style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: COLORS.OB_TEXT, overflow: 'hidden' }}
            >
              <Text
                style={{ ...font(12), color: COLORS.OB_TEXT, paddingLeft: 30 }}
              >
                  SOS send help how do I college?
              </Text>
              <Text
                style={{ position: 'absolute', ...font(35), top: -8, left: -8, color: COLORS.OB_TEXT, backgroundColor: COLORS.TRANSPARENT }}
              >
                Q
              </Text>
            </View>
            <View
              style={{ paddingVertical: 10, overflow: 'hidden' }}
            >
              <Text
                style={{ ...font(12), color: COLORS.OB_TEXT, paddingLeft: 30 }}
              >
                  Ask Cheryl or Post in the Forum for help!
              </Text>
              <Text
                style={{ position: 'absolute', ...font(35), top: -4, left: -8, color: COLORS.OB_TEXT, backgroundColor: COLORS.TRANSPARENT }}
              >
                A
              </Text>
            </View>
          </View>
          <Text style={[fontStyle, { marginHorizontal: 25 }]}>
            {'Find your posted questions or answer friends’ questions in the '}
            <Text style={{
              ...font(13, 'semibold'),
              color: COLORS.WHITE,
            }}
            >
              {' Forum.\n\n'}
            </Text>
          </Text>
          <Text
            style={{
              position: 'absolute',
              width: fullWidth,
              paddingHorizontal: 30,
              textAlign: 'center',
              bottom: 70,
              ...font(12, 'light'),
              color: COLORS.WHITE,
            }}
          >
            {'___Tips___\n\n\nCheck back to see if your friend or counselor has responded, and be courteous to your peers!'}
          </Text>

        </View>
        <View style={{ flex: 1, opacity: 0.97, alignItems: 'center' }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.WHITE,
              paddingTop: 50,
              marginBottom: 50,
            }}
          >
            <Image
              source={IMAGES.OB_PROFILE_BG}
              style={{
                width: fullWidth - 40,
                height: 100,
                resizeMode: 'cover',
              }}
            />
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                backgroundColor: COLORS.WHITE,
                position: 'absolute',
                top: 35,
                left: fullWidth / 2 - 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={IMAGES.NORMAL_USER}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
          <Text
            style={[fontStyle, { marginHorizontal: 25 }]}
          >
            {'Check to see any notifications such as if a new question is posted, and update information in your '}
            <Text style={{
              ...font(13, 'semibold'),
              color: COLORS.WHITE,
            }}
            >
              Profile
            </Text>
          </Text>
          <Text
            style={{
              position: 'absolute',
              width: fullWidth,
              paddingHorizontal: 30,
              textAlign: 'center',
              bottom: 95,
              ...font(12, 'light'),
              color: COLORS.WHITE,
            }}
          >
            {'___Tips___\n\n\nUpdate your profile picture so people know more easily who you are!'}
          </Text>
          <Text
            onPress={this.hideOnboarding}
            style={{
              position: 'absolute',
              bottom: 70,
              textAlign: 'center',
              width: fullWidth,
              ...font(13),
              color: COLORS.WHITE,
              lineHeight: 18,
              textDecorationLine: 'underline',
            }}
          >
              Get Started
          </Text>
        </View>
      </SwipeALot>
    </BlurView>);
  };

  render() {
    const Navigator = this.navigator;
    const { showOnboarding } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor={COLORS.TRANSPARENT}
          animated={false}
          barStyle="light-content"
        />
        <Navigator
          onNavigationStateChange={this.onChange}
          ref={instance => this.instance = instance}
        />
        { showOnboarding ? this.renderOnBoarding() : null }
      </View>
    );
  }
}


const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

export default App;
