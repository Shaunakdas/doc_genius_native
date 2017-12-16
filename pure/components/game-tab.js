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
  Button,
  // Card,
  // CardItem,
} from 'native-base';
// import {
//   Image,
//   Text,  
// } from 'react-native';
// import IMAGES from '../common/images';
import GameCard from './game-card';
import COLORS from '../common/colors';
import ChatView from './chat-view';
// const goNext = () => {
//     console.log('goNext');
//     // const { navigation } = this.props;
//     // navigation.navigate('GameDetailsPage', {  });
//   }

const colourOptions = [COLORS.GAME_PURPLE, COLORS.GAME_BLUE, COLORS.GAME_GREEN, COLORS.GAME_ORANGE, COLORS.GAME_RED];
export default class GameTab extends Component {
  static propTypes = {
    games: PropTypes.any,
    goToGame: PropTypes.func,
    navigation: PropTypes.any,
  }
  static defaultProps = {
    games: [
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
      games,
      goToGame } = this.props;
    const gameCards = games.map((game) =>
      <GameCard title={game.title} subTitle={game.subTitle} onPress={ () => goToGame(game.id,this.rndColor(colourOptions,game.id))}  color={this.rndColor(colourOptions,game.id) } />);
    const oddCards = gameCards.filter((v, i) => i % 2);
    const evenCards = gameCards.filter((v, i) => !(i % 2));
    return (
      <Content style={{ backgroundColor: COLORS.PRIMARY  }}>
        <List style={{ padding: 5}}>
          <ListItem style={{ backgroundColor: COLORS.PRIMARY, justifyContent: 'center' }}>
            <ChatView />
          </ListItem>
          <ListItem style={{ backgroundColor: COLORS.PRIMARY, justifyContent: 'center' }}>
            {(games.length>0)?
              <Grid >
                <Col style={{ padding: 5 }}>
                  {oddCards}
                </Col>
                <Col style={{ padding: 5 }}>
                  {evenCards}
                </Col>
              </Grid>
              : <Spinner color='blue' /> }
          </ListItem>
        </List>
      </Content>
    );
  }
}
