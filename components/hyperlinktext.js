import React from 'react';
import {
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Hyperlink from 'react-native-hyperlink';

const HighlightText = ({ style, onPress, text }) =>
  (<Hyperlink linkStyle={{ color: '#2980b9' }} onPress={onPress}>
    <Text style={style}>
      {text}
    </Text>
  </Hyperlink>);

HighlightText.propTypes = {
  style: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default HighlightText;
