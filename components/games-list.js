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
  Grid,
  Row,
  Col,
} from 'native-base';
// import {
//   Image,
//   Text,  
// } from 'react-native';
import IMAGES from '../common/images';
// import GameTab from './game-tab';
// import GameCard from './game-card';

export default class GamesList extends Component {
  render() {
    return (
      <Container style={{ marginTop: 25, paddingTop: 10, backgroundColor: '#00bfff' }}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Game Details</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Grid>
            <Row size={40}>

            </Row>
            <Row size={55}>
            
            </Row>
            <Row size={15}>

            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
