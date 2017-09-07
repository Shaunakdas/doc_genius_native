import React from 'react';
import { Text, View, ScrollView, Image, TextInput, Keyboard } from 'react-native';
import { commonStyle as cs, chatPageStyle as s, fullHeight } from '../common/styles';
import { Button, IconButton } from '../components';
import IMAGES from '../common/images';
import COLORS from '../common/colors';

export default class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [],
      inputHeight: 80,
      keyboardHeight: 0,
    };
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyBoardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyBoardDidHide);
  }

  onInputHeightChange = (event) => {
    const inputHeight = event.nativeEvent.contentSize.height;
    this.setState({ inputHeight });
  }

  keyBoardDidShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    this.setState({ keyboardHeight });
  }

  keyBoardDidHide = () => {
    this.setState({ keyboardHeight: 0 });
  }

  componentWillUnMount() {
    this.keyboardDidHideSub.remove();
    this.keyboardDidShowSub.remove();
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
    const { inputHeight, keyboardHeight = 0 } = this.state;
    const availableHeight = fullHeight - inputHeight - keyboardHeight - 160;
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
        <View style={{ height: availableHeight }}>
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
          </ScrollView>
        </View>
        <View>
          <TextInput
            multiline
            placeholder="Hello"
            onContentSizeChange={this.onInputHeightChange}
            underlineColorAndroid={COLORS.TRANSPARENT}
          />
        </View>
      </View>
    );
  }
}
