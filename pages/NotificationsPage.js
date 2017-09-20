import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import IMAGES from '../common/images';
import COLORS from '../common/colors';
import { IconButton } from '../components';
import { commonStyle as cs, font } from '../common/styles';

class NotificationsPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      loadingNotifications: true,
    };
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  gotoQuestionPage = (notification) => {
    const { navigation } = this.props;
    if (notification.topic_id) {
      navigation.navigate('NotificationQuestionPage', { id: notification.topic_id });
    }
  }

  goToNotification = notification => () => {
    this.gotoQuestionPage(notification);
  }

  renderNotification = (notification) => {
    const actions = {
      5: 'liked your post',
      9: 'replied to your post',
      13: 'created a new question',
    };
    return (
      <TouchableOpacity
        onPress={this.goToNotification(notification)}
        key={notification.id}
      >
        <View
          style={{
            marginVertical: 8,
            borderBottomWidth: 1,
            borderColor: COLORS.SECONDARY,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text style={{ marginLeft: 15, ...font(13) }}>
              {`${notification.userFullName} ${actions[notification.type]}`}
            </Text>
            <Text style={{ marginLeft: 15, ...font(10), marginVertical: 3 }}>
              {moment(notification.created_at).fromNow()}
            </Text>
          </View>
          <Image
            source={IMAGES.GOTO}
            style={{ marginVertical: 5,
              height: 20,
              width: 20,
              resizeMode: 'contain',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { notifications } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
        <View style={cs.header}>
          <Text style={cs.headerText}> Notifications </Text>
          <Image
            source={IMAGES.HEADER_BG}
            style={cs.headerImage}
          />
          <IconButton
            source={IMAGES.BACK}
            onPress={this.goBack}
            style={[cs.backButton, cs.headerBackButton]}
            imageStyle={cs.backImage}
          />
        </View>
        <View style={{ paddingHorizontal: 8 }}>
          {notifications.map(this.renderNotification)}
        </View>
      </View>
    );
  }
}


const mapStateToProps = ({ profile: { notifications } }) =>
  ({ notifications });

export default connect(mapStateToProps)(NotificationsPage);
