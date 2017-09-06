import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { StatusBar, View } from 'react-native';

import PAGES from './pages';
import COLORS, { alpha } from './common/colors';
import { Navigation } from './components';

const getNavigator = () => {
  const AppNavigator = TabNavigator({
    ChatPage: {
      screen: PAGES.ChatPage,
    },
    ForumPage: {
      screen: PAGES.ForumPage,
    },
    ProfilePage: {
      screen: PAGES.ProfilePage,
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
          backgroundColor={alpha(COLORS.PRIMARY, 0.12)}
          animated={false}
        />
        <Navigator />
      </View>
    );
  }
}
