import React from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import moment from 'moment';

import IMAGES from '../common/images';
import { removeData } from '../common/helper';
// import { STUDENT_ROLE, COUNSELOR_ROLE } from '../common/constants';
import COLORS, { alpha } from '../common/colors';
import { commonStyle as cs, profilePageStyle as s, font } from '../common/styles';
import { IconButton } from '../components';
import { setLoggedInUser, markNotificationRead, resetChat } from '../store/actions';
import { userAPI } from '../common/api';

class ProfilePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    currentUser: PropTypes.any.isRequired,
    profileNumber: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  // async componentDidMount() {
  //   await this.fetchNotifications();
  // }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.profileNumber !== this.props.profileNumber) {
      const { authToken, setUser } = this.props;
      const user = await userAPI(authToken);
      if (user.success !== false) { setUser(user); }
      // await this.fetchNotifications();
    }
  }

  gotoPage = page => () => {
    const { navigation } = this.props;
    navigation.navigate(page);
  }

  logout = async () => {
    const { reset } = this.props;
    await removeData('AUTH_TOKEN');
    reset();
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
            {currentUser.firstName}
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
            {currentUser.lastName}
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
            {currentUser.sex}
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
            {currentUser.dateOfBirth}
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
            {currentUser.mobile_number}
          </Text>
        </View>
        <ScrollView
          style={{
            backgroundColor: COLORS.WHITE,
            flex: 1,
          }}
        >
          {this.renderAbout()}
        </ScrollView>
        <IconButton
          source={IMAGES.SETTINGS}
          style={{
            padding: 15,
            position: 'absolute',
            top: 20,
            right: 5,
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
  loginState: { authToken },
  appState: { profileNumber },
}) =>
  ({ currentUser, authToken, profileNumber });

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setLoggedInUser(user)),
  markRead: notification => dispatch(markNotificationRead(notification)),
  reset: () => dispatch(resetChat()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
