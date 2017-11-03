import React, { Component } from 'react';
import {
  Header,
  Container,
  Title,
  Content,
  // Card,
  // CardItem,
} from 'native-base';

// import {
//   Image,
//   Text,  
// } from 'react-native';
// import IMAGES from '../common/images';
import GameCard from './game-card';

export default class GamesList extends Component {
  render() {
    return (
      <Container style={{ marginTop: 25 }} >
        <Header style={{ paddingTop: 10 }}>
          <Title>Robot Impagination</Title>
        </Header>
        <Content style={{ padding: 20, backgroundColor: '#00bfff' }}>
          <GameCard />
          <GameCard />
        </Content>
      </Container>
    );
  }
}
