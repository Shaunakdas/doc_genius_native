import React from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { IconButton, Button } from '../components';
import IMAGES from '../common/images';
import COLORS from '../common/colors';
import { createQuestionAPI } from '../common/api';
import { commonStyle as cs, askQuestionPageStyle as s, font } from '../common/styles';

class AskQuestionPage extends React.Component {
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
      loading: false,
      error: '',
    };
  }

  onInputChange = (question) => {
    if (question.length <= 200) {
      this.setState({ question, error: '' });
    }
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  moveToForum = () => {
    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'AppPage',
        action: {
          type: 'Navigation/NAVIGATE',
          routeName: 'ForumPage',
        },
      },
    );
  }

  postQuestion = async () => {
    this.setState({
      loading: true,
    }, this.createQuestion);
  }
  createQuestion = async () => {
    const { question, category } = this.state;
    const { authToken } = this.props;
    const response = await createQuestionAPI(authToken, question, category.id);
    if (response.success === false) {
      this.setState({ error: 'Unable to post this question. Try again later', loading: false });
    } else {
      this.setState({ loading: false }, this.moveToForum);
    }
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
            onPress={this.postQuestion}
            isLoading={this.state.loading}
          />
          {this.state.error ? <Text
            style={{
              color: COLORS.RED,
              marginHorizontal: 30,
              marginVertical: 4,
              ...font(12),
              textAlign: 'center',
            }}
          >
            Unable to post this question. Try again later
          </Text> : null}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ loginState: { authToken } }) => ({ authToken });

export default connect(mapStateToProps)(AskQuestionPage);
