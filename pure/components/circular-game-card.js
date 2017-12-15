import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardItem,
  Text,
  Body,
  Thumbnail,
  Button,
  View,
} from 'native-base';

import {
  Image,
  TouchableOpacity,
} from 'react-native';
import IMAGES from '../common/images';

export default class CircularGameCard extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    navigation: PropTypes.any,
  }

  static defaultProps = {
    onPress: () => {},
    title: null,
  }


  render() {
    const {
      onPress,
      title } = this.props;
    return (
      <TouchableOpacity style={{  justifyContent: 'center', alignItems: 'center', marginHorizontal: 5  }} onPress={onPress}>
        <Thumbnail large source={IMAGES.LOGO} />
        <Text style={{  paddingTop: 5 }}>{title}</Text>
      </TouchableOpacity>
    );
  }
}
