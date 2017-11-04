import React, { Component } from 'react';
import {
  Grid,
  Col,
  List,
  ListItem,
  Text,
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

export default class GameTab extends Component {
  render() {
    return (
      <Content >
        <List style={{ padding: 5, backgroundColor: '#00bfff'}}>
          <ListItem style={{ backgroundColor: '#00bfff', justifyContent: 'center' }}>
            <Text style={{ color: '#ffffff'}}>Hello, Shaunak</Text>
          </ListItem>
          <ListItem style={{ backgroundColor: '#00bfff' }}>
            <Grid >
              <Col style={{ padding: 5 }}>
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
              </Col>
              <Col style={{ padding: 5 }}>
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
              </Col>
            </Grid>
          </ListItem>
        </List>
      </Content>
    );
  }
}
