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
} from 'native-base';
import {
  NativeModules,
} from 'react-native';
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
import { LineGraph, BarGraph } from '../components';

export default class GameResultPage extends Component {
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
          { x: 'a', y: 2 },
          { x: 'b', y: 3 },
          { x: 'c', y: 5 },
          { x: 'd', y: 4 },
          { x: 'e', y: 7 },
        ],
        comparision: [
          { user: 1, time: 3.0 },
          { user: 2, time: 6.5 },
        ],
        result: {
          title: 'You keep imprressing me Shaunak. Thats a great performance',
        },
        labels: ['', '', '', '', '11th Best\n\n2500'],
      },
    };
  }

  async componentDidMount() {
    const key = 'GameResult';
    NativeModules.ActivityStarter.getPrefsValue(key, (value) => {  await this.fetchResult(value);});
    // if (this.state.resultBody !== 'null') { await this.fetchResult(); }
    // NativeModules.ActivityStarter.setPrefsValue(key, 'null');
  }

  fetchResult = async (value) => {
    value = '{"score":"0", "time_taken":"0", "correct_count":"0", "incorrect_count":"0", "seen":"True", "passed":"True", "failed":"False"}';
    console.log(value);
    // TODO change value to game_session object
    const gameResultsResponse = await gameResultsAPI(value) || {};
    console.log(gameResultsResponse);
    if (gamesResponse.success !== false) {
      this.setState({ gameResults: gamesResponse});
    }
  }
  
  render() {
    const { gameResults } = this.state;
    return (
      <Container style={{ marginTop: 25, backgroundColor: '#000080' }}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{ gameResults.title } </Title>
            <Subtitle>Highest Score: { gameResults.highest }</Subtitle>
          </Body>
          <Right />
        </Header>
        <Content style={{ paddingHorizontal: 25 }}>
          <LineGraph labels={gameResults.labels} data={gameResults.recent} />
          <BarGraph data={gameResults.comparision} />
        </Content>
          <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
