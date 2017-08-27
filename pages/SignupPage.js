import React from 'react';
import { Text, View, Image } from 'react-native';
import {PropTypes} from 'prop-types';

import { commonStyle as cs, signupPageStyle as s } from '../common/styles'; 
import { Button, IconButton } from '../components';
import IMAGES from '../common/images';
import { capitalCase } from '../common/helper'

export default class SignupPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props);
    const { navigation } = props;
    const { params } = navigation.state;
    const { user } = params;
    this.state = {
      user,
    }
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }
  
  render() {
    const {user} = this.state;
    return (
      <View style={[cs.container, s.container]}>
        <Image 
          style={s.logo}
          source={IMAGES.LOGO}
        />
        <Text style={s.mainText}>{capitalCase(user)}'s Sign-Up</Text>
        <Button 
          text="Get Started" 
          style={[cs.getStartedButton, s.button]} 
          textStyle={[cs.getStartedButtonText]}
        />
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
