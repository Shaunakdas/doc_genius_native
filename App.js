import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import moment from 'moment';
import configureStore from './store/configureStore';
import PAGES from './pages';
import COLORS, { alpha } from './common/colors';
import { DISMISSED_FILTER } from './common/constants';
import { Navigation, CategoryDrawer } from './components';

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
  }, {
    headerMode: 'none',
  });

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
  }, {
    headerMode: 'none',
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
  }, {
    headerMode: 'none',
  });

  return MainNavigator;
};

const store = configureStore();

class MainApp extends Component {
  componentWillMount() {
    this.navigator = getNavigator();
    moment.updateLocale('en', {
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 'a sec',
        ss: '%ss',
        m: 'a min',
        mm: '%dm',
        h: 'an hr',
        hh: '%dh',
        d: 'a day',
        dd: '%dd',
        M: 'a month',
        MM: '%dM',
        y: 'a year',
        yy: '%dY',
      },
    });
  }

  onChange = (_, __, action) => {
    const { routeName, params = {} } = action;
    if (routeName === 'DrawerClose' && !params.filtersApplied) {
      store.dispatch({ type: DISMISSED_FILTER });
    }
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
        <Navigator onNavigationStateChange={this.onChange} />
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
