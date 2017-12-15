import React from 'react';
import { Text, ScrollView, Image, View, NativeModules } from 'react-native';
import ToastExample from './ToastExample';
import { PropTypes } from 'prop-types';
import { Button, Grid, Col } from 'native-base';

import { commonStyle as cs, landingPageStyle as s } from '../common/styles';
// import { Button } from '../components';
import IMAGES from '../common/images';
import COLORS from '../common/colors';

export default class LandingPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  goTo = page => () => {
    const { navigation } = this.props;
    // ToastExample.show('Awesome', ToastExample.SHORT);
    navigation.navigate(page);
  }
  tryPrefs = () => {
    const key = 'key';
    NativeModules.ActivityStarter.getPrefsValue(key, (value) => { console.log(value); });
    NativeModules.ActivityStarter.setPrefsValue(key, 'old');
    NativeModules.ActivityStarter.getPrefsValue(key, (value) => { console.log(value); });
  }
  render() {
    return (
      <View style={{ backgroundColor: COLORS.PRIMARY, flex: 1 }}>
        <ScrollView
          style={{ flex: 1, paddingHorizontal: 15 }}
          contentContainerStyle={[cs.container, s.container]}
        >
          <Text style={s.brandText}>Genius</Text>
          <Image
            style={s.logo}
            source={IMAGES.LOGO}
          />
          <Text style={s.typeText}>The Awesome way of learning Maths</Text>
          <Button
            style={{ marginVertical: 8 }}
            onPress={this.goTo('SignupPage')}
            primary block>
            <Text style={{ fontSize: 20, color: '#fffff0' }}>Sign Up</Text>
          </Button>
          <Button
            style={{ marginVertical: 8 }}
            onPress={this.goTo('LoginPage')}
            primary block>
            <Text style={{ fontSize: 20, color: '#fffff0' }}>Login</Text>
          </Button>
          <Button
            style={{ marginVertical: 8 }}
            onPress={this.goTo('GameListPage')}
            primary block>
            <Text style={{ fontSize: 20, color: '#fffff0' }}>Game List</Text>
          </Button>
          <Grid >
            <Col style={{ paddingHorizontal: 10 }}>
              <Button
                style={{ marginVertical: 8 }}
                onPress={this.goTo('GameListPage')}
                primary block>
                <Text style={{ fontSize: 20, color: '#fffff0' }}>Google</Text>
              </Button>
            </Col>
            <Col style={{ paddingHorizontal: 10 }}>
              <Button
                style={{ marginVertical: 8 }}
                onPress={this.goTo('GameListPage')}
                primary block>
                <Text style={{ fontSize: 20, color: '#fffff0' }}>Fb</Text>
              </Button>

            </Col>
          </Grid>
        </ScrollView>
      </View>
    );
  }
}
