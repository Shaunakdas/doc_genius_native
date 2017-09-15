import React from 'react';
import { Text, View, Image } from 'react-native';
import { PropTypes } from 'prop-types';

import { commonStyle as cs, selectionPageStyle as s } from '../common/styles';
import { Button, IconButton } from '../components';
import IMAGES from '../common/images';
import { STUDENT_ROLE, COUNSELOR_ROLE } from '../common/constants';

export default class SelectionPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  goTo = (page, params) => () => {
    const { navigation } = this.props;
    navigation.navigate(page, params);
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
          text="I'm a Counselor"
          style={[cs.button, s.button]}
          textStyle={cs.buttonText}
          onPress={this.goTo('SignupPage', { role: COUNSELOR_ROLE })}
        />
        <Button
          text="I'm a Student"
          style={[cs.button, s.button]}
          textStyle={cs.buttonText}
          onPress={this.goTo('SignupPage', { user: STUDENT_ROLE })}
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
