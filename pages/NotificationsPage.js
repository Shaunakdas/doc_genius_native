import React from 'react';
import { Text, View, Image } from 'react-native';
import { PropTypes } from 'prop-types';

import IMAGES from '../common/images';
import COLORS from '../common/colors';
import { IconButton } from '../components';
import { commonStyle as cs, font } from '../common/styles';

export default class NotificationsPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      profile: null,
    };
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
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
              <Text style={{ marginLeft: 15, ...font(13), backgroundColor: COLORS.TRANSPARENT }}>
                Aron liked your answer
              </Text>
              <Text style={{
                marginLeft: 15,
                ...font(10),
                marginVertical: 3,
                backgroundColor:
                COLORS.TRANSPARENT }}
              >
                5 hours ago
              </Text>
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
              <Text style={{
                marginLeft: 15,
                ...font(13),
                backgroundColor: COLORS.TRANSPARENT }}
              >
                 Julian liked your answer
              </Text>
              <Text style={{
                marginLeft: 15,
                ...font(10),
                marginVertical: 3,
                backgroundColor: COLORS.TRANSPARENT }}
              >
                  11 hours ago
              </Text>
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
        </View>
      </View>
    );
  }
}
