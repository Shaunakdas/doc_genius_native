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
    }));
    this.start();
  }

  setMessage = loadingMessage => this.setState({ loadingMessage });

  cacheImages = images => images.map(image => Asset.fromModule(image).downloadAsync())

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return null;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    return token;
  }

  start = async () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LandingPage' }),
      ],
    });
    const isLoginSuccess = await this.tryLogin();
    if (!isLoginSuccess) { this.props.navigation.dispatch(resetAction); }
  }

  tryLogin = async () => {
    const { finish, setToken, setUser, setRelevantCategories, setBotChannel } = this.props;
    const authToken = await getData('AUTH_TOKEN');
    try {
      if (authToken) {
        this.setMessage('Loading Profile...');
        const user = await userAPI(authToken);
        setToken(authToken);
        setUser(user);
        this.setMessage('Loading Forum...');
        const categories = await categoriesAPI(authToken);
        setRelevantCategories(categories);
        if (user.role === STUDENT_ROLE) {
          this.setMessage('Loading Chat...');
          await connectToSendbird(user.sendbird_id);
          const channel = await connectToChannel(user.channel_url);
          setBotChannel(channel);
        }
        this.setMessage('Loading Notifications...');
        const device_token = await this.registerForPushNotificationsAsync();
        if (device_token) {
          await updateDeviceTokenAPI(authToken, device_token);
        }
        finish();
        const launchedUsers = (await getData('LAUNCHED_USERS')) || [];
        const onLaunch = launchedUsers.indexOf(user.id) === -1;
        if (onLaunch) {
          await saveData('LAUNCHED_USERS', launchedUsers.concat(user.id));
        }
        if (user.role === STUDENT_ROLE) {
          this.props.navigation.dispatch(
            {
              type: 'Navigation/NAVIGATE',
              routeName: 'AppPage',
              params: { onLaunch, role: user.role },
              action: {
                type: 'Navigation/NAVIGATE',
                routeName: 'ChatPage',
              },
            },
          );
        } else {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'AppPage' }),
            ],
            params: { onLaunch, role: user.role },
          });
          this.props.navigation.dispatch(resetAction);
        }
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
