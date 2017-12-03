import React from 'react';
import { Text, ScrollView, Image, View, NativeModules } from 'react-native';
import ToastExample from './ToastExample';
import { PropTypes } from 'prop-types';

import { commonStyle as cs, landingPageStyle as s } from '../common/styles';
import { Button } from '../components';
import IMAGES from '../common/images';
import COLORS from '../common/colors';

export default class LandingPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  goTo = page => () => {
    const { navigation } = this.props;
    ToastExample.show('Awesome', ToastExample.SHORT);
    navigation.navigate(page);
  }

  render() {
    return (
      <View style={{ backgroundColor: COLORS.PRIMARY, flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[cs.container, s.container]}
        >
          <Text style={s.brandText}>Genius</Text>
          <Image
            style={s.logo}
            source={IMAGES.LOGO}
          />
          <Text style={s.typeText}>The Awesome way of learning Maths</Text>
          <Button
            text="Sign Up"
            style={cs.button}
            textStyle={cs.buttonText}
            onPress={this.goTo('SignupPage')}
          />
          <Button
            text="Log In"
            style={cs.button}
            textStyle={cs.buttonText}
            onPress={this.goTo('LoginPage')}
          />
          <Button
            text="Games List"
            style={cs.button}
            textStyle={cs.buttonText}
            onPress={this.goTo('GameListPage')}
          />

        <Button
          text="Unity"
          style={[cs.button, s.button]}
          textStyle={cs.buttonText}
          onPress={() => NativeModules.ActivityStarter.getActivityName((name) => { console.log(name); })}
        />
        </ScrollView>
      </View>
    );
  }
}
