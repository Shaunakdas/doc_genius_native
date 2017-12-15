import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Button,
  List,
  ListItem,
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
        <Card style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
          <CardItem header>
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
          </CardItem>
          <CardItem cardBody >
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
