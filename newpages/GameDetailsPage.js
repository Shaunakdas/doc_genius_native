import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Col,
  Left,
  Right,
  Text,
  Content,
  Container,
  Header,
  Row,
  Icon,
  Title,
  Body,
  Button,
  Tabs,
  Tab,
  FooterTab,
  Footer,
} from 'native-base';

import {
  Image,
  View,
} from 'react-native';

import { GameDetails } from '../components';
// import IMAGES from '../common/images';
import { gameDetailsAPI } from '../common/api';

export default class GameDetailsPage extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    const { navigation } = props;
    const { params = {} } = navigation.state;
    const { game = { title: '' } } = params;
    this.state = {
      gameDetails: {
        title: game.title,
        gameRank: 'Easy',
        bestScore: 0,
        challenges: [
          { icon: 'flash', title: 'Score above 1480 to rank up to Novice', description: null },
          { icon: 'people', title: 'Train with friends!', description: 'See if you can beat their score' },
        ],
        benifits: [
          { title: 'Task Shifting', description: 'Excersies your multitasking and task-switching skills' },
          { title: 'Response Control', description: 'Challenges your ability to take a step back and think before you act' },
        ],
        scores: {
          recent: [
            { value: 333, time: '3 mins ago' },
            { value: 112, time: '14 days ago' },
          ],
          top: [
            { value: 412, time: '3 months ago' },
            { value: 112, time: '12 secs ago' },
          ],
        },
      },
    };
  }

  async componentDidMount() {
    await this.fetchGameDetails();
  }

  fetchGameDetails = async () => {
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const { game = { title: '' } } = params;
    const gameDetailResponse = await gameDetailsAPI(1) || {};
    console.log(gameDetailResponse);
    if (gameDetailResponse.success !== false) {
      this.setState({ gameDetails: gameDetailResponse.question_type });
      console.log(this.state.gameDetails.title);
    }
  }
  
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  nextAction = () => {
    console.log('nextAction');
     NativeModules.ActivityStarter.navigateToExample();
    const { navigation } = this.props;
    navigation.navigate('GameResultPage', { });
  }

  render() {
    const { gameDetails } = this.state;
    return (
      <Container style={{ marginTop: 25 }}>
        <Header style={{ backgroundColor: '#00bfff' }}>
          <Left>
            <Button  onPress={ this.goBack} transparent>
              <Icon name={'arrow-round-back'} />
            </Button>
          </Left>
          <Body>
            <Title>{gameDetails.title}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name={'information-circle'} />
            </Button>
          </Right>
        </Header>
        <Content>
          <GameDetails gameDetails={gameDetails} />
        </Content>
        <Footer>
          <FooterTab>
            <Button rounded onPress={this.nextAction}>
              <Text style={{ fontSize: 20 }}>PLAY GAME</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
