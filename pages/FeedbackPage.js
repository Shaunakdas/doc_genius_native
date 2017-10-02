import React from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { IconButton, Button } from '../components';
import IMAGES from '../common/images';
import COLORS from '../common/colors';
import { feedbackAPI } from '../common/api';
import { commonStyle as cs, askQuestionPageStyle as s } from '../common/styles';

class FeedbackPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      loading: false,
    };
  }

  onInputChange = (feedback) => {
    if (feedback.length <= 600) {
      this.setState({ feedback, error: '' });
    }
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  sendFeedback = async () => {
    const { feedback } = this.state;
    const { currentUser } = this.props;
    if (feedback.trim().length) {
      this.setState({ loading: true });
      const response = await feedbackAPI(currentUser.email, feedback);
      if (response.success === false) {
        this.setState({ feedback: '', error: 'Unable to send feedback', loading: false });
      } else {
        this.setState({ feedback: '', error: '', loading: false });
        this.goBack();
      }
    }
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
              style={{ margin: 0, padding: 15 }}
              imageStyle={{ height: 12, width: 12 }}
              source={IMAGES.CLOSE}
              onPress={this.goBack}
            />
          </View>
          <View
            style={s.textInputContainer}
          >
            <TextInput
              style={[s.textInput, { height: 150 }]}
              multiline
              underlineColorAndroid={COLORS.TRANSPARENT}
              onChangeText={this.onInputChange}
              value={feedback}
              autoFocus
            />
          </View>
          <Button
            style={s.askButton}
            textStyle={s.askButtonText}
            text="Send"
            onPress={this.sendFeedback}
            isLoading={this.state.loading}
            loadingColor={COLORS.WHITE}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps)(FeedbackPage);
