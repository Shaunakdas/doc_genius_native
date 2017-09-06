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

  renderBotChat = (chat, showButtons = false) => (
    <View>
      <View
        style={[s.chatContainer, { marginBottom: showButtons ? 0 : 15 }]}
      >
        <Image
          style={s.chatImage}
          source={IMAGES.BOT_USER}
        />
        <View style={s.chatBotTextContainer}>
          <Text style={s.chatBotText}>
            {chat}
          </Text>
        </View>
      </View>
      {showButtons ? <View style={s.chatButtonContainer}>
        <Button
          style={s.chatButton}
          textStyle={s.chatButtonText}
          text="YES"
        />
        <Button
          style={s.chatButton}
          textStyle={s.chatButtonText}
          text="NO"
        />
      </View> : null}
    </View>
  );


  renderUserChat = chat => (
    <View
      style={s.chatContainer}
    >
      <View style={s.chatUserTextContainer}>
        <Text style={s.chatUserText}>
          {chat}
        </Text>
      </View>
      <Image
        style={s.chatImage}
        source={IMAGES.NORMAL_USER}
      />
    </View>
  );

  renderChat = (type, chat, showButtons = false) => (
    type === 'bot' ? this.renderBotChat(chat, showButtons) : this.renderUserChat(chat)
  );

  render() {
    return (
      <View style={cs.container}>
        <View style={[cs.header, s.header]}>
          <Image
            source={IMAGES.HEADER_BG}
            style={cs.headerImage}
          />
          <Text style={[cs.headerText, s.headerText]}> Ask me Anything!</Text>
          <Button
            style={s.postButton}
            textStyle={s.postButtonText}
            text="POST"
          />
        </View>
        <ScrollView
          style={[cs.scroll, s.chatScroll]}
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
          {this.renderChat('bot', 'Some very long text, so long losdsad dsa da dsakjdlshld SHDL FHGHSJDGSJKHDG KSADSAJDGSJAKDGHAK', true)}
          {this.renderChat('user', 'Some very long text, so long losdsad dsa da dsakjdlshld SHDL FHGHSJDGSJKHDG KSADSAJDGSJAKDGHAK')}
        </ScrollView>
      </View>
    );
  }
}
