import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Col,
  List,
  ListItem,
  Text,
  Content,
  Spinner,
  // Card,
  // CardItem,
} from 'native-base';
// import {
//   Image,
//   Text,  
// } from 'react-native';
// import IMAGES from '../common/images';
import GameCard from './game-card';
import CircularGameCard from './circular-game-card';
import GameListCard from './game-list-card';
import COLORS from '../common/colors';

// const goNext = () => {
//     console.log('goNext');
//     // const { navigation } = this.props;
//     // navigation.navigate('GameDetailsPage', {  });
//   }

  const colourOptions = [COLORS.GAME_PURPLE, COLORS.GAME_BLUE, COLORS.GAME_GREEN, COLORS.GAME_ORANGE, COLORS.GAME_RED]; 
export default class AllGames extends Component {
  static propTypes = {
    allStreams: PropTypes.any,
    goToGame: PropTypes.func,
    navigation: PropTypes.any,
  }
  static defaultProps = {
    allStreams: [
      // { id: 1, title: 'Bounce',subTitle: 'MEMORY',image: null },
      // { id: 2, title: 'True View',subTitle: 'FOCUS',image: null },
      // { id: 3, title: 'Jump Control',subTitle: 'COORDINATION',image: null },
    ],
    goToGame: () => {},
  }
  rndColor = (arr,id) => {
    const randIndex = id % arr.length;
    return arr[randIndex];
  };
  render() {
    const {
      allStreams,
      goToGame } = this.props;
    const gameCards = allStreams.map((stream) =>
      <GameListCard title={stream.title} goToGame={goToGame} games={stream.games} color={this.rndColor(colourOptions,stream.id)}/>);
    return (
      <Content>
        {gameCards}
      </Content>
    );
  }
}
