import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { NavigationActions } from 'react-navigation';

import { commonStyle as cs, loginPageStyle as s } from '../common/styles'; 
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

export default class LoginPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  constructor(props) {
    super(props);
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }
  
  login = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'AppPage'})
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
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
          <Text style={s.mainText}>Log In</Text>
          <Input 
            inputProps={{
              ...commonInputProps,
              placeholder: 'Username'
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
          <Button 
            text="Get Started" 
            style={[cs.getStartedButton, s.button]} 
            textStyle={[cs.getStartedButtonText]}
            onPress={this.login}
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
