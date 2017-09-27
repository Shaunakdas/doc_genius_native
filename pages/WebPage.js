import React from 'react';
import { Text, View, Image, WebView } from 'react-native';
import { PropTypes } from 'prop-types';

import IMAGES from '../common/images';
import { IconButton } from '../components';
import { commonStyle as cs } from '../common/styles';

export default class WebPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const { navigation } = props;
    const { params = {} } = navigation.state;
    const { url = 'https://connecpath.com' } = params;
    this.state = {
      profile: null,
      url,
    };
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    return (
      <View style={cs.container}>
        <View style={cs.header}>
          <Text
            style={cs.headerText}
            numberOfLines={1}
          >
            Web View
          </Text>
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
        <WebView
          source={{ uri: this.state.url }}
          startInLoadingState
        />
      </View>
    );
  }
}
