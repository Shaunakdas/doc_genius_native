import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { commonStyle as cs, loginPageStyle as s, font } from '../common/styles';
import { Button, IconButton, Input } from '../components';
import IMAGES from '../common/images';
import { loginAPI, userAPI } from '../common/api';
import COLORS, { alpha } from '../common/colors';
import { startLogIn, loginError, setAuthToken, loggedIn, setLoggedInUser } from '../store/actions';

const commonInputProps = {
  style: cs.input,
  autoCorrect: false,
  returnKeyType: 'next',
  placeholderTextColor: alpha(COLORS.WHITE, 0.4),
  selectionColor: COLORS.WHITE,
  maxLength: 30,
};

class LoginPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    loggingIn: PropTypes.bool.isRequired,
    start: PropTypes.func.isRequired,
    finish: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props); this.inputs = {};
    this.state = {
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
    if (nextFieldName) { this.inputs[nextFieldName].focus(); }
  }

  getStarted = () => {
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

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
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


  login = async () => {
    const { username, password } = this.state.values;
    const { finish, error, setToken, setUser } = this.props;
    const response = await loginAPI(username, password);
    if (response.success === false) {
      this.setState({
        errors: {
          ...this.state.errors,
          overall: response.error,
        },
      });
      error();
    } else {
      const { authToken } = response;
      const user = await userAPI(authToken);
      setToken(authToken);
      setUser(user);
      finish();
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'AppPage' }),
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
          <Text style={s.mainText}>Log In</Text>
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
  setUser: () => dispatch(setLoggedInUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
