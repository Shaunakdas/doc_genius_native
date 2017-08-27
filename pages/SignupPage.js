import React from 'react';
import { Text, View, Image } from 'react-native';
import { commonStyle as cs, signupPageStyle as s } from '../common/styles'; 
import { Button } from '../components';
import IMAGES from '../common/images';

export default class SignUpPage extends React.Component {
  render() {
    return (
      <View style={[cs.container, cs.centerAlign, s.container]}>
        <Text style={s.brandText}>ConnecPath</Text>
      </View>
    );
  }
}
