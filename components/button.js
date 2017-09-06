import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string.isRequired,
    style: PropTypes.any.isRequired,
    textStyle: PropTypes.any.isRequired,
    imageSource: PropTypes.any,
    imageStyle: PropTypes.any,
  }

  static defaultProps = {
    onPress: () => {},
    imageSource: null,
    imageStyle: null,
  }


  render() {
    const TouchableWrapper = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
    return (
      <TouchableWrapper onPress={this.props.onPress}>
        <View style={this.props.style}>
          {this.props.imageSource ? <Image
            source={this.props.imageSource}
            style={this.props.imageStyle}
          /> : null }
          <Text style={this.props.textStyle}>{this.props.text}</Text>
        </View>
      </TouchableWrapper>
    );
  }
}
