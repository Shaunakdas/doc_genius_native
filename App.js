import React, { Component } from 'react';
import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { StatusBar, View } from 'react-native';

import PAGES from './pages';
import COLORS, { alpha } from './common/colors';
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
    ChatPage: {
      screen: ChatNavigator,
    },
    ForumPage: {
      screen: ForumNavigator,
    },
    ProfilePage: {
      screen: ProfileNavigator,
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
  }, {
    headerMode: 'none',
  });

  return MainNavigator;
};

export default class App extends Component {
  componentWillMount() {
    this.navigator = getNavigator();
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
        <Navigator />
      </View>
    );
  }
}
