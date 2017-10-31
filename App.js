import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import {
  StatusBar,
  View,
  BackHandler,
  Platform,
  // StyleSheet,
  // Text,
  // Image,
} from 'react-native';
import { Provider } from 'react-redux';
import moment from 'moment';
// import { BlurView } from 'expo';
// import SwipeALot from './swipealot';


import configureStore from './store/configureStore';
import PAGES from './pages';
import COLORS, { alpha } from './common/colors';
// import { font, chatPageStyle as chs, fullWidth } from './common/styles';
// import IMAGES from './common/images';
// import { DISMISSED_FILTER, REFRESH_PROFILE, COUNSELOR_ROLE } from './common/constants';
import { Navigation, CategoryDrawer } from './components';
// import { disconnectFromSendbird } from './common/api';

const getNavigator = () => {
  // const ChatNavigator = StackNavigator({
  //   ChatPage: {
  //     screen: PAGES.ChatPage,
  //   },
  //   ChatCategorySelectionPage: {
  //     screen: PAGES.CategorySelectionPage,
  //   },
  //   ChatAskForumPage: {
  //     screen: PAGES.AskQuestionPage,
  //   },
  //   ChatWebPage: {
  //     screen: PAGES.WebPage,
  //   },
  // }, {
  //   headerMode: 'none',
  //   initialRouteName: 'ChatPage',
  //   navigationOptions: {
  //     gesturesEnabled: false,
  //   } });

  const GamesNavigator = DrawerNavigator({
    GamesListPage: {
      screen: PAGES.GamesListPage,
    },
    QuestionPage: {
      screen: PAGES.QuestionPage,
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
  }, {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  });

  const AppNavigator = TabNavigator({
    ProfilePage: {
      screen: ProfileNavigator,
    },
    GamesPage: {
      screen: GamesNavigator,
    },
  }, {
    tabBarPosition: 'bottom',
    tabBarComponent: Navigation,
    animationEnabled: false,
    swipeEnabled: false,
    headerMode: 'none',
  });

  const MainNavigator = StackNavigator({
    // SplashPage: {
    //   screen: PAGES.SplashPage,
    // },
    // LandingPage: {
    //   screen: PAGES.LandingPage,
    // },
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
    // VerifyPage: {
    //   screen: PAGES.VerifyPage,
    // },
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

// const mappings = {
//   [STUDENT_ROLE]: ['ChatPage', 'ChatPage', 'ForumPage', 'ProfilePage'],
//   [COUNSELOR_ROLE]: ['ForumPage', 'ForumPage', 'ForumPage', 'ProfilePage'],
// };

class MainApp extends Component {
  componentWillMount() {
    this.navigator = getNavigator();
    this.state = {
      showOnboarding: false,
      obIndex: 0,
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

  // onChange = (_, __, action) => {
  //   const { routeName, params = {} } = action;
  //   if (routeName === 'DrawerClose' && !params.filtersApplied) {
  //     store.dispatch({ type: DISMISSED_FILTER });
  //   }
  //   if (routeName === 'ProfilePage') {
  //     store.dispatch({ type: REFRESH_PROFILE });
  //   }
  //   if (params.onLaunch) {
  //     this.showOnboarding(params.role);
  //   }
  // }
  // TODO
  // onPageChange = (index) => {
  //   const { obIndex, role } = this.state;
  //   const currentPage = mappings[role][obIndex];
  //   const nextPage = mappings[role][index];
  //   this.setState({ obIndex: index }, () => {
  //     if (currentPage !== nextPage) {
  //       const { appState: { rootNavigation } } = store.getState();
  //       if (rootNavigation) {
  //         rootNavigation.navigate(nextPage);
  //       }
  //     }
  //   });
  // }

  async componentWillUnMount() {
    BackHandler.removeEventListener('hardwareBackPress');
    // try {
    //   await disconnectFromSendbird();
    // } catch (_) {
    //   console.log(_); // eslint-disable-line no-console
    // }
  }

  showOnboarding = (role) => {
    this.setState({ showOnboarding: true, role });
  }

  hideOnboarding = () => {
    const { obIndex } = this.state;
    if (obIndex !== 0) {
      const defaultPage = 'ProfilePage';
      const { appState: { rootNavigation } } = store.getState();
      if (rootNavigation) {
        rootNavigation.navigate(defaultPage);
      }
    }
    this.setState({ showOnboarding: false });
  }

  render() {
    const Navigator = this.navigator;
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
        { null }
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
