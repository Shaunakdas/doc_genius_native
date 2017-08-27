import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableNativeFeedback,
} from 'react-native';

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
  }

  static defaultProps = {
    onPress: () => {},
  }


  render() {
    return (
      <TouchableNativeFeedback onPress={this.props.onPress}>
        <View style={this.props.style}>
          <Text style={this.props.textStyle}>{this.props.text}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}