import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import IMAGES from '../common/images';
import COLORS from '../common/colors';
import { IconButton } from '../components';
import { commonStyle as cs, font } from '../common/styles';
import { setNotifications } from '../store/actions';
import { notificationsAPI, markNotificationsAsReadAPI } from '../common/api';

class NotificationsPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      loadingNotifications: true,
      refreshing: false,
    };
  }

  onRefresh = async () => {
    this.setState({
      refreshing: true,
    });
    await this.fetchNotifications();
    this.setState({
      refreshing: false,
    });
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  gotoQuestionPage = async (notification) => {
    const { navigation, authToken } = this.props;
    if (notification.topic_id) {
      if (!notification.read) {
        await markNotificationsAsReadAPI(authToken, notification.id);
      }
      navigation.navigate('NotificationQuestionPage', { id: notification.topic_id });
    }
  }


  fetchNotifications = async () => {
    const { authToken } = this.props;
    const response = await notificationsAPI(authToken);
    if (response.success !== false) {
      const { notifications, user_list: { field_stream: users } } = response;
      const applicableNotifications =
        notifications.filter(({ notification_type }) =>
          [5, 9, 13].indexOf(notification_type) !== -1)
          .map((notification) => {
            const {
              id,
              notification_type: type,
              read,
              post_number,
              topic_id,
              created_at,
            } = notification;
            const username = notification.data.original_username;
            const selection = users.filter(item => item.username === username);
            const userFullName = selection.length ? selection[0].name : username;
            return {
              id,
              type,
              read,
              post_number,
              topic_id,
              created_at,
              userFullName,
            };
          });
      const { putNotifications } = this.props;
      putNotifications(applicableNotifications);
    }
    this.setState({ loadingNotifications: false });
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
          {!notification.read ?
            <View
              style={{ backgroundColor: COLORS.PRIMARY,
                height: 5,
                width: 5,
                borderRadius: 5,
                marginRight: 3 }}
            /> : null}
          <View style={{ flex: 1 }}>
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
    const { refreshing } = this.state;
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
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 8 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {notifications.map(this.renderNotification)}
        </ScrollView>
      </View>
    );
  }
}


const mapStateToProps = ({
  profile: { notifications },
  loginState: { authToken },
}) =>
  ({ notifications, authToken });

const mapDispatchToProps = dispatch => ({
  putNotifications: notifications => dispatch(setNotifications(notifications)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPage);
