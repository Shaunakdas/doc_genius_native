import React from 'react';
import { Text, View, Image } from 'react-native';
import { PropTypes } from 'prop-types';
import { Font } from 'expo';


import { commonStyle as cs, splashPageStyle as s } from '../common/styles';
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
  }

  goTo = page => () => {
    const { navigation } = this.props;
    navigation.navigate(page);
  }

  render() {
    return (
      <View style={[cs.container, s.container]}>
        <Text style={s.brandText}>ConnecPath</Text>
        <Image
          style={s.logo}
          source={IMAGES.LOGO}
        />
      </View>
    );
  }
}
