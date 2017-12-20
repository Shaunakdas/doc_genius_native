import React from 'react';
import { Text, Image, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import { NavigationActions } from 'react-navigation';


import { commonStyle as cs, signupPageStyle as s, font } from '../common/styles';
import { Button, IconButton, Input } from '../components';
import IMAGES from '../common/images';
import { validateEmail, saveData } from '../common/helper';
import COLORS, { alpha } from '../common/colors';
// import { STUDENT_ROLE, COUNSELOR_ROLE } from '../common/constants';
import { signupAPI } from '../common/api';
import { loggedIn, setLoggedInUser, setAuthToken } from '../store/actions';

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
    // const { navigation = {} } = props;
    // const { params = {} } = navigation.state;
    // const { role = STUDENT_ROLE } = params;
    this.inputs = {};
    this.state = {
      signingUp: false,
      values: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      errors: {
        email: '',
        password: '',
        confirmPassword: '',
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
        email: '',
        password: '',
        confirmPassword: '',
      },
    }, this.validate);
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  validate = () => {
    const {
      email,
      password,
      confirmPassword,
    } = this.state.values;
    const errors = {
      email: email ? '' : 'Email is required',
      password: password ? '' : 'Password is required',
      confirmPassword: confirmPassword ? '' : 'Password is required',
    };

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
    const { setUser } = this.props;
    const {
      email,
      password,
      confirmPassword,
    } = this.state.values;
    const response = await signupAPI({
      email,
      password,
      confirmPassword,
    });
    if (response.success === false) {
      // console.log(response.json());
      const overallError = response.message || response.error || 'Signup failed try again!';
      this.setState({ errors: {
        ...this.state.errors,
        overall: typeof overallError === 'string' ? overallError : 'Signup failed try again!',
      },
      signingUp: false });
    } else {
      console.log(response);
      setUser(response);
      const { auth_token: authToken } = response;
      await saveData('AUTH_TOKEN', authToken);
      this.props.setToken(authToken);
      this.setState({ signingUp: false });
      this.props.navigation.dispatch(
        {
          type: 'Navigation/NAVIGATE',
          routeName: 'SignupFormPage',
        },
      );
      // this.props.navigate('')
    }
  }

  render() {
    const { errors, signingUp } = this.state;
    const {
      email,
      password,
      confirmPassword,
    } = this.state.values;
    return (
      <KeyboardAvoidingView
        style={[cs.container, s.container]}
      >
        <ScrollView
          style={cs.scroll}
          contentContainerStyle={cs.scrollContent}
        >
          <Image
            style={s.logo}
            source={IMAGES.LOGO}
          />
          <Text style={s.mainText}>Sign-Up</Text>
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
  setToken: authToken => dispatch(setAuthToken(authToken)),
  setLoggedIn: () => dispatch(loggedIn()),
  setUser: user => dispatch(setLoggedInUser(user)),
});


export default connect(null, mapDispatchToProps)(SignupPage);
