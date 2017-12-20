import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { NavigationActions } from 'react-navigation';
// import {
//   Image,
//   Text,  
// } from 'react-native';
// import IMAGES from '../common/images';
import { font } from '../common/styles';
import { updateAPI } from '../common/api';
import COLORS, { alpha } from '../common/colors';
import TextInput from './text-input';
import StandardPicker from './standard-picker';
import { validMobileNumber, validDateOfBirth } from '../common/helper';

const commonInputProps = {
  // style: cs.input,
  autoCorrect: false,
  returnKeyType: 'next',
  placeholderTextColor: alpha(COLORS.WHITE, 0.4),
  selectionColor: COLORS.WHITE,
  maxLength: 30,
  autoCapitalize: 'none',
};
class SignUpform extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = {
      date: "01-05-2006",
      signingUp: false,
      values: {
        firstName: '',
        lastName: '',
        sex: '',
        dateOfBirth: '',
        mobileNumber: '',
        standard: '',
      },
      errors: {
        firstName: '',
        lastName: '',
        sex: '',
        dateOfBirth: '',
        mobileNumber: '',
        overall: '',
      },
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.onStandardChange = this.onStandardChange.bind(this);
  }

  static propTypes = {
    standards: PropTypes.any,
    authToken: PropTypes.any,
    nextAction: PropTypes.func,
  }

  static defaultProps = {
    standards: [
      { label: '6th Class', key: '6' },
      { label: '7th Class', key: '7' },
      { label: '8th Class', key: '8' },
      { label: '9th Class', key: '9' },
      { label: '10th Class', key: '10' },
    ],
    authToken: '',
    nextAction: () => {},
  }

  onValueChange = fieldName => (value) => {
    console.log(value);
    this.setState({
      values: {
        ...this.state.values,
        [fieldName]: value,
      },
      errors: {
        ...this.state.errors,
        [fieldName]: '',
      },
    });
  }
  
  onSubmit = nextFieldName => () => {
    if (nextFieldName) { this.inputs[nextFieldName].focus(); }
  }
  
  getStarted = () => {
    this.setState({
      signingUp: true,
      errors: {
        firstName: '',
        lastName: '',
        sex: '',
        dateOfBirth: '',
        mobileNumber: '',
        overall: '',
      },
    }, this.validate);
  }
  
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  validate = () => {
    const {
      firstName,
      lastName,
      sex,
      dateOfBirth,
      mobileNumber,
      standard,
    } = this.state.values;
    console.log(this.state.values);
    const errors = {
      firstName: firstName ? '' : 'First Name is required',
      lastName: lastName ? '' : 'Last Name is required',
      sex: '',
      dateOfBirth: dateOfBirth ? '' : 'Date of Birth is required',
      mobileNumber: mobileNumber ? '' : 'Mobile is required',
    };

    if (mobileNumber && !validMobileNumber(mobileNumber)) {
      errors.mobileNumber = 'Not a valid mobile';
    }

    if (dateOfBirth && !validDateOfBirth(dateOfBirth)) {
      errors.dateOfBirth = 'Please enter a date of Birth';
    }
    console.log(errors);
    this.setState({
      errors,
    }, () => {
      console.log('YES!!');
      if (Object.values(errors).every(value => value === '')) { console.log('YES!!'); this.signup(); } else { console.log('NO!!'); this.setState({ signingUp: false }); }
    });
  }

  signup = async () => {
    // const { setUser } = this.props;
    const {
      firstName,
      lastName,
      sex,
      dateOfBirth,
      mobileNumber,
      standard,
    } = this.state.values;
    const { authToken } = this.props;
    const response = await updateAPI({
      authToken,
      first_name: firstName,
      last_name: lastName,
      sex,
      birth: dateOfBirth,
      mobile_number: mobileNumber,
      standard_id: 1,
    });
    console.log(response);
    if (response.success === false) {
      const error = response.error;
      this.setState({ errors: {
        ...this.state.errors,
        overall: typeof error === 'string' ? error : 'User Details Update failed, try again',
      },
      signingUp: false });
    } else {
      console.log(response);
      this.setState({ signingUp: false });
      this.props.nextAction();
      // const resetAction = NavigationActions.reset({
      //   index: 0,
      //   actions: [
      //     NavigationActions.navigate({ routeName: 'GamesListPage' }),
      //   ],
      // });
      // this.props.navigation.dispatch(resetAction);
    }
  }

  addInput = fieldName => (input) => {
    this.inputs[fieldName] = input;
  }

  onDateChange = (date) => {
    // this.setState({ values.dateOfBirth: date });
    // onValueChange(dateOfBirth) = date;
    // this.onValueChange('dateOfBirth')=date;
    this.setState({
      values: {
        ...this.state.values,
        ['dateOfBirth']: date,
      },
      errors: {
        ...this.state.errors,
        ['dateOfBirth']: '',
      },
    });
    console.log(this.state.values.dateOfBirth);
  }

  onStandardChange = (value) => {
    this.setState({ standard: value });
  }
  
  render() {
    const {
      standards
       } = this.props;
    const { errors, signingUp } = this.state;
    const {
      firstName,
      lastName,
      sex,
      dateOfBirth,
      mobileNumber,
      standard,
    } = this.state.values;
    return (
      <Container style={{ marginTop: 25, paddingTop: 10, backgroundColor: '#00bfff' }}>
        <Title></Title>
        <Title>ABOUT YOU</Title>
        <Title></Title>
        <Title></Title>
        <Title></Title>
        <Text style={{ color: '#ffffff', paddingHorizontal: 20, alignContent: 'center' }}>
        Enter your personal details so we can personalize your experience
        </Text>

        <Title></Title>
        <Content>
          <Form>
            <Grid >
              <Row style={{ paddingHorizontal: 10 }}>
                <Col>
                  <Item stackedLabel>
                  {errors.firstName? 
                    <Label style={{ color: '#ff0000', fontSize: 14}}>{errors.firstName}</Label> : 
                    <Label style={{ color: '#0FF'}}>{'First Name'}</Label>
                  }
                    <TextInput
                      inputProps={{
                        ...commonInputProps,
                      }}
                      autoFocus={true}
                      error={errors.firstName}
                      value={firstName}
                      ref={this.addInput('firstName')}
                      onChange={this.onValueChange('firstName')}
                    />
                  </Item>
                </Col>
                <Col>
                  <Item stackedLabel>
                    {errors.lastName? 
                      <Label style={{ color: '#ff0000', fontSize: 14}}>{errors.lastName}</Label> : 
                      <Label style={{ color: '#0FF'}}>{'Last Name'}</Label>
                    }
                    <TextInput
                      inputProps={{
                        ...commonInputProps,
                      }}
                      ref={this.addInput('lastName')}
                      error={errors.lastName}
                      value={lastName}
                      onChange={this.onValueChange('lastName')}
                      onSubmit={this.validate}
                      />
                  </Item>
                </Col>
              </Row>
              <Row style={{ paddingHorizontal: 10, marginTop: 20 }}>
                <Col style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                <Label style={{ color: '#0FF' }}>Date of Birth</Label>
                  <CalendarPicker onDateChange={this.onDateChange} date={this.state.values.dateOfBirth} />
                </Col>
                <Col style={{ justifyContent: 'flex-end'}}>
                  <StandardPicker
                    standards={standards}
                    selected={this.state.standard}
                    onValueChange={this.onStandardChange} />
                </Col>
              </Row>

              <Text>{'\n'}</Text>
              <Row style={{ paddingHorizontal: 30 }}>
                <Col style={{ justifyContent: 'center', flex: 0}}>
                {errors.mobileNumber? 
                  <Text style={{ color: '#ff0000', fontSize: 14}}>{errors.mobileNumber}</Text> : 
                  <Text style={{ color: '#0FF' }}>Mobile Number</Text>
                }
                </Col>
                <Col style={{ justifyContent: 'flex-end'}}>
                  <Item fixedLabel>
                    <Label style={{ color: '#0FF', flex: 0 }}>+91</Label>
                    <TextInput 
                      style={{ color: '#FFF' }}
                      keyboardType = 'numeric'
                      value={mobileNumber}
                      onChange={this.onValueChange('mobileNumber')}/>
                  </Item>
                </Col>
              </Row>
              {errors.overall ?
                  <Text
                    style={{
                      color: alpha(COLORS.RED, 0.7), paddingHorizontal: 20, paddingTop:20, alignContent: 'center'
                    }}
                  >
                    {errors.overall}
                  </Text>
                  : null}
              <Row style={{ padding: 20, justifyContent: 'center' }}>
                
                <Col>
                  <Button block primary rounded
                  onPress={this.getStarted}>
                    <Text> SUBMIT </Text>
                  </Button>
                </Col>
              </Row>
            </Grid>
          </Form>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = ({
  loginState: { authToken },
}) =>
  ({  authToken });

export default connect(mapStateToProps)(SignUpform);