import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { commonStyle as cs, loginPageStyle as s, font } from '../common/styles';
import { Button, Input, IconButton } from '../components';
import IMAGES from '../common/images';
import { loginAPI, userAPI, categoriesAPI, connectToChannel, connectToSendbird, changePasswordAPI } from '../common/api';
import COLORS, { alpha } from '../common/colors';
import {
  startLogIn,
  loginError,
  setAuthToken,
  loggedIn,
  setLoggedInUser,
  setCategories,
  applyFilters,
  setChannel,
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

class ForgotPasswordPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    start: PropTypes.func.isRequired,
    finish: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    loggingIn: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props); this.inputs = {};
    const { navigation } = props;
    const { params = {} } = navigation.state;
    const { username = '' } = params;
    this.state = {
      values: {
        username,
        token: '',
        password: '',
        confirmPassword: '',
      },
      errors: {
        token: '',
        password: '',
        confirmPassword: '',
        overall: '',
      },
      loading: false,
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
    const { start } = this.props;
    start();
    this.setState({
      errors: {
        password: '',
        overall: '',
      },
    }, this.validate);
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  validate = () => {
    const { error } = this.props;
    const {
      password,
      token,
      confirmPassword,
    } = this.state.values;
    const errors = {
      password: password ? '' : 'Password is required',
      token: token ? '' : 'Activation token is required',
      confirmPassword: confirmPassword ? '' : 'Please re-type password',
    };
    if (password.length < 10) {
      errors.password = 'Should be atleast 10 characters';
    }
    if (password && confirmPassword && confirmPassword !== password) {
      errors.confirmPassword = 'Passwords should match';
    }

    this.setState({
      errors,
    }, () => {
      if (Object.values(errors).every(value => value === '')) { this.login(); } else { error(); }
    });
  }

  addInput = fieldName => (input) => {
    this.inputs[fieldName] = input;
  }


  login = async () => {
    const { password, username, token } = this.state.values;
    const {
      finish,
      error,
      setToken,
      setUser,
      setRelevantCategories,
      setBotChannel } = this.props;
    const response = await changePasswordAPI(username, password, token);
    if (response.success === false) {
      this.setState({
        errors: {
          ...this.state.errors,
          overall: 'Invalid token \n or \n Provided same Password as existing',
        },
      });
      error();
    } else {
      const loginResponse = await loginAPI(username, password);
      const { authToken } = loginResponse;
      const user = await userAPI(authToken);
      setToken(authToken);
      setUser(user);
      const categories = await categoriesAPI(authToken);
      setRelevantCategories(categories);
      await connectToSendbird(user.sendbird_id);
      const channel = await connectToChannel(user.channel_url);
      setBotChannel(channel);
      finish();
      this.props.navigation.dispatch(
        {
          type: 'Navigation/NAVIGATE',
          routeName: 'AppPage',
          action: {
            type: 'Navigation/NAVIGATE',
            routeName: 'ChatPage',
          },
        },
      );
    }
  }

  render() {
    const {
      password,
      confirmPassword,
      token,
    } = this.state.values;
    const { errors } = this.state;
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
          <Text style={s.mainText}>Change Password</Text>
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Activation Token',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.token}
            value={token}
            ref={this.addInput('token')}
            onChange={this.onValueChange('token')}
            onSubmit={this.onSubmit('password')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'New Password',
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
              placeholder: 'Re-type password',
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
          }}
          >{errors.overall}</Text> : null}
          <Button
            text="Get Started"
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
  setToken: authToken => dispatch(setAuthToken(authToken)),
  start: () => dispatch(startLogIn()),
  finish: () => dispatch(loggedIn()),
  error: () => dispatch(loginError()),
  setUser: user => dispatch(setLoggedInUser(user)),
  setRelevantCategories: (categories) => {
    dispatch(setCategories(categories.slice(0)));
    dispatch(applyFilters(categories.slice(0)));
  },
  setBotChannel: channel => dispatch(setChannel(channel)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
