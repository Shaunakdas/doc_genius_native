import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import { commonStyle as s } from '../common/styles';
import COLORS from '../common/colors';
import IMAGES from '../common/images';
import { getCurrentRouteName } from '../common/helper';
import { Button } from '../components';

export default class Navigation extends Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
  }

  goToPage = page => () => {
    const { navigation } = this.props;
    const currentRouteName = getCurrentRouteName(navigation.state);
    if (page !== currentRouteName) {
      navigation.navigate(page);
    }
  }

  render() {
    const { navigation } = this.props;
    const currentRouteName = getCurrentRouteName(navigation.state);
    const showNavigation = ['ForumPage', 'ChatPage', 'ProfilePage'].indexOf(currentRouteName) >= 0;
    return (
      showNavigation ? <View style={s.navigationBar}>
        <Button
          style={s.tabButton}
          imageStyle={s.tabImage}
          imageSource={currentRouteName === 'ForumPage' ? IMAGES.NAV_FORUM_HIGHLIGHTED : IMAGES.NAV_FORUM}
          textStyle={[s.tabText, { color: currentRouteName === 'ForumPage' ? COLORS.PRIMARY : COLORS.GREY }]}
          text="Forum"
          onPress={this.goToPage('ForumPage')}
        />
        <Button
          style={s.tabButton}
          imageStyle={s.chatBotImage}
          imageSource={currentRouteName === 'ChatPage' ? IMAGES.NAV_BOT_HIGHLIGHTED : IMAGES.NAV_BOT}
          textStyle={[s.tabText, { color: currentRouteName === 'ChatPage' ? COLORS.PRIMARY : COLORS.GREY }]}
          text="Bot"
          onPress={this.goToPage('ChatPage')}
        />
        <Button
          style={s.tabButton}
          imageStyle={s.tabImage}
          imageSource={currentRouteName === 'ProfilePage' ? IMAGES.NAV_PROFILE_HIGHLIGHTED : IMAGES.NAV_PROFILE}
          textStyle={[s.tabText, { color: currentRouteName === 'ProfilePage' ? COLORS.PRIMARY : COLORS.GREY }]}
          text="Profile"
          onPress={this.goToPage('ProfilePage')}
        />
      </View> : null
    );
  }
}
