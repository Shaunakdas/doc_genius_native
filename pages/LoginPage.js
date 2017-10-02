import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { commonStyle as cs, loginPageStyle as s, font } from '../common/styles';
import { Button, IconButton, Input } from '../components';
import IMAGES from '../common/images';
import { saveData } from '../common/helper';
import {
  loginAPI,
  forgotPasswordAPI,
} from '../common/api';
import COLORS, { alpha } from '../common/colors';
import {
  startLogIn,
  loginError,
  loggedIn,
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
        const response = await forgotPasswordAPI(username);
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
    const { finish, error }
      = this.props;
    const response = await loginAPI(username, password);
    if (response.success === false) {
      this.setState({
        errors: {
          ...this.state.errors,
          overall: 'Login credentials are not valid!',
        },
      });
      error();
    } else {
      const { auth_token: authToken } = response;
      await saveData('AUTH_TOKEN', authToken);
      finish();
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'SplashPage' }),
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
      <View style={[cs.container, s.container]}>
        <Image
          style={s.logo}
          source={IMAGES.LOGO}
        />
        <ScrollView
          alwaysBounceVertical={false}
          style={cs.scroll}
          contentContainerStyle={cs.scrollContent}
        >
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
            onSubmit={this.onSubmit(forgotState ? 'password' : '')}
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
          {!forgotState ? <Button
            text="Forgot Password?"
            style={s.forgotPasswordButton}
            textStyle={s.forgotPasswordButtonText}
            loadingColor={COLORS.WHITE}
            onPress={this.forgotPassword}
            isLoading={resetting}
          /> : null }
          {errors.overall ? <Text style={{
            color: alpha(COLORS.RED, 0.7),
            marginTop: 3,
            marginBottom: 20,
            ...font(10),
          }}
          >{typeof errors.overall === 'string' ? errors.overall : "Couldn't login now. Try later"}</Text> : null}
          <Button
            text={forgotState ? 'Reset Password' : 'Get Started'}
            style={[cs.getStartedButton, s.button]}
            textStyle={[cs.getStartedButtonText]}
            onPress={this.getStarted}
            isLoading={loggingIn}
            loadingColor={COLORS.PRIMARY}
          />
        </ScrollView>
        <IconButton
          source={IMAGES.BACK}
          style={cs.backButton}
          imageStyle={cs.backImage}
          onPress={this.goBack}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ loginState }) => {
  const { loggingIn } = loginState;
  return { loggingIn };
};

const mapDispatchToProps = dispatch => ({
  start: () => dispatch(startLogIn()),
  finish: () => dispatch(loggedIn()),
  error: () => dispatch(loginError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
