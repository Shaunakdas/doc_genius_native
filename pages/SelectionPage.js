import React from 'react';
import { Text, View, Image } from 'react-native';
import {PropTypes} from 'prop-types';

import { commonStyle as cs, selectionPageStyle as s } from '../common/styles'; 
import { Button, IconButton } from '../components';
import IMAGES from '../common/images';

export default class SelectionPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }
  
  render() {
    return (
      <View style={[cs.container, s.container]}>
        <Image 
          style={s.logo}
          source={IMAGES.LOGO}
        />
        <Text style={s.mainText}>Who are you?</Text>
        <Button 
          text="I'm a Counsellor" 
          style={[cs.button, s.button]} 
          textStyle={cs.buttonText}
        />
        <Button 
          text="I'm a Student" 
          style={[cs.button, s.button]} 
          textStyle={cs.buttonText}
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
