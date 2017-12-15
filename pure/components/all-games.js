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

// const goNext = () => {
//     console.log('goNext');
//     // const { navigation } = this.props;
//     // navigation.navigate('GameDetailsPage', {  });
//   }

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
  
  render() {
    const {
      allStreams,
      goToGame } = this.props;
    const gameCards = allStreams.map((stream) =>
      <GameListCard title={stream.title} goToGame={goToGame} games={stream.games} />);
    return (
      <Content>
        {gameCards}
      </Content>
    );
  }
}
