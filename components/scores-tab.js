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

export default class ScoresTab extends Component {
  render() {
    return (
      <List style={{ padding: 5, backgroundColor: '#00bfff' }}>
        <ListItem style={{ backgroundColor: '#00bfff', justifyContent: 'center', height: 70 }} icon>
          <Left>
            <Icon name="plane" />
          </Left>
          <Body style={{ backgroundColor: '#00bfff', justifyContent: 'center', height: 70 }}>
            <Text>Task Shifting</Text>
            <Text note>Excersies your multitasking and task-switching skills</Text>
          </Body>
        </ListItem>
        <ListItem style={{ backgroundColor: '#00bfff', justifyContent: 'center', height: 70 }} icon>
          <Left>
            <Icon name="plane" />
          </Left>
          <Body style={{ backgroundColor: '#00bfff', justifyContent: 'center', height: 70 }}>
            <Text>Response Control</Text>
            <Text note>Challenges your ability to take a step back and think before you act</Text>
          </Body>
        </ListItem>
      </List>
    );
  }
}
