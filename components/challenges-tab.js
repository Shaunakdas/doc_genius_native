import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  static propTypes = {
    challenges: PropTypes.any,
  }
  static defaultProps = {
    challenges: [
      { icon: 'flash',title: 'Score above 1480 to rank up to Novice', description: null },
      { icon: 'people',title: 'Train with friends!', description: 'See if you can beat their score' },
    ],
  }
  renderItem = ( item ) => {
    return (
      <ListItem style={{  justifyContent: 'center', height: 70 }} icon>
        <Left>
          <Icon name={item.icon} />
        </Left>
        <Body style={{  justifyContent: 'center', height: 70 }}>
          <Text>{item.title}</Text>
          <Text note>{item.description}</Text>
        </Body>
      </ListItem>
    );
  };
  render() {
    const {
      challenges } = this.props;
    return (
      <List style={{ padding: 5}} renderRow={this.renderItem} dataArray={challenges}>
      </List>
    );
  }
}
