import React from 'react';
import { Text, View, Image } from 'react-native';
import {PropTypes} from 'prop-types';

import { commonStyle as cs, landingPageStyle as s } from '../common/styles'; 
import { Button } from '../components';
import IMAGES from '../common/images';

export default class LandingPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  goTo = (page) => () => {
    const { navigation } = this.props;
    navigation.navigate(page);
  }

  render() {
    return (
      <View style={[cs.container, cs.centerAlign, s.container]}>
        <Text style={s.brandText}>ConnecPath</Text>
        <Image 
          style={s.logo}
          source={IMAGES.LOGO}
        />
        <Text style={s.typeText}>Connecting Students To Their Future</Text>
        <Button 
          text="Sign Up" 
          style={cs.button} 
          textStyle={cs.buttonText}
          onPress={this.goTo('SelectionPage')}
        />
        <Button 
          text="Log In" 
          style={cs.button} 
          textStyle={cs.buttonText}
        />
    </View>
    );
  }
}
