import React, { Component } from 'react';
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
  render() {
    return (
      <Card >
        <CardItem cardBody>
          <Image style={{ height: 80, width: null, flex: 1 }} source={IMAGES.LOGO} />
        </CardItem>
        <CardItem footer>
          <Left>
            <Body>
              <Text style={{ fontWeight: 'bold' }}>Hello!</Text>
              <Text style={{ fontVariant: ['small-caps'] }}>Item description</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    );
  }
}
