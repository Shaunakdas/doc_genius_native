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
const benifits = [
  { title: 'Task Shifting', description: 'Excersies your multitasking and task-switching skills' },
  { title: 'Response Control', description: 'Challenges your ability to take a step back and think before you act' },
];
export default class GameTab extends Component {
  renderItem = ( item ) => {
    return (
      <ListItem style={{ justifyContent: 'center', height: 70 }} icon>
        <Left>
          <Icon name="pulse" />
        </Left>
        <Body style={{ justifyContent: 'center', height: 70 }}>
          <Text>{item.title}</Text>
          <Text note>{item.description}</Text>
        </Body>
      </ListItem>
    );
  };
  render() {
    return (

      <List style={{ padding: 5}} renderRow={this.renderItem} dataArray={benifits}>
      </List>
    );
  }
}
