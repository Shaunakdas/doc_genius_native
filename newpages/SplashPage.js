import React from 'react';
import { Text, View, Image, ActivityIndicator, Platform } from 'react-native';
import { PropTypes } from 'prop-types';
import { Font, Notifications, Permissions, Asset } from 'expo';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { commonStyle as cs, splashPageStyle as s } from '../common/styles';
import COLORS from '../common/colors';
import IMAGES from '../common/images';
import { getData, removeData, saveData } from '../common/helper';
import { STUDENT_ROLE } from '../common/constants';
import {
  userAPI,
  categoriesAPI,
  connectToChannel,
  connectToSendbird,
  updateDeviceTokenAPI,
} from '../common/api';
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

class SplashPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      loadingMessage: 'Please wait while loading assets ...',
    };
  }

  async componentDidMount() {
    const imageAssets = this.cacheImages(Object.values(IMAGES));
    await Promise.all(...imageAssets, Font.loadAsync({
      'firasans-light': require('../assets/fonts/light.ttf'),
      'firasans-regular': require('../assets/fonts/regular.ttf'),
      'firasans-semibold': require('../assets/fonts/semibold.ttf'),
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    }));
    this.start();
  }

  setMessage = loadingMessage => this.setState({ loadingMessage });

  cacheImages = images => images.map(image => Asset.fromModule(image).downloadAsync())

  start = async () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LandingPage' }),
      ],
    });
    const isLoginSuccess = false;
    // const isLoginSuccess = await this.tryLogin();
    if (!isLoginSuccess) { this.props.navigation.dispatch(resetAction); }
  }

  tryLogin = async () => {
    // const { finish, setToken, setUser, setRelevantCategories, setBotChannel } = this.props;
    const authToken = await getData('AUTH_TOKEN');
    try {
      if (authToken) {
        this.setMessage('Loading Profile...');
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'GameListPage' }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
        return true;
      }
      await removeData('AUTH_TOKEN');
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
    return false;
  }

  render() {
    return (
      <View style={[cs.container, s.container]}>
        <Text style={s.brandText}>ConnecPath</Text>
        <Image
          style={s.logo}
          source={IMAGES.LOGO}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size={Platform.OS === 'ios' ? 1 : 20} color={COLORS.WHITE} />
          <Text
            style={{
              fontSize: 14,
              marginLeft: 20,
              color: COLORS.WHITE,
            }}
          >
            {this.state.loadingMessage}
          </Text>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setToken: authToken => dispatch(setAuthToken(authToken)),
  start: () => dispatch(startLogIn()),
  finish: () => dispatch(loggedIn()),
  error: () => dispatch(loginError()),
  setUser: user => dispatch(setLoggedInUser(user)),
  setRelevantCategories: (categories = []) => {
    dispatch(setCategories(categories.slice(0)));
    dispatch(applyFilters(categories.slice(0)));
  },
  setBotChannel: channel => dispatch(setChannel(channel)),
});

export default connect(null, mapDispatchToProps)(SplashPage);
