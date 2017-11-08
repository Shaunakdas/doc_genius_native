import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardItem,
  Text,
  Body,
  Left,
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
  }

  static defaultProps = {
    onPress: () => {},
    title: null,
    subTitle: null,
  }


  render() {
    const {
      onPress,
      title,
      subTitle } = this.props;
    return (
      <Card >
        <CardItem cardBody onPress={onPress}>
          <Image style={{ height: 100, width: null, flex: 1 }} source={IMAGES.LOGO} />
        </CardItem>
        <CardItem cardBody style={{ marginBottom: 20, marginTop: 20 }} onPress={onPress}>
          <Left>
            <Body>
              <Text style={{ fontWeight: 'bold' }}>{title}</Text>
              <Text style={{ fontVariant: ['small-caps'] }}>{subTitle}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    );
  }
}
