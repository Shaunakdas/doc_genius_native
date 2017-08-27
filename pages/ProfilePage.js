import React from 'react';
import { Text, View } from 'react-native';
import {PropTypes} from 'prop-types';

import { commonStyle as cs, profilePageStyle as s } from '../common/styles'; 
import { Button } from '../components';
import IMAGES from '../common/images';

export default class ProfilePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }



  render() {
    return (
      <View style={cs.header}>
        <Text style={cs.headerText}> Profile </Text>
      </View>
  );
  }
}
