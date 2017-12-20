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
// import { WebBrowser } from 'expo';

import { commonStyle as cs, chatPageStyle as s, fullHeight, fullWidth } from '../common/styles';
import IMAGES from '../common/images';
import { Button, IconButton, HighlightText } from '../components';

export default class ChatView extends React.Component {
  render() {
    const showButtons = false;
    const showIntents = false;
    const chat = 'Hello, Shaunak. This is a random selection of games that we change everyday to let you practice with me';
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
      </View>
    );
  }
}
