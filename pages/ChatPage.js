import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { PropTypes } from 'prop-types';

import { commonStyle as cs, chatPageStyle as s, fullWidth } from '../common/styles';
import { Button, Input } from '../components';
import IMAGES from '../common/images';


const chatInputProps = {
  style: {
    paddingLeft: 20,
  },
  autoCorrect: false,
  returnKeyType: 'next',
  maxLength: 30,
  selectionColor: 'black',
  multiline: true,
  flex: 1,
  width: fullWidth - 80,
};

export default class ChatPage extends React.Component {
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
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              alignSelf: 'stretch',
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 12,
              color: '#93b6bf',
              textAlign: 'center',
              backgroundColor: '#b3e1ed',
            }}
          >
           Don't like Cheryl's answer? Ask the Forum!
          </Text>
        </ScrollView>
        <View
          style={
            {
              borderRadius: 25,
              marginHorizontal: 20,
              borderWidth: 1,
              borderColor: '#c6c6cc',
              backgroundColor: '#f9f9f9',
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }
          }
        >
          <Input
            inputProps={chatInputProps}
          />
          <View
            style={{ height: 30, width: 30, borderRadius: 15, marginVertical: 8, backgroundColor: '#ccc', alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              style={{ height: 20, width: 20, resizeMode: 'contain' }}
              source={IMAGES.SEND}
            />
          </View>
        </View>
      </View>
    );
  }
}
