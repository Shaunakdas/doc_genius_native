import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Button,
  View,
} from 'native-base';

import {
  Image,
  TouchableOpacity,
} from 'react-native';
import IMAGES from '../common/images';

export default class GameCard extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    navigation: PropTypes.any,
    color: PropTypes.any,
  }

  static defaultProps = {
    onPress: () => {},
    title: null,
    subTitle: null,
    color: null,
  }


  render() {
    const {
      onPress,
      title,
      subTitle,
      color } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Card >
          <CardItem cardBody  >
            <Image style={{ height: 100, width: null, flex: 1 }} source={IMAGES.LOGO} >
              <View style={{ flex: 1, height: 100, backgroundColor: color,opacity: 0.5, margin: 0 }} />
            </Image>
          </CardItem>
          <CardItem cardBody   style={{ marginBottom: 20, marginTop: 20 }} >
            <Left>
              <Body>
                <Text style={{ fontWeight: 'bold', color: color }}>{title}</Text>
                <Text style={{ fontVariant: ['small-caps'] }}>{subTitle}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}
