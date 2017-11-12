import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Col,
  List,
  ListItem,
  Text,
  Content,
  Spinner,
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
  static propTypes = {
    games: PropTypes.any,
  }
  static defaultProps = {
    games: [
      // { id: 1, title: 'Bounce',subTitle: 'MEMORY',image: null },
      // { id: 2, title: 'True View',subTitle: 'FOCUS',image: null },
      // { id: 3, title: 'Jump Control',subTitle: 'COORDINATION',image: null },
    ],
  }
  render() {
    const {
      games } = this.props;
    const gameCards = games.map((game) =>
      <GameCard title={game.title} subTitle={game.category} onPress={null} />);
    return (
      <Content style={{ backgroundColor: '#00bfff'  }}>
        <List style={{ padding: 5}}>
          <ListItem style={{ backgroundColor: '#00bfff', justifyContent: 'center' }}>
            <Text style={{ color: '#ffffff'}}>Hello, Shaunak</Text>
          </ListItem>
          <ListItem style={{ backgroundColor: '#00bfff', justifyContent: 'center' }}>
            {(games.length>0)?
              <Grid >
                <Col style={{ padding: 5 }}>
                  {gameCards}
                </Col>
                <Col style={{ padding: 5 }}>
                  {gameCards}
                </Col>
              </Grid>
              : <Spinner color='blue' /> }
          </ListItem>
        </List>
      </Content>
    );
  }
}
