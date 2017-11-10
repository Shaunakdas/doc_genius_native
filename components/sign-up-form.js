import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import CalendarPicker from './calendar-picker.js';
// import {
//   Image,
//   Text,  
// } from 'react-native';
// import IMAGES from '../common/images';
// import GameTab from './game-tab';
import StandardPicker from './standard-picker';

export default class SignUpform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "01-05-2006",
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange = (date) => {
    this.setState({ date: date });
    console.log(this.state.date);
  }

  static propTypes = {
    standards: PropTypes.any,
  }

  static defaultProps = {
    standards: [
      { label: '6th Class', key: '6' },
      { label: '7th Class', key: '7' },
      { label: '8th Class', key: '8' },
      { label: '9th Class', key: '9' },
      { label: '10th Class', key: '10' },
    ],
  }
  
  render() {
    const {
      standards } = this.props;
    return (
      <Container style={{ marginTop: 25, paddingTop: 10, backgroundColor: '#00bfff' }}>
        <Title>ABOUT YOU</Title>
        <Text style={{ color: '#ffffff', paddingHorizontal: 20, alignContent: 'center' }}>
        Enter your personal details so we can personalize your experience
        </Text>
        <Content>
          <Form>
            <Grid >
              <Row style={{ paddingHorizontal: 10 }}>
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
              <Row style={{ paddingHorizontal: 10, marginTop: 20 }}>
                <Col style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                <Label style={{ color: '#0FF' }}>Date of Birth</Label>
                  <CalendarPicker onDateChange={this.onDateChange} date={this.state.date} />
                </Col>
                <Col style={{ justifyContent: 'flex-end'}}>
                  <StandardPicker standards={standards}/>
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
