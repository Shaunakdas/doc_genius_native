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
import { connect } from 'react-redux';
// import { VictoryScatter, VictoryArea, VictoryLine, VictoryTheme, VictoryGroup, VictoryLabel } from 'victory-native';

// const data = [
//   {quarter: 1, earnings: 4},
//   {quarter: 2, earnings: 5},
//   {quarter: 3, earnings: 1},
//   {quarter: 4, earnings: 3},
// ];
// const animation = {
//     duration: 1000,
// }
import moment from 'moment';

import { LineGraph, BarGraph,ChatView } from '../components';
import { gameResultsAPI } from '../common/api';
import { ENVIRONMENT } from '../common/constants';
import { saveData, getData } from '../common/helper';

class GameResultPage extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      resultBody: '',
      gameResults: {
        title: 'Memory',
        highest: 2300,
        recent: [
          // { x: 'a', y: 2 },
          // { x: 'b', y: 3 },
          // { x: 'c', y: 5 },
          // { x: 'd', y: 4 },
          // { x: 'e', y: 7 },
        ],
        comparision: [
          { user: 1, time: 3.0 },
          { user: 2, time: 6.5 },
        ],
        result: {
          title: 'You keep imprressing me Shaunak. Thats a great performance',
        },
        labels: ['', '', '', '11th Best\n\n2500'],
      },
      recentScores: [
        // { id: 'a', value: 2 },
        // { id: 'b', value: 3 },
        // { id: 'c', value: 5 },
        // { id: 'd', value: 4 },
      ],
    };
  }

  async componentDidMount() {
    const key = 'GameResult';
    if (ENVIRONMENT === 'integrated') {
      NativeModules.ActivityStarter.getPrefsValue(key, async (value) => {
        await this.checkForResult(value);
      });
    } else if (ENVIRONMENT === 'expo'){
      await this.checkForResult('');
    }
    // if (this.state.resultBody !== 'null') { await this.fetchResult(); }
    // NativeModules.ActivityStarter.setPrefsValue(key, 'null');
  }
  checkForResult = async (value) => {
    let sessionScore = '';
    if ((value === 'null') || (value.length === 0)) {
      sessionScore = '{"value":"0", "time_taken":"0", "correct_count":"0", "incorrect_count":"0", "seen":"True", "passed":"True", "failed":"False"}';
      console.log(sessionScore);
    } else {
      sessionScore = value;
    }
    const start = await getData('START');
    
    const finish = moment().format();
    const gameHolderId = await getData('GAME_HOLDER_ID');
    const gameSession = {
      start,
      finish,
      game_holder_id: gameHolderId,
      session_score: JSON.parse(sessionScore),
    };
    this.fetchResult(gameSession);
  }

  fetchResult = async (value) => {
    console.log(value);
    // TODO change value to game_session object
    const {  authToken } = this.props;
    const gameResultsResponse = await gameResultsAPI(authToken, value) || {};
    console.log(gameResultsResponse);
    if (gameResultsResponse.success !== false) {
      const gameSession = gameResultsResponse.game_session;
      const updatedScores = gameSession.recent_scores;
      gameSession.recent_scores.map((score, i) => updatedScores[i].id = (''+i));
      gameSession.recent_scores.map((score, i) => updatedScores[i].value = parseFloat(score.value));
      const scoresLength = gameSession.recent_scores.length;
      const updatedLabels = Array(scoresLength).fill('');
      updatedLabels[scoresLength - 1] = gameSession.score_rank+'th Best\n\n '+updatedScores[scoresLength - 1].value;
      console.log(updatedLabels);
      // updating labels
      this.setState({
        gameResults: {
          title: 'Game Results',
          highest: '340',
          recent: updatedScores,
          comparision: [
            { user: 1, time: 3.0 },
            { user: 2, time: 6.5 },
          ],
          result: {
            title: 'That was a good attempt',
          },
          labels: updatedLabels,
        },

      });
      console.log(this.state.gameResults);
      // updating recentScores
      // this.setState({ recentScores: updatedScores});
      // console.log(this.state.recentScores);
    }
  }


  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }
  gameListPage = () => {
    const { navigation } = this.props;
    navigation.navigate('GameListPage', { });
  }
  render() {
    const { gameResults,recentScores } = this.state;
    return (
      <Container style={{ marginTop: 25, backgroundColor: '#000080' }}>
        <Header>
          <Left>
            <Button transparent onPress={this.goBack}>
              <Icon name='arrow-round-back' />
            </Button>
          </Left>
          <Body>
            <Title>{ gameResults.title } </Title>
            <Subtitle>Highest Score: { gameResults.highest }</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content style={{ paddingHorizontal: 25 }}>
          {(gameResults.recent.length>0)?
            <View>
            <ChatView />
            <LineGraph labels={gameResults.labels} data={gameResults.recent} />
            <BarGraph data={gameResults.comparision} />
            </View>
            : <Spinner color='blue' /> }
          
        </Content>

        <Footer>
            <Button rounded style={{ flex: 0.95, alignItems: 'center', justifyContent: 'center'  }} onPress={this.gameListPage}>
              <Text style={{ fontSize: 20 }}>Back To Games</Text>
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

export default connect(mapStateToProps)(GameResultPage);