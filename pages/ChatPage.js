import React from 'react';
import { Text, View, ScrollView, Image, TextInput, Keyboard } from 'react-native';
import { commonStyle as cs, chatPageStyle as s, fullHeight } from '../common/styles';
import { Button, IconButton } from '../components';
import IMAGES from '../common/images';
import COLORS from '../common/colors';

const defaultInputHeight = 25;

export default class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [],
      inputHeight: defaultInputHeight,
      keyboardHeight: 0,
      backedupInputHeight: undefined,
      chatInput: '',
    };
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.keyBoardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.keyBoardDidHide);
  }

  onInputHeightChange = (event) => {
    const inputHeight = event.nativeEvent.contentSize.height;
    this.setState({ inputHeight: Math.min(inputHeight, 90) });
  }

  onInputChange = (chatInput) => {
    this.setState({ chatInput });
  }

  keyBoardDidShow = (event) => {
    const keyboardHeight = event.endCoordinates.height;
    const { backedupInputHeight } = this.state;
    this.setState({ keyboardHeight, inputHeight: backedupInputHeight || defaultInputHeight });
  }

  keyBoardDidHide = () => {
    const { inputHeight } = this.state;
    this.setState({
      keyboardHeight: 0,
      backedupInputHeight: inputHeight,
      inputHeight: defaultInputHeight,
    });
  }

  generateRandomBotResponse = () => {
    const autoReply = 'I can’t answer it. Would you like to post your question to the forum?';
    const randomReply = 'I may know the answer for this';
    const choice = Math.random();
    if (choice < 0.5) {
      const reply = {
        type: 'bot',
        chat: autoReply,
        showButtons: true,
      };
      this.setState({
        chatHistory: [
          ...this.state.chatHistory,
          reply,
        ],
      });
    } else {
      const reply = {
        type: 'bot',
        chat: randomReply,
      };
      this.setState({
        chatHistory: [
          ...this.state.chatHistory,
          reply,
        ],
      });
    }
  }

  sendUserChat = () => {
    let { chatInput } = this.state;
    chatInput = chatInput.trim();
    if (chatInput.length) {
      this.setState({
        chatHistory: [
          ...this.state.chatHistory,
          {
            type: 'user',
            chat: chatInput,
          },
        ],
        chatInput: null,
      }, this.generateRandomBotResponse);
    }
    Keyboard.dismiss();
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
    const { inputHeight, keyboardHeight = 0, chatInput, chatHistory } = this.state;
    const extraHeight = keyboardHeight ? 85 : 150;
    const availableHeight = fullHeight - inputHeight - keyboardHeight - extraHeight;
    return (
      <View style={[cs.container, s.container]}>
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
            {
              chatHistory.map((item, index) => (
                <View key={index}>
                  {this.renderChat(item.type, item.chat, item.showButtons)}
                </View>
              ))
            }
          </ScrollView>
        </View>
        <View
          style={s.chatInputContainer}
        >
          <TextInput
            style={[s.chatInput, { height: inputHeight }]}
            multiline
            onContentSizeChange={this.onInputHeightChange}
            underlineColorAndroid={COLORS.TRANSPARENT}
            value={chatInput}
            onChangeText={this.onInputChange}
          />
          <IconButton
            source={IMAGES.SEND}
            style={s.chatSendButton}
            imageStyle={s.chatSendImage}
            onPress={this.sendUserChat}
          />
        </View>
      </View>
    );
  }
}
