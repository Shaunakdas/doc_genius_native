import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
} from 'react-native';
import COLORS from '../common/colors';

export default class Input extends Component {
  static propTypes = {
   inputProps: PropTypes.any,
   value: PropTypes.string,
   wrapperStyle: View.propTypes.style,
  }

  render() {
    return (
      <View style={this.props.wrapperStyle}>
        <TextInput 
          underlineColorAndroid={COLORS.TRANSPARENT}
          {...this.props.inputProps}
        />
      </View>
    )
  }
}