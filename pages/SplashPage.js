import React from 'react';
import { Text, View, Image, ActivityIndicator, Platform } from 'react-native';
import { PropTypes } from 'prop-types';
import { Font } from 'expo';
import { NavigationActions } from 'react-navigation';


import { commonStyle as cs, splashPageStyle as s } from '../common/styles';
import COLORS from '../common/colors';
import IMAGES from '../common/images';

export default class SplashPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'firasans-light': require('../assets/fonts/light.ttf'),
      'firasans-regular': require('../assets/fonts/regular.ttf'),
      'firasans-semibold': require('../assets/fonts/semibold.ttf'),
    });
    this.start();
  }

  start = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LandingPage' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
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
            Please wait while loading assets ...
          </Text>
        </View>
      </View>
    );
  }
}
