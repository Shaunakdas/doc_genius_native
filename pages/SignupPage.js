import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import {PropTypes} from 'prop-types';

import { commonStyle as cs, signupPageStyle as s } from '../common/styles'; 
import { Button, IconButton, Input } from '../components';
import IMAGES from '../common/images';
import COLORS, { alpha } from '../common/colors';
import { capitalCase } from '../common/helper'

const commonInputProps = {
  style: cs.input,
  autoCorrect: false,
  returnKeyType: 'next',
  placeholderTextColor: alpha(COLORS.WHITE, 0.4),
  selectionColor: COLORS.WHITE,
  maxLength: 30,
};

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
        <ScrollView
          style={cs.scroll}
          contentContainerStyle={cs.scrollContent}
        >
          <Text style={s.mainText}>{capitalCase(user)}'s Sign-Up</Text>
          <Input 
          inputProps={{
            ...commonInputProps,
            placeholder: 'School Code',
          }}
          wrapperStyle={cs.inputWrapper}
          />
          <Input 
            inputProps={{
              ...commonInputProps,
              placeholder: 'First Name',
            }}
            wrapperStyle={cs.inputWrapper}
          />
          <Input 
            inputProps={{
              ...commonInputProps,
              placeholder: 'Last Name',
            }}
            wrapperStyle={cs.inputWrapper}
          />
          <Input 
            inputProps={{
              ...commonInputProps,
              placeholder: 'Email',
              keyboardType: 'email-address',
            }}
            wrapperStyle={cs.inputWrapper}
          />
          <Input 
            inputProps={{
              ...commonInputProps,
              placeholder: 'Username',
            }}
            wrapperStyle={cs.inputWrapper}
          />
          <Input 
            inputProps={{
              ...commonInputProps,
              placeholder: 'Password',
              secureTextEntry: true,
            }}
            wrapperStyle={cs.inputWrapper}
          />
          <Input 
            inputProps={{
              ...commonInputProps,
              placeholder: 'Re-type Password',
              secureTextEntry: true,
            }}
            wrapperStyle={cs.inputWrapper}
          />
          <Button 
              text="Get Started" 
              style={[cs.getStartedButton, s.button]} 
              textStyle={[cs.getStartedButtonText]}
            />
        </ScrollView>
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
