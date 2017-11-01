import React from 'react';
import { Text, Image, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { setLoggedInUser } from '../store/actions';
// import { NavigationActions } from 'react-navigation';


import { commonStyle as cs, signupPageStyle as s, font } from '../common/styles';
import { Button, IconButton, Input } from '../components';
import IMAGES from '../common/images';
// import { validateEmail } from '../common/helper';
import COLORS, { alpha } from '../common/colors';
// import { STUDENT_ROLE, COUNSELOR_ROLE } from '../common/constants';
import { studentSignUpApI } from '../common/api';
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

  onValueChange = fieldName => (value) => {
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
        // email: '',
        // password: '',
        // confirmPassword: '',
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
      // email,
      // password,
      // confirmPassword,
      mobileNumber,
    } = this.state.values;
    const errors = {
      firstName: firstName ? '' : 'Full Name is required',
      lastName: lastName ? '' : 'Full Name is required',
      sex: sex ? '' : 'Full Name is required',
      dateOfBirth: dateOfBirth ? '' : 'Full Name is required',
      // email: email ? '' : 'Email is required',
      // password: password ? '' : 'Password is required',
      // confirmPassword: confirmPassword ? '' : 'Password is required',
      mobileNumber: mobileNumber ? '' : 'Graduation year is required',
    };

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
    this.setState({
      errors,
    }, () => {
      if (Object.values(errors).every(value => value === '')) { this.signup(); } else { this.setState({ signingUp: false }); }
    });
  }

  addInput = fieldName => (input) => {
    this.inputs[fieldName] = input;
  }

  signup = async () => {
    const { setUser } = this.props;
    const {
      firstName,
      lastName,
      sex,
      dateOfBirth,
      mobileNumber,
    } = this.state.values;
    const response = await studentSignUpApI({
      firstName,
      lastName,
      sex,
      dateOfBirth,
      mobileNumber,
    });
    if (response.success === false) {
      const overallError = response.message || response.error || 'Signup failed try again!';
      this.setState({ errors: {
        ...this.state.errors,
        overall: typeof overallError === 'string' ? overallError : 'Signup failed try again!',
      },
      signingUp: false });
    } else {
      setUser(response);
      this.setState({ signingUp: false });
      this.props.navigation.dispatch(
        {
          type: 'Navigation/NAVIGATE',
          routeName: 'VerifyPage',
        },
      );
    }
  }

  render() {
    const { role, errors, signingUp } = this.state;
    const {
      firstName,
      lastName,
      sex,
      dateOfBirth,
      mobileNumber,
    } = this.state.values;
    return (
      <KeyboardAvoidingView
        style={[cs.container, s.container]}
        behavior="padding"
      >
        <ScrollView
          style={cs.scroll}
          contentContainerStyle={cs.scrollContent}
        >
          <Image
            style={s.logo}
            source={IMAGES.LOGO}
          />
          <Text style={s.mainText}>{role} Sign-Up</Text>
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'First Name',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.firstName}
            value={firstName}
            ref={this.addInput('firstName')}
            onChange={this.onValueChange('firstName')}
            onSubmit={this.onSubmit('lastName')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Last Name',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.lastName}
            value={lastName}
            ref={this.addInput('lastName')}
            onChange={this.onValueChange('lastName')}
            onSubmit={this.onSubmit('email')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Sex',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.sex}
            value={sex}
            ref={this.addInput('sex')}
            onChange={this.onValueChange('sex')}
            onSubmit={this.onSubmit('dateOfBirth')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Date Of Birth',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.dateOfBirth}
            value={dateOfBirth}
            ref={this.addInput('dateOfBirth')}
            onChange={this.onValueChange('dateOfBirth')}
            onSubmit={this.onSubmit('mobileNumber')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Mobile Number',
              keyboardType: 'numeric',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.mobileNumber}
            value={mobileNumber}
            ref={this.addInput('mobileNumber')}
            onChange={this.onValueChange('mobileNumber')}
            onSubmit={this.onSubmit('')}
          />
          {errors.overall ? <Text style={{
            color: alpha(COLORS.RED, 0.7),
            marginTop: 3,
            marginBottom: 20,
            ...font(10),
            marginHorizontal: 50,
            textAlign: 'center',
          }}
          >{errors.overall}</Text> : null}
          <Button
            text="Get Started"
            style={[cs.getStartedButton, s.button]}
            textStyle={[cs.getStartedButtonText]}
            onPress={this.getStarted}
            loadingColor={COLORS.PRIMARY}
            isLoading={signingUp}
          />
          <View style={{ height: 60 }} />
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
  currentUser,
  loginState: { authToken },
}) =>
  ({ currentUser, authToken });

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setLoggedInUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupFormPage);
