import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Keyboard,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { WebBrowser } from 'expo';

import { commonStyle as cs, chatPageStyle as s, fullHeight, fullWidth } from '../common/styles';
import { Button, IconButton, HighlightText } from '../components';
import IMAGES from '../common/images';
import COLORS, { alpha } from '../common/colors';
import { setMessages, addMessages, setListQuery, setChatSession, prependMessages } from '../store/actions';
import { getMessages, sendMessageToBot, sendSendbirdMessage, startRecievingMessages } from '../common/api';

const defaultInputHeight = 19.5;

class ChatPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    channel: PropTypes.any,
    authToken: PropTypes.string.isRequired,
    channel_url: PropTypes.string,
    currentUser: PropTypes.any.isRequired,
    addChat: PropTypes.func.isRequired,
    setChatHistory: PropTypes.func.isRequired,
    setSession: PropTypes.func.isRequired,
    chatHistory: PropTypes.array.isRequired,
    setQuery: PropTypes.func.isRequired,
    listQuery: PropTypes.any,
    sessionId: PropTypes.string,
  }

  static defaultProps = {
    sessionId: null,
    channel: null,
    channel_url: null,
    listQuery: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      inputHeight: defaultInputHeight,
      keyboardHeight: 0,
      backedupInputHeight: undefined,
      chatInput: '',
      chatLoading: true,
      waitingForBot: false,
      latestUserChat: '',
      refreshing: false,
    };
  }

  componentWillMount() {
    this.keyboardDidShowSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', this.keyBoardDidShow);
    this.keyboardDidHideSub = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', this.keyBoardDidHide);
  }

  componentDidMount() {
    if (this.props.channel) {
      let listQuery = this.props.listQuery;
      if (!this.props.listQuery) {
        listQuery = this.props.channel.createPreviousMessageListQuery();
        this.props.setQuery(listQuery);
      }
      startRecievingMessages(this.onMessageReceived);
      this.fetchMessages(listQuery);
    }
  }

  componentWillUnmount() {
    this.keyboardDidHideSub.remove();
    this.keyboardDidShowSub.remove();
  }

  onMessageReceived = (channel, chat) => {
    const { channelUrl, message } = chat;
    const { channel_url, addChat, setSession } = this.props;
    let fulfillmentMessage = message;
    if (channelUrl !== channel_url || chat.data === '') {
      this.adjustChatScroll();
      if (chat.data) {
        try {
          const parsedData = JSON.parse(chat.data);
          setSession(parsedData.sessionId);
          if (parsedData.result.fulfillment.messages.length) {
            fulfillmentMessage = parsedData.result.fulfillment.messages[0].speech;
          }
        } catch (_) {
          console.log(_); // eslint-disable-line no-console
        }
      }
      addChat({ type: 'bot', chat: fulfillmentMessage });
    }
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

  onRefresh = () => {
    const { listQuery } = this.props;
    if (listQuery && listQuery.hasMore) {
      this.setState({ refreshing: true });
      this.fetchPreviousMessages();
    }
  }

  handleOpeningUrl = async (url) => {
    if (url) {
      await WebBrowser.openBrowserAsync(url);
    }
  }

  fetchPreviousMessages = async (listQueryParam) => {
    const listQuery = listQueryParam || this.props.listQuery;
    if (listQuery && listQuery.hasMore) {
      const { prependChats } = this.props;
      const unParsedMessages = await getMessages(listQuery);
      const messages = unParsedMessages.map((originalMessage) => {
        const message = { ...originalMessage };
        try {
          if (message.data) {
            const parsedData = JSON.parse(message.data);
            if (parsedData.result.fulfillment.messages.length) {
              const fulfillmentMessage = parsedData.result.fulfillment.messages[0].speech;
              message.chat = fulfillmentMessage || message.chat;
            }
          }
        } catch (_) {
          console.log(_); // eslint-disable-line no-console
        }
        return message;
      });
      if (messages.length) {
        prependChats(messages);
      }
    }
    this.setState({
      refreshing: false,
    });
  }

  fetchMessages = async (listQuery) => {
    const { chatHistory, setChatHistory, setSession } = this.props;
    this.setState({ chatLoading: true }, async () => {
      const unParsedMessages = await getMessages(listQuery || this.props.listQuery);
      const messages = unParsedMessages.map((originalMessage) => {
        const message = { ...originalMessage };
        try {
          if (message.data) {
            const parsedData = JSON.parse(message.data);
            if (parsedData.result.fulfillment.messages.length) {
              const fulfillmentMessage = parsedData.result.fulfillment.messages[0].speech;
              message.chat = fulfillmentMessage || message.chat;
            }
          }
        } catch (_) {
          console.log(_); // eslint-disable-line no-console
        }
        return message;
      });
      const userMessages = messages.filter(m => m.type === 'user');
      const botMessages = messages.filter(m => m.type === 'bot');
      if (messages.length) {
        if (botMessages.length) {
          const lastBotMessage = botMessages[botMessages.length - 1];
          const data = lastBotMessage.data;
          if (data && data.sessionId) {
            setSession(data.sessionId);
          }
        }
        setChatHistory(messages);
        this.setState({
          chatLoading: false,
          latestUserChat: userMessages.length ? userMessages[userMessages.length - 1].chat : '',
        }, this.adjustChatScroll);
      } else if (chatHistory.length === 0) {
        const { channel_url, authToken, sessionId } = this.props;
        setTimeout(async () => {
          const response = await sendMessageToBot('Who are you?', channel_url, sessionId, authToken);
          this.addChatBotReply(response);
          this.setState({ chatLoading: false });
        }, 500);
      }
    });
  }

  moveToCategoryPage = () => {
    const { navigation } = this.props;
    const { latestUserChat } = this.state;
    navigation.navigate('ChatCategorySelectionPage', { latestUserChat });
  }

  askOnForum = message => () => {
    const { navigation } = this.props;
    navigation.navigate('ChatCategorySelectionPage', { latestUserChat: message });
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
      setTimeout(() => this.scrollView.scrollToEnd({ animated: false }), 500);
    }
  }

  sendUserChat = () => {
    let { chatInput } = this.state;
    const { addChat } = this.props;
    chatInput = chatInput.trim();
    if (chatInput.length) {
      Keyboard.dismiss();
      addChat(
        {
          type: 'user',
          chat: chatInput,
        },
      );
      this.setState({
        latestUserChat: chatInput,
        chatInput: null,
      }, this.adjustChatScroll);
    }
    this.setState({
      waitingForBot: true,
    }, () => this.sendUserMessage(chatInput));
  }

  sendUserMessage = async (message) => {
    const { channel, channel_url, authToken, sessionId } = this.props;
    await sendSendbirdMessage(channel, message);
    const response = await sendMessageToBot(message, channel_url, sessionId, authToken);
    this.setState({ waitingForBot: false }, () => this.addChatBotReply(response));
  }

  addChatBotReply = (message) => {
    const botResponse = { ...message };
    if (botResponse) {
      let showButtons = false;
      const { addChat, setSession } = this.props;
      try {
        let fulfillmentMessage = botResponse.message;
        const data = JSON.parse(botResponse.data);
        if (data && data.sessionId) {
          setSession(data.sessionId);
          botResponse.data = data;
          if (data.result.fulfillment.messages.length) {
            fulfillmentMessage = data.result.fulfillment.messages[0].speech;
          }
        }
        botResponse.message = fulfillmentMessage;
        showButtons = (data.result.action === 'input.unknown');
      } catch (error) {
        console.log(error); // eslint-disable-line no-console
      }
      addChat(
        {
          type: 'bot',
          chat: botResponse.message,
          showButtons,
        },
      );
      this.adjustChatScroll();
    }
  }

  botButtonClick = type => () => {
    const { chatHistory, setChatHistory } = this.props;
    const lastReply = chatHistory[chatHistory.length - 1];
    const messages = chatHistory.slice(0, chatHistory.length - 1);
    setChatHistory([
      ...messages,
      { ...lastReply, showButtons: false },
    ]);
    if (type === 'YES') {
      this.moveToCategoryPage();
    } else {
      this.adjustChatScroll();
    }
  }

  renderBotChat = (chat, index, showButtons = false) => {
    const { chatHistory } = this.props;
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
            <HighlightText
              style={s.chatBotText}
              text={chat}
              onPress={this.handleOpeningUrl}
            />
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
    <TouchableOpacity onPress={this.askOnForum(chat)}>
      <View
        style={s.chatContainer}
      >
        <View style={s.chatUserTextContainer}>
          <Text style={s.chatUserText}>
            {chat}
          </Text>
        </View>
        <Image
          style={[s.chatImage, { borderRadius: 5 }]}
          source={this.props.currentUser.image}
        />
        <Image
          style={s.userBubbleImage}
          source={IMAGES.USERBUBBLE}
        />
      </View>
    </TouchableOpacity>
  );

  renderChat = (type, chat, index, showButtons = false) => (
    type === 'bot' ? this.renderBotChat(chat, index, showButtons) : this.renderUserChat(chat)
  );

  render() {
    const { inputHeight, keyboardHeight = 0, chatInput, refreshing } = this.state;
    const { chatHistory } = this.props;
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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
              />
            }
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
     chat: { channel, messages: chatHistory, listQuery, sessionId },
     loginState: { authToken },
     currentUser }) => ({ channel,
     authToken,
     channel_url: currentUser.channel_url,
     currentUser,
     chatHistory,
     listQuery,
     sessionId,
   });


const mapDispatchToProps = dispatch => ({
  setChatHistory: messages => dispatch(setMessages(messages)),
  addChat: message => dispatch(addMessages([message])),
  prependChats: messages => dispatch(prependMessages(messages)),
  setQuery: listQuery => dispatch(setListQuery(listQuery)),
  setSession: sessionId => dispatch(setChatSession(sessionId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
