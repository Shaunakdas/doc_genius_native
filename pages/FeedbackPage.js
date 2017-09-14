import React from 'react';
import { Text, View, Image } from 'react-native';
import { PropTypes } from 'prop-types';

import IMAGES from '../common/images';
import { IconButton } from '../components';
import { commonStyle as cs } from '../common/styles';

export default class FeedbackPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    return (
      <View style={cs.header}>
        <Text style={cs.headerText}> Feedback </Text>
        <Image
          source={IMAGES.HEADER_BG}
          style={cs.headerImage}
        />
        <IconButton
          source={IMAGES.BACK}
          onPress={this.goBack}
          style={[cs.backButton, cs.headerBackButton]}
          imageStyle={cs.backImage}
        />
      </View>
    );
  }
}
