import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
} from 'react-native';
import COLORS from '../common/colors';

export default class Input extends Component {
  static propTypes = {
    inputProps: PropTypes.any.isRequired,
    wrapperStyle: PropTypes.any.isRequired,
  }

  render() {
    return (
      <View style={this.props.wrapperStyle}>
        <TextInput
          ref={input => this.input = input} // eslint-disable-line no-return-assign
          underlineColorAndroid={COLORS.TRANSPARENT}
          {...this.props.inputProps}
        />
      </View>
    );
  }
}
