import React from 'react';
import { Text, View } from 'react-native';

import { commonStyle as cs } from '../common/styles';

export default class ProfilePage extends React.Component {
  render() {
    return (
      <View style={cs.header}>
        <Text style={cs.headerText}> Profile </Text>
      </View>
    );
  }
}
