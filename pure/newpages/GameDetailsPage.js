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
  NativeModules,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';

import { GameDetails } from '../components';
import { ENVIRONMENT } from '../common/constants';
// import IMAGES from '../common/images';
import { gameDetailsAPI } from '../common/api';
import { saveData } from '../common/helper';

class GameDetailsPage extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    color: PropTypes.any,
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
    const { navigation, authToken } = this.props;
    const { params = {} } = navigation.state;
    const { gameHolderId } = params;
    const gameDetailResponse = await gameDetailsAPI(authToken,gameHolderId) || {};
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

  nextAction = async () => {
    console.log('nextAction');
    console.log(ENVIRONMENT);
    console.log(this.props);
    console.log(this.props.navigation.state.params.gameHolderId);
    // Storing Start and GameHolderId in AsyncStorage
    await saveData('GAME_HOLDER_ID', this.props.navigation.state.params.gameHolderId);
    // finish();
    await saveData('START', moment().format());
    // finish();
    if (ENVIRONMENT === 'integrated') {
      const question_text = this.state.gameDetails.current.question_text.replace(/"/g, "'");
      console.log(question_text);
      const key = 'QuestionText';
      NativeModules.ActivityStarter.getPrefsValue(key, (value) => { console.log(value); });
      NativeModules.ActivityStarter.setPrefsValue(key, '');
      NativeModules.ActivityStarter.setPrefsValue(key, question_text);
      NativeModules.ActivityStarter.getPrefsValue(key, (value) => { console.log(value); });
      NativeModules.ActivityStarter.navigateToExample();
    } else if (ENVIRONMENT === 'expo') {
      setTimeout(() => { 
        const { navigation } = this.props;
        navigation.navigate('GameResultPage', { });
      }, 3000);
      
    }
  }

  render() {
    const { gameDetails } = this.state;
    const color = this.props.navigation.state.params.color;
    return (
      <Container style={{ marginTop: 25 }}>
        <Header style={{ backgroundColor: color }}>
          <Left>
            <Button onPress={ this.goBack} transparent>
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
          <GameDetails gameDetails={gameDetails} color = {color}/>
        </Content>
        <Footer style={{backgroundColor:'transparent'}}>
          <Button style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center',backgroundColor: color  }} iconRight rounded onPress={this.nextAction}>
            <Icon name={'play'} />
            <Text>Play</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = ({
  loginState: { authToken },
}) =>
  ({  authToken });

export default connect(mapStateToProps)(GameDetailsPage);