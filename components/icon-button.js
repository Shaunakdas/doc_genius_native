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
    style: PropTypes.any.isRequired,
    imageStyle: PropTypes.any.isRequired,
    source: PropTypes.any.isRequired,
  }

  static defaultProps = {
    onPress: () => {},
  }


  render() {
    const TouchableWrapper = Platform.OS === 'ios' ? TouchableWithoutFeedback : TouchableNativeFeedback;
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
