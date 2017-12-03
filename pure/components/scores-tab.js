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
  Right,
  Icon,
  Body,
  View,
  Separator,
} from 'native-base';
// import {
//   Image,
//   Text,  
// } from 'react-native';
// import IMAGES from '../common/images';
import GameCard from './game-card';

export default class ScoresTab extends Component {
  static propTypes = {
    scores: PropTypes.any,
  }
  static defaultProps = {
    scores: {
      recent:  [
        { value: 308,time: '3 mins ago' },
        { value: 112,time: '14 days ago' },
      ],
      top: [
        { value: 412,time: '3 months ago' },
        { value: 112,time: '12 secs ago' },
      ],
    },
  }
  renderItem = ( item ) => {
    return (
      <ListItem style={{ justifyContent: 'center'}} icon>
        <Left>
          <Text>1. </Text>
        </Left>
        <Body style={{  justifyContent: 'center'}}>
          <Text style={{ fontSize: 20}}>{item.value}</Text>
        </Body>
        <Right >
          <Text>{item.time}</Text>
        </Right>
      </ListItem>
    );
  };
  render() {
    const {
      scores } = this.props;
    return (
      <View>
        {(scores.recent.length>0)?
          <Separator bordered style={{ height: 40}}>
            <Text style={{ fontSize: 17}}>Recent Scores</Text>
          </Separator> : null 
        }
        <List style={{ padding: 5}} renderRow={this.renderItem} dataArray={scores.recent} />
        {(scores.top.length>0)?
          <Separator bordered style={{ height: 40}}>
            <Text style={{ fontSize: 17}}>Top Scores</Text>
          </Separator> : null 
        }
        <List style={{ padding: 5}} renderRow={this.renderItem} dataArray={scores.top} />
      </View> 
    );
  }
}
