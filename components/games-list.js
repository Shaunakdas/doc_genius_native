import React, { Component } from 'react';
import {
  Header,
  Container,
  Tab,
  Tabs,
  Content,
  Left, Right, Body, Button,
  Title,
  Icon,
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
  render() {
    return (
      <Container style={{ marginTop: 25 }}>
        <Header hasTabs>
          <Left style={{ flex: 1 }}>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title>Genius</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Tabs initialPage={0}>
          <Tab heading="WORKOUT">
            <GameTab />
          </Tab>
          <Tab heading="PERFORMANCE">
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
