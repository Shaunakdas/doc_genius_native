import React, { Component } from 'react';
import {
  Form,
  Container,
  Text,
  Input,
  Content,
  Label,
  Title,
  Item,
  Grid,
  Col,
  Row,
  Button,
} from 'native-base';
// import {
//   Image,
//   Text,  
// } from 'react-native';
// import IMAGES from '../common/images';
// import GameTab from './game-tab';
import StandardPicker from './standard-picker';

export default class SignUpform extends Component {
  render() {
    return (
      <Container style={{ marginTop: 25, paddingTop: 10, backgroundColor: '#00bfff' }}>
        <Title>ABOUT YOU</Title>
        <Text style={{ color: '#ffffff', paddingHorizontal: 20, alignContent: 'center' }}>
        Enter your personal details so we can personalize your experience
        </Text>
        <Content>
          <Form>
            <Grid >
              <Row style={{ paddingHorizontal: 5 }}>
                <Col>
                  <Item floatingLabel>
                    <Label style={{ color: '#0FF'}}>First Name</Label>
                    <Input style={{ color: '#FFF' }}/>
                  </Item>
                </Col>
                <Col>
                  <Item floatingLabel>
                    <Label style={{ color: '#0FF' }}>Last Name</Label>
                    <Input style={{ color: '#FFF' }}/>
                  </Item>
                </Col>
              </Row>
              <Row style={{ paddingHorizontal: 5 }}>
                <Col>
                  <Item floatingLabel>
                    <Label style={{ color: '#0FF' }}>Date of Birth</Label>
                    <Input style={{ color: '#FFF' }}/>
                  </Item>
                </Col>
                <Col style={{ justifyContent: 'flex-end'}}>
                  <StandardPicker />
                </Col>
              </Row>

              <Text>{'\n'}</Text>
              <Row style={{ paddingHorizontal: 30 }}>
                <Col style={{ justifyContent: 'center', flex: 0}}>
                  <Text style={{ color: '#0FF' }}>Mobile Number</Text>
                </Col>
                <Col style={{ justifyContent: 'flex-end'}}>
                  <Item fixedLabel>
                    <Label style={{ color: '#0FF', flex: 0 }}>+91</Label>
                    <Input style={{ color: '#FFF' }} keyboardType = 'numeric'/>
                  </Item>
                </Col>
              </Row>
              <Row style={{ padding: 40, justifyContent: 'center' }}>
                <Col>
                  <Button block primary rounded><Text> SUBMIT </Text></Button>
                </Col>
              </Row>
            </Grid>
          </Form>
        </Content>
      </Container>
    );
  }
}
