import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { commonStyle as cs, chatPageStyle as s } from '../common/styles';
import { Button } from '../components';
import IMAGES from '../common/images';

export default class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [],
    };
  }

  render() {
    return (
      <View style={cs.container}>
        <View style={[cs.header, s.header]}>
          <Text style={[cs.headerText, s.headerText]}> Ask me Anything!</Text>
          <Button
            style={s.postButton}
            textStyle={s.postButtonText}
            text="POST"
          />
        </View>
        <ScrollView
          style={cs.scroll}
        >
          <View style={s.hintView}>
            <Text
              style={s.hintText}
            >
           Don't like Cheryl's answer? Ask the Forum!
            </Text>
            <Image
              source={IMAGES.UP_ARROW}
              style={s.upArrowImage}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
