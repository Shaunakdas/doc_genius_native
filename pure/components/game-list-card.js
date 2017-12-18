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
    name: PropTypes.string,
    navigation: PropTypes.any,
    color: PropTypes.any,
  }

  static defaultProps = {
    goToGame: () => {},
    games: [],
    name: null,
    color: '#32CD32',
  }


  render() {
    const {
      goToGame,
      games,
      name,
      color } = this.props;
    return (
      <View >
        <Card >
          <CardItem header>
            <Left>
            <Icon style={{ color: color }} name={'jet'} />
            <Body>
              <Text style={{ fontWeight: 'bold', color: color }}>{name}</Text>
              </Body>
            </Left>
            <Right>
              <Text style={{ color: color }}>{games.length}</Text>
              <Icon style={{ color: color }} name={'flash'} />
            </Right>
          </CardItem>
          <CardItem cardBody style={{ paddingBottom: 10 }}>
            <FlatList
              horizontal={true}
              data={games}
              renderItem={({item}) => <CircularGameCard name={item.name} key={item.id} onPress={() => goToGame(item.id,color)} color={color} />}
            />
            
          </CardItem>
        </Card>
      </View>
    );
  }
}
