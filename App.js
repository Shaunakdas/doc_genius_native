import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { StatusBar , View } from 'react-native';

import PAGES  from './pages';
import STYLES from './common/styles';
import COLORS, { alpha } from './common/colors';

const getNavigator = () => {
  const MainNavigator =  StackNavigator({
    LandingPage: {
      screen: PAGES.LandingPage,
    },
    SelectionPage: {
      screen: PAGES.SelectionPage,
    },
    SignupPage: {
      screen: PAGES.SignupPage,
    },
  }, {
    headerMode: 'none',
  });

  return MainNavigator;
}

export default class App extends Component {
  componentWillMount() {
    this.navigator = getNavigator();
  }

  render() {
    const Navigator = this.navigator;
    return (
      <View style={{flex: 1}}>
        <StatusBar
          translucent
          backgroundColor={alpha(COLORS.BLACK, 0.12)}
          animated={false}
        />
        <Navigator />
      </View>
    )
  }
}
