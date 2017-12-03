import React from 'react';
import { Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Text } from 'native-base';
import { PropTypes } from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { commonStyle as cs, loginPageStyle as s, font } from '../common/styles';
import { Button, IconButton, Input } from '../components';
import IMAGES from '../common/images';
import { saveData } from '../common/helper';
import { NON_VERIFIED_LOGIN } from '../common/constants';
import {
  loginAPI,
  forgotPasswordAPI,
} from '../common/api';
import COLORS, { alpha } from '../common/colors';
import {
  startLogIn,
  loginError,
  loggedIn,
  setAuthToken,
  setLoggedInUser,
} from '../store/actions';

const commonInputProps = {
  style: cs.input,
  autoCorrect: false,
  returnKeyType: 'next',
  placeholderTextColor: alpha(COLORS.WHITE, 0.4),
  selectionColor: COLORS.WHITE,
  maxLength: 30,
  autoCapitalize: 'none',
};

class LoginPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    loggingIn: PropTypes.bool.isRequired,
    start: PropTypes.func.isRequired,
    finish: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props); this.inputs = {};
    this.state = {
      resetting: false,
      forgotState: false,
      values: {
        username: '',
        password: '',
      },
      errors: {
        username: '',
        password: '',
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
    if (nextFieldName && this.inputs[nextFieldName]) { this.inputs[nextFieldName].focus(); }
  }

  getStarted = async () => {
    const { forgotState } = this.state;
    if (forgotState) {
      this.setState({
        errors: {
          username: '',
          password: '',
          overall: '',
        },
      });
      const { username } = this.state.values;
      if (username) {
        const { navigation } = this.props;
        this.setState({ resetting: true });
        const response = await forgotPasswordAPI(username);
        this.setState({ resetting: false });
        if (response.success === false) {
          this.setState({
            errors: {
              overall: 'User not found',
            },
          });
          return;
        }
        navigation.navigate('ForgotPasswordPage', { username });
      } else {
        this.setState({
          errors: {
            username: 'Please enter username',
          },
        });
      }
    } else {
      const { start } = this.props;
      start();
      this.setState({
        errors: {
          username: '',
          password: '',
          overall: '',
        },
      }, this.validate);
    }
  }

  goBack = () => {
    const { forgotState } = this.state;
    if (forgotState) {
      this.setState({ forgotState: false,
        errors: {
          username: '',
          password: '',
          overall: '',
        } });
    } else {
      const { navigation } = this.props;
      navigation.goBack();
    }
  }

  validate = () => {
    const { error } = this.props;
    const {
      username,
      password,
    } = this.state.values;
    const errors = {
      username: username ? '' : 'Username is required',
      password: password ? '' : 'Password is required',
    };
    this.setState({
      errors,
    }, () => {
      if (Object.values(errors).every(value => value === '')) { this.login(); } else { error(); }
    });
  }

  addInput = fieldName => (input) => {
    this.inputs[fieldName] = input;
  }

  forgotPassword = async () => {
    this.setState({ forgotState: true,
      errors: {
        username: '',
        password: '',
        overall: '',
      } });
  }

  login = async () => {
    const { username, password } = this.state.values;
    const { finish, error, setUser }
      = this.props;
    const response = await loginAPI(username, password);
    if (response.success === false) {
      if (response.error === NON_VERIFIED_LOGIN) {
        setUser({ username });
        this.setState({ signingUp: false });
        this.props.navigation.dispatch(
          {
            type: 'Navigation/NAVIGATE',
            routeName: 'VerifyPage',
          },
        );
      } else {
        this.setState({
          errors: {
            ...this.state.errors,
            overall: 'Username or password you entered is incorrect.\nPlease try again or reset password',
          },
        });
      }
      error();
    } else {
      const { auth_token: authToken } = response;
      await saveData('AUTH_TOKEN', authToken);
      this.props.setToken(authToken);
      finish();
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'GameListPage' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  render() {
    const {
      username,
      password,
    } = this.state.values;
    const { errors, resetting, forgotState } = this.state;
    const { loggingIn } = this.props;
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
          <Text style={[s.mainText, forgotState ? { fontSize: 12 } : null]}>
            {forgotState ? 'Enter username to reset password.' : 'Log In'}
          </Text>
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
            onSubmit={this.onSubmit(!forgotState ? 'password' : '')}
          />
          {!forgotState ? <Input
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
            onSubmit={this.onSubmit('')}
          /> : null}
          {errors.overall ? <Text style={{
            color: alpha(COLORS.RED, 0.7),
            marginHorizontal: 20,
            ...font(10),
            textAlign: 'center',
          }}
          >{typeof errors.overall === 'string' ? errors.overall : "Couldn't login now. Try later"}</Text> : null}
          {!forgotState ? <Button
            text="Forgot Password?"
            style={s.forgotPasswordButton}
            textStyle={s.forgotPasswordButtonText}
            loadingColor={COLORS.WHITE}
            onPress={this.forgotPassword}
            isLoading={resetting}
          /> : null }
          <Button
            text={forgotState ? 'Reset Password' : 'Get Started'}
            style={[cs.getStartedButton, s.button]}
            textStyle={[cs.getStartedButtonText]}
            onPress={this.getStarted}
            isLoading={loggingIn || resetting}
            loadingColor={COLORS.PRIMARY}
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

const mapStateToProps = ({ loginState }) => {
  const { loggingIn } = loginState;
  return { loggingIn };
};

const mapDispatchToProps = dispatch => ({
  setToken: authToken => dispatch(setAuthToken(authToken)),
  start: () => dispatch(startLogIn()),
  finish: () => dispatch(loggedIn()),
  setUser: user => dispatch(setLoggedInUser(user)),
  error: () => dispatch(loginError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
