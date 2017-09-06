import React from 'react';
import { Text, View, Image } from 'react-native';
import IMAGES from '../common/images';

import { commonStyle as cs } from '../common/styles';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }
  render() {
    return (
      <View style={cs.header}>
        <Text style={cs.headerText}> Profile </Text>
        <Image
          source={IMAGES.HEADER_BG}
          style={cs.headerImage}
        />
      </View>
    );
  }
}
