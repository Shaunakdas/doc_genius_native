import React, { Component } from 'react';
import {
  Grid,
  Col,
  List,
  ListItem,
  Text,
  Content,
  Left,
  Right,
  Icon,
  Body,
  Separator,
} from 'native-base';
// import {
//   Image,
//   Text,  
// } from 'react-native';
// import IMAGES from '../common/images';
import GameCard from './game-card';

export default class ScoresTab extends Component {
  render() {
    return (
      <List style={{   }}>
        <Separator bordered style={{ height: 40}}>
            <Text style={{ fontSize: 17}}>Recent Scores</Text>
          </Separator>
        <ListItem style={{ justifyContent: 'center'}} icon>
          <Left>
            <Text>1. </Text>
          </Left>
          <Body style={{  justifyContent: 'center'}}>
            <Text style={{ fontSize: 20}}>308</Text>
          </Body>
          <Right >
            <Text> 3 min ago</Text>
          </Right>
        </ListItem>

        <Separator bordered style={{ height: 40}}>
            <Text style={{ fontSize: 17}}>Top Scores</Text>
          </Separator>
        <ListItem style={{  justifyContent: 'center'}} icon>
          <Left>
            <Text>1. </Text>
          </Left>
          <Body style={{  justifyContent: 'center'}}>
            <Text style={{ fontSize: 20}}>308</Text>
          </Body>
          <Right >
            <Text> 3 min ago</Text>
          </Right>
        </ListItem>
      </List>
    );
  }
}
