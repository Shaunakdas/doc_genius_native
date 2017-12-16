import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Right,
  Button,
  List,
  ListItem,
  Icon,
  View,
} from 'native-base';

import {
  Image,
  FlatList,
} from 'react-native';
import IMAGES from '../common/images';
import CircularGameCard from './circular-game-card';

export default class GameListCard extends Component {
  static propTypes = {
    goToGame: PropTypes.func,
    games: PropTypes.any,
    title: PropTypes.string,
    navigation: PropTypes.any,
  }

  static defaultProps = {
    goToGame: () => {},
    games: [],
    title: null,
  }


  render() {
    const {
      goToGame,
      games,
      title } = this.props;
    return (
      <View >
        <Card >
          <CardItem header>
            <Left>
            <Icon name={'jet'} />
            <Body>
              <Text style={{ fontWeight: 'bold' }}>{title}</Text>
              </Body>
            </Left>
            <Right>
              <Text>3</Text>
              <Icon name={'flash'} />
            </Right>
          </CardItem>
          <CardItem cardBody style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
            <FlatList
              horizontal={true}
              data={games}
              renderItem={({item}) => <CircularGameCard title={item.title} key={item.id} onPress={() => goToGame(item.id)}  />}
            />
            
          </CardItem>
        </Card>
      </View>
    );
  }
}
