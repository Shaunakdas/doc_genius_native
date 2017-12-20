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
// import IMAGES from '../common/images';
import BenifitsTab from './benifits-tab';
import ChallengesTab from './challenges-tab';
import ScoresTab from './scores-tab';
import ChatView from './chat-view';

import IMAGES from '../common/images';

export default class GameDetails extends Component {
  static propTypes = {
    gameDetails: PropTypes.shape({
      title: PropTypes.string,
      rank: PropTypes.string,
      best: PropTypes.number,
      challenges: PropTypes.any,
      scores: PropTypes.any,
      benifits: PropTypes.any,
    }),
      color: PropTypes.any,
    // onGameStart: PropTypes.func,
  }
  static defaultProps = {
    gameDetails: {
      title: 'Title',
      rank: 'Easy',
      best: 0,
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
    onGameStart: null,
    color: '#e52b50',
  }
  render() {
    const {
      // title,
      rank,
      best,
      challenges,
      scores,
      benifits } = this.props.gameDetails;
      const {color} = this.props;
    return (

      <Grid>
        <Row style={{ height: 150, backgroundColor: '#00bfff' }}>
          <Image opacity={0.1} style={{ height: 150, width: null, flex: 1 }} source={IMAGES.LOGO}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Icon name={'ribbon'} />
                <Title style={{ color: '#fff0f0', fontSize: 25 }}> {best} </Title>
                <Text style={{ color: '#fff0f0' }}> BEST SCORE </Text>
              </Col>
              <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Icon name={'school'} />
                <Title style={{ color: '#fff0f0', fontSize: 25 }}> {rank} </Title>
                <Text style={{ color: '#fff0f0' }}> GAME RANK </Text>
              </Col>
            </View>
          </Image>
        </Row>
        <Row size={45}>
          <Tabs initialPage={0}>
            <Tab heading="BENIFITS" tabStyle={{ backgroundColor: color }} activeTabStyle={{ backgroundColor: color }}>
              <BenifitsTab benifits={benifits}  />
            </Tab>
            <Tab heading="CHALLENGES" tabStyle={{ backgroundColor: color }} activeTabStyle={{ backgroundColor: color }}>
              <ChallengesTab challenges={challenges}  />
            </Tab>
            <Tab heading="SCORES" tabStyle={{ backgroundColor: color }} activeTabStyle={{ backgroundColor: color }}>
              <ScoresTab scores={scores} />
            </Tab>
          </Tabs>
        </Row>
      </Grid>
    );
  }
}
