import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Platform,
  Image,
} from 'react-native';

export default class IconButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    style: View.propTypes.style,
    imageStyle: Image.propTypes.style,
    source: PropTypes.any,
  }

  static defaultProps = {
    onPress: () => {},
  }


  render() {
    const TouchableWrapper = Platform.OS === "ios" ? TouchableWithoutFeedback : TouchableNativeFeedback;
    return (
      <TouchableWrapper onPress={this.props.onPress}>
        <View style={this.props.style}>
          <Image
            source={this.props.source}
            style={this.props.imageStyle} 
          />
        </View>
      </TouchableWrapper>
    );
  }
}