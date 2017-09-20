import React from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import IMAGES from '../common/images';
import { removeData } from '../common/helper';
import { STUDENT_ROLE, COUNSELOR_ROLE } from '../common/constants';
import COLORS, { alpha } from '../common/colors';
import { commonStyle as cs, profilePageStyle as s, font } from '../common/styles';
import { IconButton, Button } from '../components';
import { setNotifications, setLoggedInUser } from '../store/actions';
import { notificationsAPI, userAPI } from '../common/api';

class ProfilePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    currentUser: PropTypes.any.isRequired,
    notifications: PropTypes.array.isRequired,
    profileNumber: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      loadingNotifications: true,
    };
  }

  async componentDidMount() {
    await this.fetchNotifications();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.profileNumber !== this.props.profileNumber) {
      const { authToken, setUser } = this.props;
      const user = await userAPI(authToken);
      if (user.success !== false) { setUser(user); }
      await this.fetchNotifications();
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
            const userFullName = users.filter(item => item.username === username)[0].name;
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

  gotoPage = page => () => {
    const { navigation } = this.props;
    navigation.navigate(page);
  }

  gotoQuestionPage = (notification) => {
    const { navigation } = this.props;
    if (notification.topic_id) {
      navigation.navigate('NotificationQuestionPage', { id: notification.topic_id });
    }
  }

  logout = async () => {
    await removeData('AUTH_TOKEN');
    this.props.navigation.dispatch(
      {
        type: 'Navigation/NAVIGATE',
        routeName: 'LandingPage',
      },
    );
  }

  goToNotification = notification => () => {
    this.gotoQuestionPage(notification);
  }

  renderPageItem = (display, page) => (
    <TouchableOpacity
      onPress={this.gotoPage(page)}
      key={page}
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
        <Text style={{ marginLeft: 15, ...font(13) }}> {display} </Text>
        <Image
          source={IMAGES.GOTO}
          style={{
            marginVertical: 5,
            height: 20,
            width: 20,
            resizeMode: 'contain',
          }}
        />
      </View>
    </TouchableOpacity>
  )

  renderAbout = () => (
    <View>
      <View style={{
        backgroundColor: alpha(COLORS.PRIMARY, 0.3),
        paddingLeft: 20,
        paddingVertical: 6 }}
      >
        <Text style={{ ...font(14) }}> About this App </Text>
      </View>
      <View
        style={{ marginHorizontal: 8 }}
      >
        {this.renderPageItem('Feedback', 'FeedbackPage')}
        {this.renderPageItem('Terms & Conditions', 'TermsPage')}
        {this.renderPageItem('Privacy Policy', 'PrivacyPage')}
        <TouchableOpacity
          onPress={this.logout}
        >
          <View style={{
            marginVertical: 8,
            borderBottomWidth: 1,
            borderColor: COLORS.SECONDARY,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
            <Text style={{ marginLeft: 15, ...font(13) }}> Logout </Text>
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
      </View>
    </View>
  )

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

  renderNotifications = () => {
    const { notifications } = this.props;
    const { loadingNotifications } = this.state;
    return notifications.length && !loadingNotifications ? (
      <View>
        <View style={{
          backgroundColor: alpha(COLORS.PRIMARY, 0.3),
          paddingLeft: 20,
          paddingVertical: 6 }}
        >
          <Text style={{ ...font(14) }}> Notifications </Text>
        </View>
        <View
          style={{ marginHorizontal: 8 }}
        >
          {notifications.slice(0, 3).map(this.renderNotification)}
          <Button
            text="See More ..."
            textStyle={{ ...font(12), color: COLORS.SECONDARY }}
            style={{ paddingVertical: 8, paddingLeft: 20 }}
            onPress={this.gotoPage('NotificationsPage')}
          />
        </View>
      </View>
    ) : null;
  }

  render() {
    const { currentUser } = this.props;
    return (
      <View style={s.container}>
        <View style={cs.header}>
          <Text style={cs.headerText}> Profile </Text>
          <Image
            source={IMAGES.PROFILE_BG}
            style={s.headerImage}
          />
          <View style={{
            elevation: 2,
            shadowColor: COLORS.BLACK,
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            backgroundColor: COLORS.WHITE,
            height: 55,
            width: 55,
            borderRadius: 28,
            marginVertical: 8,
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <Image
              source={currentUser.image}
              style={{
                height: 55,
                width: 55,
                borderRadius: 27,
                resizeMode: 'contain',
              }}
            />
          </View>
          <Text
            style={{
              ...font(14),
              color: COLORS.WHITE,
              textAlign: 'center',
              marginVertical: 3,
              backgroundColor: COLORS.TRANSPARENT,
            }}
          >
            {currentUser.name}
          </Text>
          <Text
            style={{
              ...font(14),
              color: COLORS.WHITE,
              textAlign: 'center',
              marginVertical: 3,
              backgroundColor: COLORS.TRANSPARENT,
            }}
          >
            {
              currentUser.role === STUDENT_ROLE ?
                `${(12 - (currentUser.graduation_year - 2017))}th Grade`
                : COUNSELOR_ROLE
            }
          </Text>
          <Text
            style={{
              ...font(14),
              color: COLORS.WHITE,
              textAlign: 'center',
              marginVertical: 3,
              backgroundColor: COLORS.TRANSPARENT,
            }}
          >
            Indiez
          </Text>
        </View>
        <ScrollView
          style={{
            backgroundColor: COLORS.WHITE,
            flex: 1,
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: COLORS.SECONDARY,
              flexDirection: 'row',
            }}
          >
            {currentUser.role === STUDENT_ROLE ?
              (<View style={{ flex: 1, borderRightWidth: 1, borderColor: COLORS.SECONDARY }}>
                <Text style={{
                  ...font(10),
                  textAlign: 'center',
                }}
                >Answers By Bot</Text>
                <Text style={{
                  ...font(16),
                  textAlign: 'center',
                  marginVertical: 12,
                }}
                >
                  {currentUser.answers_by_bot || 0}
                </Text>
              </View>) : null}
            <View style={{ flex: 1, borderRightWidth: 1, borderColor: COLORS.SECONDARY }}>
              <Text style={{
                ...font(10),
                textAlign: 'center',
              }}
              >Answers By Forum</Text>
              <Text style={{
                ...font(16),
                textAlign: 'center',
                marginVertical: 12,
              }}
              >
                {currentUser.answers_by_forum || 0}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{
                ...font(10),
                textAlign: 'center',
              }}
              >You posted to Forum</Text>
              <Text style={{
                ...font(16),
                textAlign: 'center',
                marginVertical: 12,
              }}
              >
                {currentUser.you_posted_to_forum || 0}
              </Text>
            </View>
          </View>
          {this.renderNotifications()}
          {this.renderAbout()}
        </ScrollView>
        <IconButton
          source={IMAGES.SETTINGS}
          style={{
            padding: 5,
            position: 'absolute',
            top: 30,
            right: 15,
            elevation: 2,
          }}
          imageStyle={{
            height: 20,
            width: 20,
            resizeMode: 'contain',
          }}
          onPress={this.gotoPage('ProfileEditPage')}
        />
      </View>
    );
  }
}

const mapStateToProps = ({
  currentUser,
  profile: { notifications },
  loginState: { authToken },
  appState: { profileNumber },
}) =>
  ({ currentUser, notifications, authToken, profileNumber });

const mapDispatchToProps = dispatch => ({
  putNotifications: notifications => dispatch(setNotifications(notifications)),
  setUser: user => dispatch(setLoggedInUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
