import React from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { PropTypes } from 'prop-types';

import { IconButton, Button } from '../components';
import IMAGES from '../common/images';
import COLORS from '../common/colors';
import { commonStyle as cs, askQuestionPageStyle as s } from '../common/styles';

export default class AskQuestionPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const { navigation } = props;
    const { params = {} } = navigation.state;
    const { category = null } = params;
    this.state = {
      category,
      question: '',
    };
  }

  onInputChange = (question) => {
    if (question.length <= 200) {
      this.setState({ question });
    }
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    const { category, question } = this.state;
    return (
      <View style={[cs.container, s.container]}>
        <View style={cs.header}>
          <Image
            source={IMAGES.HEADER_BG}
            style={cs.headerImage}
          />
          <Text style={cs.headerText}> Ask the Forum ({category.name}) </Text>
        </View>
        <View style={s.hintView}>
          <Text
            style={s.hintText}
          >
            Have you tried asking Chatbot? It may be able to answer back faster!
          </Text>
        </View>
        <View
          style={s.questionContainer}
        >
          <View
            style={s.topLine}
          >
            <Text style={s.label}>Your Question:</Text>
            <IconButton
              style={{ margin: 0 }}
              imageStyle={{ height: 12, width: 12 }}
              source={IMAGES.CLOSE}
              onPress={this.goBack}
            />
          </View>
          <View
            style={s.textInputContainer}
          >
            <TextInput
              style={s.textInput}
              multiline
              underlineColorAndroid={COLORS.TRANSPARENT}
              onChangeText={this.onInputChange}
              value={question}
              autoFocus
            />
            <Text style={s.countLine}> {question.length}/200</Text>
          </View>
          <Button
            style={s.askButton}
            textStyle={s.askButtonText}
            text="Post to Forum"
          />
        </View>
      </View>
    );
  }
}
