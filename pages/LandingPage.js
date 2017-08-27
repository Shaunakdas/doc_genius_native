import React from 'react';
import { Text, View, Image } from 'react-native';
import { commonStyle as cs, landingPageStyle as s } from '../common/styles'; 
import { Button } from '../components';
import IMAGES from '../common/images';

export default class LandingPage extends React.Component {
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
