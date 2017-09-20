import React from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { PropTypes } from 'prop-types';

import { IconButton, Button } from '../components';
import IMAGES from '../common/images';
import COLORS from '../common/colors';
import { commonStyle as cs, askQuestionPageStyle as s } from '../common/styles';

class FeedbackPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
    };
  }

  onInputChange = (feedback) => {
    if (feedback.length <= 200) {
      this.setState({ feedback, error: '' });
    }
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }


  render() {
    const { feedback } = this.state;
    return (
      <View style={[cs.container, s.container]}>
        <View style={cs.header}>
          <Image
            source={IMAGES.HEADER_BG}
            style={cs.headerImage}
          />
          <Text style={cs.headerText}> Feedback </Text>
        </View>
        <View
          style={s.questionContainer}
        >
          <View
            style={s.topLine}
          >
            <Text style={s.label}>We value your voice!</Text>
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
              value={feedback}
              autoFocus
            />
            <Text style={s.countLine}> {feedback.length}/200</Text>
          </View>
          <Button
            style={s.askButton}
            textStyle={s.askButtonText}
            text="Send"
            onPress={this.goBack}
          />
        </View>
      </View>
    );
  }
}


export default FeedbackPage;
