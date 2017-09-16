import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string.isRequired,
    style: PropTypes.any.isRequired,
    textStyle: PropTypes.any.isRequired,
    imageSource: PropTypes.any,
    imageStyle: PropTypes.any,
    isLoading: PropTypes.bool,
    loadingColor: PropTypes.any,
  }

  static defaultProps = {
    onPress: () => {},
    imageSource: null,
    imageStyle: null,
    isLoading: false,
    loadingColor: null,
  }


  render() {
    const TouchableWrapper = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
    const {
      isLoading,
      onPress,
      text,
      style,
      imageSource,
      imageStyle,
      loadingColor,
      textStyle } = this.props;
    return (
      <TouchableWrapper disabled={isLoading} onPress={onPress}>
        <View style={style}>
          {imageSource ? <Image
            source={imageSource}
            style={imageStyle}
          /> : null }
          { !isLoading ?
            <Text style={textStyle}>{text}</Text> :
            <ActivityIndicator size={Platform.OS === 'ios' ? 0 : 14} color={loadingColor} />
          }
        </View>
      </TouchableWrapper>
    );
  }
}
