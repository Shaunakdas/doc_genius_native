import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import IMAGES from '../common/images';
import { STUDENT_ROLE, COUNSELOR_ROLE } from '../common/constants';
import COLORS, { alpha } from '../common/colors';
import { commonStyle as cs, profilePageStyle as s, font } from '../common/styles';
import { IconButton, Button } from '../components';

class ProfilePage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    currentUser: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  gotoPage = page => () => {
    const { navigation } = this.props;
    navigation.navigate(page);
  }

  renderAbout() {
    return (
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
          <View style={{
            marginVertical: 8,
            borderBottomWidth: 1,
            borderColor: COLORS.SECONDARY,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
            <Text style={{ marginLeft: 15, ...font(13) }}> Feedback </Text>
            <IconButton
              source={IMAGES.GOTO}
              style={{ marginVertical: 5 }}
              imageStyle={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
              onPress={this.gotoPage('FeedbackPage')}
            />
          </View>
          <View style={{
            marginVertical: 8,
            borderBottomWidth: 1,
            borderColor: COLORS.SECONDARY,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
            <Text style={{ marginLeft: 15, ...font(13) }}> Terms & Conditions </Text>
            <IconButton
              source={IMAGES.GOTO}
              style={{ marginVertical: 5 }}
              imageStyle={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
              onPress={this.gotoPage('TermsPage')}
            />
          </View>
          <View style={{
            marginVertical: 8,
            borderBottomWidth: 1,
            borderColor: COLORS.SECONDARY,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
            <Text style={{ marginLeft: 15, ...font(13) }}> PrivacyPolicy </Text>
            <IconButton
              source={IMAGES.GOTO}
              style={{ marginVertical: 5 }}
              imageStyle={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
              onPress={this.gotoPage('PrivacyPage')}
            />
          </View>
        </View>
      </View>
    );
  }

  renderNotifications() {
    return (
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
          <View style={{
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
                Greg commentend on your question
              </Text>
              <Text style={{ marginLeft: 15, ...font(10), marginVertical: 3 }}> 2 hours ago </Text>
            </View>
            <IconButton
              source={IMAGES.GOTO}
              style={{ marginVertical: 5 }}
              imageStyle={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{
            marginVertical: 8,
            borderBottomWidth: 1,
            borderColor: COLORS.SECONDARY,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
            <View>
              <Text style={{ marginLeft: 15, ...font(13) }}> Aron liked your answer </Text>
              <Text style={{ marginLeft: 15, ...font(10), marginVertical: 3 }}> 5 hours ago </Text>
            </View>
            <IconButton
              source={IMAGES.GOTO}
              style={{ marginVertical: 5 }}
              imageStyle={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
              }}
            />
          </View>
          <Button
            text="See More ..."
            textStyle={{ ...font(12), color: COLORS.SECONDARY }}
            style={{ paddingVertical: 8, paddingLeft: 20 }}
            onPress={this.gotoPage('NotificationsPage')}
          />
        </View>
      </View>
    );
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
              source={IMAGES.POST_BY}
              style={{
                height: 30,
                width: 30,
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
                (12 - (currentUser.graduation_year - 2017))
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

const mapStateToProps = ({ currentUser }) => ({ currentUser });
export default connect(mapStateToProps)(ProfilePage);
