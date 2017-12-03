import React from 'react';
import { Text, Image, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';


import { commonStyle as cs, signupPageStyle as s, font } from '../common/styles';
import { Button, IconButton, Input } from '../components';
import IMAGES from '../common/images';
import { validateEmail, validGraduationYear, saveData } from '../common/helper';
import COLORS, { alpha } from '../common/colors';
import { STUDENT_ROLE, COUNSELOR_ROLE } from '../common/constants';
import { studentSignUpApI, counselorSignUpApI } from '../common/api';
import { loggedIn, setLoggedInUser } from '../store/actions';

const commonInputProps = {
  style: cs.input,
  autoCorrect: false,
  returnKeyType: 'next',
  placeholderTextColor: alpha(COLORS.WHITE, 0.4),
  selectionColor: COLORS.WHITE,
  maxLength: 30,
  autoCapitalize: 'none',
};

class SignupPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const { navigation = {} } = props;
    const { params = {} } = navigation.state;
    const { role = STUDENT_ROLE } = params;
    this.inputs = {};
    this.state = {
      signingUp: false,
      values: {
        schoolCode: '',
        counselorCode: '',
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        graduationYear: '',
      },
      errors: {
        schoolCode: '',
        counselorCode: '',
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        graduationYear: '',
        overall: '',
      },
      role,
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
        schoolCode: '',
        counselorCode: '',
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        graduationYear: '',
        overall: '',
      },
    }, this.validate);
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  validate = () => {
    const { role } = this.state;
    const {
      schoolCode,
      counselorCode,
      fullName,
      email,
      username,
      password,
      confirmPassword,
      graduationYear,
    } = this.state.values;
    const errors = {
      schoolCode: schoolCode ? '' : 'School Code is required',
      counselorCode: counselorCode || role === STUDENT_ROLE ? '' : 'Counselor Code is required',
      fullName: fullName ? '' : 'Full Name is required',
      email: email ? '' : 'Email is required',
      username: username ? '' : 'Username is required',
      password: password ? '' : 'Password is required',
      confirmPassword: confirmPassword ? '' : 'Password is required',
      graduationYear: graduationYear || role === COUNSELOR_ROLE ? '' : 'Graduation year is required',
    };

    if (graduationYear && !validGraduationYear(graduationYear)) {
      errors.graduationYear = 'Not a valid graduation year';
    }

    if (email && !validateEmail(email)) {
      errors.email = 'Please enter a valid email';
    }

    if (password && password.length < 8) {
      errors.password = 'Must be at least 8 characters';
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "Passwords didn't match";
    }
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
    const { role } = this.state;
    const { setUser } = this.props;
    const {
      fullName,
      email,
      username,
      password,
      graduationYear,
      counselorCode,
      schoolCode,
    } = this.state.values;

    if (role === STUDENT_ROLE) {
      const response = await studentSignUpApI({
        fullName,
        email,
        username,
        graduationYear,
        password,
        schoolCode,
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
    } else if (role === COUNSELOR_ROLE) {
      const response = await counselorSignUpApI({
        fullName,
        email,
        username,
        password,
        counselorCode,
        schoolCode,
      });
      if (response.success === false) {
        const error = response.error;
        this.setState({ errors: {
          ...this.state.errors,
          overall: typeof error === 'string' ? error : 'Signup failed try again!',
        },
        signingUp: false });
      } else {
        const { auth_token: authToken } = response;
        saveData('AUTH_TOKEN', authToken);
        this.setState({ signingUp: false });
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'SplashPage' }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      }
    }
  }

  render() {
    const { role, errors, signingUp } = this.state;
    const {
      schoolCode,
      counselorCode,
      fullName,
      email,
      username,
      password,
      confirmPassword,
      graduationYear,
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
              placeholder: 'School Code',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.schoolCode}
            value={schoolCode}
            ref={this.addInput('schoolCode')}
            onChange={this.onValueChange('schoolCode')}
            onSubmit={this.onSubmit(role === STUDENT_ROLE ? 'graduationYear' : 'counselorCode')}
          />
          {role === STUDENT_ROLE ? <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Graduation Year',
              keyboardType: 'numeric',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.graduationYear}
            value={graduationYear}
            ref={this.addInput('graduationYear')}
            onChange={this.onValueChange('graduationYear')}
            onSubmit={this.onSubmit('fullName')}
          /> : null}
          {role === COUNSELOR_ROLE ? <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Activation Token',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.counselorCode}
            value={counselorCode}
            ref={this.addInput('counselorCode')}
            onChange={this.onValueChange('counselorCode')}
            onSubmit={this.onSubmit('fullName')}
          /> : null}
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Full Name',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.fullName}
            value={fullName}
            ref={this.addInput('fullName')}
            onChange={this.onValueChange('fullName')}
            onSubmit={this.onSubmit('email')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Email',
              keyboardType: 'email-address',
              maxLength: 50,
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.email}
            value={email}
            ref={this.addInput('email')}
            onChange={this.onValueChange('email')}
            onSubmit={this.onSubmit('username')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Username',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.username}
            value={username}
            ref={this.addInput('username')}
            onChange={this.onValueChange('username')}
            onSubmit={this.onSubmit('password')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Password',
              secureTextEntry: true,
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.password}
            value={password}
            ref={this.addInput('password')}
            onChange={this.onValueChange('password')}
            onSubmit={this.onSubmit('confirmPassword')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Re-type Password',
              secureTextEntry: true,
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.confirmPassword}
            value={confirmPassword}
            ref={this.addInput('confirmPassword')}
            onChange={this.onValueChange('confirmPassword')}
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

const mapDispatchToProps = dispatch => ({
  setLoggedIn: () => dispatch(loggedIn()),
  setUser: user => dispatch(setLoggedInUser(user)),
});


export default connect(null, mapDispatchToProps)(SignupPage);
