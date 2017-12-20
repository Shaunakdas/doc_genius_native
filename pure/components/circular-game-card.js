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
  StyleSheet,
} from 'react-native';
import IMAGES from '../common/images';

export default class CircularGameCard extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    name: PropTypes.string,
    navigation: PropTypes.any,
    color: PropTypes.any,
  }

  static defaultProps = {
    onPress: () => {},
    name: null,
    color: '#800080',
  }
  

  render() {
    const {
      onPress,
      name,
      color } = this.props;
    const cicleRadius = 100;
    const halfRadius = 50;
    const styles = StyleSheet.create({
      image: {
        ...StyleSheet.absoluteFillObject,
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: 'hidden'
      },
    });
    return (
      <TouchableOpacity style={{ width: cicleRadius+30,justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }} onPress={onPress}>
        <View style={{ width: cicleRadius, height: cicleRadius, position: 'relative' , overflow: 'hidden', borderRadius: halfRadius  }} >
          <Image source={IMAGES.LOGO} style={{ width: cicleRadius, height: cicleRadius, position: 'absolute' , overflow: 'hidden', borderRadius: halfRadius  }} />
          <View style={{  height: cicleRadius, width: cicleRadius, borderRadius: halfRadius, backgroundColor: color,opacity: 0.5   }} />
        </View>
        <Text style={{ paddingTop: 5, flexWrap: 'wrap'}}>{name}</Text>
      </TouchableOpacity>
    );
  }
}
