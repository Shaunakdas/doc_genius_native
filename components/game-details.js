import React, { Component } from 'react';
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
  View
} from 'react-native';
// import IMAGES from '../common/images';
import BenifitsTab from './benifits-tab';
import ChallengesTab from './challenges-tab';
import ScoresTab from './scores-tab';

import IMAGES from '../common/images';

export default class GameDetails extends Component {
  render() {
    return (
      <Container style={{ marginTop: 25 }}>
        <Header style={{  backgroundColor: '#00bfff' }}>
          <Left>
            <Button transparent>
              <Icon name='arrow-round-back' />
            </Button>
          </Left>
          <Body>
            <Title>Speed Spotting</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='information-circle' />
            </Button>
          </Right>
        </Header>
        <Content>
          <Grid>
            <Row style={ { height: 150, backgroundColor: '#00bfff'} }>
              <Image opacity={0.1} style={{ height: 150, width: null, flex: 1 }} source={IMAGES.LOGO}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Col style={{ justifyContent: 'center', alignItems: 'center'  }}>
                    <Icon name='ribbon'/>
                    <Title style={{ color: '#fff0f0', fontSize: 25}}> 400 </Title>
                    <Text style={{ color: '#fff0f0'}}> BEST SCORE </Text>
                  </Col>
                  <Col style={{ justifyContent: 'center', alignItems: 'center'  }}>
                    <Icon name='school' />
                    <Title style={{ color: '#fff0f0', fontSize: 25}}> BEGINNER </Title>
                    <Text style={{ color: '#fff0f0'}}> GAME RANK </Text>
                  </Col>
                </View>
              </Image>
              
            </Row>
            <Row size={45}>
              <Tabs initialPage={0} >
                <Tab heading="BENIFITS">
                  <BenifitsTab />
                </Tab>
                <Tab heading="CHALLENGES">
                  <ChallengesTab />
                </Tab>
                <Tab heading="SCORES">
                  <ScoresTab />
                </Tab>
              </Tabs>
            </Row>
          </Grid>
        </Content>
        <Footer>
          <FooterTab>
            <Button rounded>
              <Text style={{ fontSize:20 }}>PLAY GAME</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
