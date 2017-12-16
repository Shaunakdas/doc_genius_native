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
      <View>
        <Card onPress={this.goNext}>
          <CardItem cardBody button onPress={onPress}>
            <Image style={{ height: 100, width: null, flex: 1 }} source={IMAGES.LOGO} />
          </CardItem>
          <CardItem cardBody button onPress={onPress} style={{ marginBottom: 20, marginTop: 20 }} >
            <Left>
              <Body>
                <Text style={{ fontWeight: 'bold', color: color }}>{title}</Text>
                <Text style={{ fontVariant: ['small-caps'] }}>{subTitle}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
}
