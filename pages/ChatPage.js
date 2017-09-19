import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, ScrollView, Image, TextInput, Keyboard, Platform } from 'react-native';
import { commonStyle as cs, chatPageStyle as s, fullHeight, fullWidth } from '../common/styles';
import { Button, IconButton } from '../components';
import IMAGES from '../common/images';
import COLORS, { alpha } from '../common/colors';
import { getMessages, sendMessageToBot, sendSendbirdMessage } from '../common/api';

const defaultInputHeight = 19.5;

class ChatPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    channel: PropTypes.any.isRequired,
    authToken: PropTypes.string.isRequired,
    channel_url: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      chatHistory: [],
      inputHeight: defaultInputHeight,
      keyboardHeight: 0,
      backedupInputHeight: undefined,
      chatInput: '',
      chatLoading: true,
      waitingForBot: false,
      listQuery: null,
      latestUserChat: '',
    };
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', this.keyBoardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', this.keyBoardDidHide);
  }

  componentDidMount() {
    const listQuery = this.props.channel.createPreviousMessageListQuery();
    this.setState({ listQuery }, this.fetchMessages);
  }

  onInputHeightChange = (event) => {
    let inputHeight = event.nativeEvent.contentSize.height;
    if (Platform.OS === 'ios') {
      const width = event.nativeEvent.contentSize.width;
      if (width > fullWidth - 85) {
        inputHeight = 19.5 * Math.ceil((width) / (fullWidth - 85));
      }
    }
    this.setState({ inputHeight: Math.min(inputHeight, 90) });
  }

  onInputChange = (chatInput) => {
    if (chatInput.length <= 200) { this.setState({ chatInput }); }
  }

  fetchMessages = () => {
    this.setState({ chatLoading: true }, async () => {
      const messages = await getMessages(this.state.listQuery);
      const userMessages = messages.filter(m => m.type === 'user');
      if (messages.length) {
        this.setState({
          chatHistory: [
            ...messages,
            ...this.state.chatHistory,
          ],
          chatLoading: false,
          latestUserChat: userMessages.length ? userMessages[userMessages.length - 1].chat : '',
        });
      } else {
        this.setState({ chatLoading: false });
      }
    });
  }

  moveToCategoryPage = () => {
    const { navigation } = this.props;
    const { latestUserChat } = this.state;
    navigation.navigate('ChatCategorySelectionPage', { latestUserChat });
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

  adjustChatScroll = () => {
    if (this.scrollView) {
      setTimeout(() => this.scrollView.scrollToEnd({ animated: false }), 200);
    }
  }

  sendUserChat = () => {
    let { chatInput } = this.state;
    chatInput = chatInput.trim();
    if (chatInput.length) {
      Keyboard.dismiss();
      this.setState({
        chatHistory: [
          ...this.state.chatHistory,
          {
            type: 'user',
            chat: chatInput,
          },
        ],
        latestUserChat: chatInput,
        chatInput: null,
      }, this.adjustChatScroll);
    }
    this.setState({
      waitingForBot: true,
    }, () => this.sendUserMessage(chatInput));
  }

  sendUserMessage = async (message) => {
    const { channel, channel_url, authToken } = this.props;
    await sendSendbirdMessage(channel, message);
    const response = await sendMessageToBot(message, channel_url, authToken);
    this.setState({ waitingForBot: false }, () => this.addChatBotReply(response));
  }

  addChatBotReply = (botResponse) => {
    if (botResponse) {
      let showButtons = false;
      try {
        const data = JSON.parse(botResponse.data);
        showButtons = (data.result.action === 'input.unknown');
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
      this.setState({
        chatHistory: [
          ...this.state.chatHistory,
          {
            type: 'bot',
            chat: botResponse.message,
            showButtons,
          },
        ],
      }, this.adjustChatScroll());
    }
  }

  botButtonClick = type => () => {
    const { chatHistory } = this.state;
    const lastReply = chatHistory[chatHistory.length - 1];
    const messages = chatHistory.slice(0, chatHistory.length - 1);
    this.setState({
      chatHistory: [
        ...messages,
        { ...lastReply, showButtons: false },
      ],
    });
    if (type === 'YES') {
      this.moveToCategoryPage();
    } else {
      this.adjustChatScroll();
    }
  }

  componentWillUnMount() {
    this.keyboardDidHideSub.remove();
    this.keyboardDidShowSub.remove();
  }

  renderBotChat = (chat, index, showButtons = false) => {
    const { chatHistory } = this.state;
    const totalMessages = chatHistory.length;
    const showIntents = showButtons && (totalMessages === index + 1);
    return (
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
          <Image
            style={s.botBubbleImage}
            source={IMAGES.BOTBUBBLE}
          />
        </View>
        {showIntents ? <View style={s.chatButtonContainer}>
          <Button
            style={s.chatButton}
            textStyle={s.chatButtonText}
            text="YES"
            onPress={this.botButtonClick('YES')}
          />
          <Button
            style={s.chatButton}
            textStyle={s.chatButtonText}
            text="NO"
            onPress={this.botButtonClick('NO')}
          />
        </View> : null}
      </View>
    );
  }


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
      <Image
        style={s.userBubbleImage}
        source={IMAGES.USERBUBBLE}
      />
    </View>
  );

  renderChat = (type, chat, index, showButtons = false) => (
    type === 'bot' ? this.renderBotChat(chat, index, showButtons) : this.renderUserChat(chat)
  );

  render() {
    const { inputHeight, keyboardHeight = 0, chatInput, chatHistory } = this.state;
    const extraHeight = keyboardHeight ? 90 : 150;
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
            onPress={this.moveToCategoryPage}
          />
        </View>
        <View style={{ height: availableHeight }}>
          <ScrollView
            style={[cs.scroll, s.chatScroll, { backgroundColor: alpha(COLORS.PRIMARY, 0.3) }]}
            contentContainerStyle={{ backgroundColor: COLORS.WHITE, minHeight: availableHeight }}
            ref={(scrollView) => { this.scrollView = scrollView; }}
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
                  {this.renderChat(item.type, item.chat, index, item.showButtons)}
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

const mapStateToProps =
   ({
     chat: { channel },
     loginState: { authToken },
     currentUser: { channel_url } }) =>
     ({ channel, authToken, channel_url });

export default connect(mapStateToProps)(ChatPage);
