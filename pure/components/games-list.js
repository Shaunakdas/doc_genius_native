import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Container,
  Tab,
  Tabs,
  Text,
  Left, Right, Body, Button,
  Title,
  Icon,
  Footer,
  FooterTab,
  // Card,
  // CardItem,
} from 'native-base';
// import {
//   Image,
//   Text,  
// } from 'react-native';
// import IMAGES from '../common/images';
import GameTab from './game-tab';
// import GameCard from './game-card';

export default class GamesList extends Component {
  static propTypes = {
    games: PropTypes.any,
    goToGame: PropTypes.func,
    allGames: PropTypes.func,
  }
  static defaultProps = {
    games: [
      // { id: 1, title: 'Bounce',subTitle: 'MEMORY',image: null },
      // { id: 2, title: 'True View',subTitle: 'FOCUS',image: null },
      // { id: 3, title: 'Jump Control',subTitle: 'COORDINATION',image: null },
    ],
    goToGame: () => {},
    allGames: () => {},
  }

  render() {
    const {
      games,
      goToGame,
      allGames } = this.props;
    return (
      <Container style={{ marginTop: 25 }}>
        <Header hasTabs>
          <Left style={{ flex: 1 }}>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title>Drona</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Tabs initialPage={0}>
          <Tab heading="WORKOUT">
            <GameTab games={games} goToGame={goToGame}/>
          </Tab>
          <Tab heading="PERFORMANCE">
          </Tab>
        </Tabs>

        <Footer style={{backgroundColor:'transparent'}}>
            <Button rounded style={{ flex: 0.95, alignItems: 'center', justifyContent: 'center', marginTop: 5  }} onPress={allGames}>
              <Text style={{ fontSize: 20 }}>All Games</Text>
            </Button>
        </Footer>
      </Container>
    );
  }
}
