import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import { commonStyle as s } from '../common/styles';
import IMAGES from '../common/images';
import { getCurrentRouteName } from '../common/helper';
import { Button } from '../components';

export default class Navigation extends Component {
  static propTypes = {
    navigation: PropTypes.any,
  }

  goToPage = (page) => () => {
    const {navigation} = this.props;
    navigation.navigate(page);
  }
  
  render() {
    const { navigation } = this.props;
    const currentRouteName = getCurrentRouteName(navigation.state);
    return (
      <View style={s.navigationBar}>
       <Button
       style={s.tabButton}
       textStyle={[s.tabText, {opacity: currentRouteName === 'ForumPage' ?  1 : 0.25}]}
       text="Forum"
       onPress={this.goToPage('ForumPage')}
      />
      <Button
        style={s.tabButton}
        textStyle={[s.tabText, {opacity: currentRouteName === 'ChatPage' ?  1 : 0.25}]}
        text="Bot"
        onPress={this.goToPage('ChatPage')}
       />
       <Button
        style={s.tabButton}
        textStyle={[s.tabText, {opacity: currentRouteName === 'ProfilePage' ?  1 : 0.25}]}
        text="Profile"
        onPress={this.goToPage('ProfilePage')}
       />
     </View>
    );
  }
}