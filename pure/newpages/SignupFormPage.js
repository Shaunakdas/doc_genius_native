import React from 'react';
import { Text, Image, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { setLoggedInUser } from '../store/actions';
import {
  Button,
} from 'native-base';
import { NavigationActions } from 'react-navigation';


import { commonStyle as cs, signupPageStyle as s } from '../common/styles';
import { SignUpForm, IconButton, Input } from '../components';
import IMAGES from '../common/images';
// import { validateEmail } from '../common/helper';
import COLORS, { alpha } from '../common/colors';
// import { STUDENT_ROLE, COUNSELOR_ROLE } from '../common/constants';
import { standardsAPI ,updateAPI } from '../common/api';
// import { loggedIn, setLoggedInUser } from '../store/actions';

const commonInputProps = {
  style: cs.input,
  autoCorrect: false,
  returnKeyType: 'next',
  placeholderTextColor: alpha(COLORS.WHITE, 0.4),
  selectionColor: COLORS.WHITE,
  maxLength: 30,
  autoCapitalize: 'none',
};

class SignupFormPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    // currentUser: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props);
    // const { currentUser: user } = props;
    this.inputs = {};
    this.state = {
      signingUp: false,
      standards: [
        { label: '6th Class', key: '6' },
        { label: '6th Class', key: '7' },
      ],
      values: {
        firstName: '',
        lastName: '',
        sex: '',
        dateOfBirth: '',
        // email: '',
        // password: '',
        // confirmPassword: '',
        mobileNumber: '',
      },
      errors: {
        firstName: '',
        lastName: '',
        sex: '',
        dateOfBirth: '',
        // email: '',
        // password: '',
        // confirmPassword: '',
        mobileNumber: '',
        overall: '',
      },
    };
  }
  
  nextAction = () =>{
    console.log('nextAction');
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'GameListPage' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  
  auth = () =>{
    const { authToken } = this.props;
    return authToken;
  }
  fetchStandards = async () =>{
    console.log('fetchStandards');
    const { authToken } = this.props;
    console.log(authToken);
    const standardResponse = await standardsAPI() || {};
    console.log(standardResponse);
    if (standardResponse.success !== false) {
      this.setState({ standards: standardResponse.standards});
    }
  }
  
  async componentDidMount() {
    await this.fetchStandards();
  }
  
  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  // validate = () => {
  //   const {
  //     firstName,
  //     lastName,
  //     sex,
  //     dateOfBirth,
  //     // email,
  //     // password,
  //     // confirmPassword,
  //     mobileNumber,
  //   } = this.state.values;
  //   const errors = {
  //     firstName: firstName ? '' : 'Full Name is required',
  //     lastName: lastName ? '' : 'Full Name is required',
  //     sex: sex ? '' : 'Full Name is required',
  //     dateOfBirth: dateOfBirth ? '' : 'Full Name is required',
  //     // email: email ? '' : 'Email is required',
  //     // password: password ? '' : 'Password is required',
  //     // confirmPassword: confirmPassword ? '' : 'Password is required',
  //     mobileNumber: mobileNumber ? '' : 'Graduation year is required',
  //   };

    // if (graduationYear && !validGraduationYear(graduationYear)) {
    //   errors.graduationYear = 'Not a valid graduation year';
    // }

    // if (email && !validateEmail(email)) {
    //   errors.email = 'Please enter a valid email';
    // }

    // if (password && password.length < 8) {
    //   errors.password = 'Must be at least 8 characters';
    // }

    // if (password && confirmPassword && password !== confirmPassword) {
    //   errors.confirmPassword = "Passwords didn't match";
    // }
  //   this.setState({
  //     errors,
  //   }, () => {
  //     if (Object.values(errors).every(value => value === '')) { this.update(); } else { this.setState({ signingUp: false }); }
  //   });
  // }

  // addInput = fieldName => (input) => {
  //   this.inputs[fieldName] = input;
  // }

  // update = async () => {
  //   const { authToken, setUser } = this.props;
  //   const {
  //     firstName,
  //     lastName,
  //     sex,
  //     dateOfBirth,
  //     mobileNumber,
  //   } = this.state.values;
  //   const response = await updateAPI({
  //     authToken,
  //     firstName,
  //     lastName,
  //     sex,
  //     dateOfBirth,
  //     mobileNumber,
  //   });
  //   if (response.success === false) {
  //     const overallError = response.message || response.error || 'Signup failed try again!';
  //     this.setState({ errors: {
  //       ...this.state.errors,
  //       overall: typeof overallError === 'string' ? overallError : 'Signup failed try again!',
  //     },
  //     signingUp: false });
  //   } else {
  //     setUser(response);
  //     this.setState({ signingUp: false });
  //     this.props.navigation.dispatch(
  //       {
  //         type: 'Navigation/NAVIGATE',
  //         routeName: 'LandingPage',
  //       },
  //     );
  //   }
  // }

  render() {
    return (
      <KeyboardAvoidingView
        style={[cs.container, s.container]}
      >
        <ScrollView
          style={cs.scroll}
          contentContainerStyle={cs.scrollContent}
        >
          <SignUpForm
            standards={this.state.standards}
            nextAction={this.nextAction}
            authtoken={this.auth}
          />
        </ScrollView>
        <IconButton
          source={IMAGES.BACK}
          style={cs.backButton}
          imageStyle={cs.backImage}
          onPress={this.goBack}
        />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({
  loginState: { authToken },
}) =>
  ({  authToken });

export default connect(mapStateToProps)(SignupFormPage);
