import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { commonStyle as cs, loginPageStyle as s, font } from '../common/styles';
import { Button, IconButton, Input } from '../components';
import IMAGES from '../common/images';
import { activateAPI, userAPI } from '../common/api';
import COLORS, { alpha } from '../common/colors';
import { startLogIn, loginError, setAuthToken, loggedIn, setLoggedInUser } from '../store/actions';

const commonInputProps = {
  style: cs.input,
  autoCorrect: false,
  returnKeyType: 'next',
  placeholderTextColor: alpha(COLORS.WHITE, 0.4),
  selectionColor: COLORS.WHITE,
  maxLength: 30,
  autoCapitalize: 'none',
};

class VerifyPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    loggingIn: PropTypes.bool.isRequired,
    start: PropTypes.func.isRequired,
    finish: PropTypes.func.isRequired,
    error: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props); this.inputs = {};
    this.state = {
      values: {
        password: '',
      },
      errors: {
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
    } = this.state.values;
    const errors = {
      password: password ? '' : 'Activation token is required',
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
    const { password } = this.state.values;
    const { finish, error, setToken, setUser, username } = this.props;
    const response = await activateAPI(username, password);
    if (response.success === false) {
      this.setState({
        errors: {
          ...this.state.errors,
          overall: 'Invalid token',
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
          <Text style={s.mainText}>Verify Email</Text>
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Activation Token',
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

const mapStateToProps = ({ loginState, currentUser }) => {
  const { loggingIn } = loginState;
  const { username } = currentUser;
  return { loggingIn, username };
};

const mapDispatchToProps = dispatch => ({
  setToken: authToken => dispatch(setAuthToken(authToken)),
  start: () => dispatch(startLogIn()),
  finish: () => dispatch(loggedIn()),
  error: () => dispatch(loginError()),
  setUser: user => dispatch(setLoggedInUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPage);
