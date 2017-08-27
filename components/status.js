import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import COLORS from '../common/colors';

export default class Status extends Component {
  static propTypes = {
   inputProps: PropTypes.any,
   status: PropTypes.string,
   activityIndicatorProps: View.propTypes.style,
   style: View.PropTypes.style,
  }

  render() {
    return (
      <View style={this.props.wrapperStyle}>
        <ActivityIndicator 
          {...this.props.activityIndicatorProps}
        />
      </View>
    )
  }
}