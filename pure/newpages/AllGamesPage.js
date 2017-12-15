import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  ListItem,
  Left,
  Right,
  Header,
  Title,
  Subtitle,
  Button,
  Icon,
  Body,
  Footer,
  FooterTab,
  Spinner,
  View,
} from 'native-base';
import {
  NativeModules,
} from 'react-native';
import { AllGames } from '../components';
import { allGamesAPI } from '../common/api';

export default class AllGamesPage extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      allStreams: [],
    };
  }
  goToGame = (gameHolderId) => {
    console.log(gameHolderId);
    const { navigation } = this.props;
    navigation.navigate('GameDetailsPage', { gameHolderId });
  }
  fetchGames = async () =>{
    const gamesResponse = await allGamesAPI() || {};
    console.log(gamesResponse);
    if (gamesResponse.success !== false) {
      this.setState({ allStreams: gamesResponse.streams});
      console.log(this.state.allStreams);
    }
  }
  
  async componentDidMount() {
    await this.fetchGames();
  }

  render() {
    const { allStreams } = this.state;
    return (
      <Container style={{ marginTop: 25, backgroundColor: '#00bfff' }}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{ 'All Games' } </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ paddingHorizontal: 25 }}>
          <AllGames allStreams={allStreams} goToGame={this.goToGame} />
        </Content>
      </Container>
    );
  }
}
