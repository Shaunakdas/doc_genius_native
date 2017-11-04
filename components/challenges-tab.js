import React, { Component } from 'react';
import {
  Grid,
  Col,
  List,
  ListItem,
  Text,
  Content,
  Left,
  Icon,
  Body,
} from 'native-base';
// import {
//   Image,
//   Text,  
// } from 'react-native';
// import IMAGES from '../common/images';
import GameCard from './game-card';

export default class BenifitsTab extends Component {
  render() {
    return (
      <List style={{ padding: 5 }}>
        <ListItem style={{  justifyContent: 'center', height: 70 }} icon>
          <Left>
            <Icon name="flash" />
          </Left>
          <Body style={{  justifyContent: 'center', height: 70 }}>
            <Text>Score above 1480 to rank up to Novice</Text>
          </Body>
        </ListItem>
        <ListItem style={{  justifyContent: 'center', height: 70 }} icon>
          <Left>
            <Icon name="people" />
          </Left>
          <Body style={{  justifyContent: 'center', height: 70 }}>
            <Text>Train with friends!</Text>
            <Text note>See if you can beat their score</Text>
          </Body>
        </ListItem>
      </List>
    );
  }
}
