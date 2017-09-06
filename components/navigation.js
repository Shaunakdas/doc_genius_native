import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import { commonStyle as s } from '../common/styles';
import COLORS from '../common/colors';
import { getCurrentRouteName } from '../common/helper';
import { Button } from '../components';

export default class Navigation extends Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
  }

  goToPage = page => () => {
    const { navigation } = this.props;
    navigation.navigate(page);
  }

  render() {
    const { navigation } = this.props;
    const currentRouteName = getCurrentRouteName(navigation.state);
    return (
      <View style={s.navigationBar}>
        <Button
          style={s.tabButton}
          textStyle={[s.tabText, { color: currentRouteName === 'ForumPage' ? COLORS.PRIMARY : COLORS.GREY }]}
          text="Forum"
          onPress={this.goToPage('ForumPage')}
        />
        <Button
          style={s.tabButton}
          textStyle={[s.tabText, { color: currentRouteName === 'ChatPage' ? COLORS.PRIMARY : COLORS.GREY }]}
          text="Bot"
          onPress={this.goToPage('ChatPage')}
        />
        <Button
          style={s.tabButton}
          textStyle={[s.tabText, { color: currentRouteName === 'ProfilePage' ? COLORS.PRIMARY : COLORS.GREY }]}
          text="Profile"
          onPress={this.goToPage('ProfilePage')}
        />
      </View>
    );
  }
}
