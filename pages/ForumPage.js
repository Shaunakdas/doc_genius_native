import React from 'react';
import { Text, View, Image } from 'react-native';
import IMAGES from '../common/images';

import { commonStyle as cs } from '../common/styles';

export default class ForumPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  render() {
    return (
      <View style={cs.header}>
        <Text style={cs.headerText}> All Posts </Text>
        <Image
          source={IMAGES.HEADER_BG}
          style={cs.headerImage}
        />
      </View>
    );
  }
}
