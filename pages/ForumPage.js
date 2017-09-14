import React from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import { PropTypes } from 'prop-types';

import IMAGES from '../common/images';
import COLORS, { alpha } from '../common/colors';

import { commonStyle as cs, font } from '../common/styles';
import { IconButton } from '../components';

export default class ForumPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  openDrawer = () => {
    this.props.navigation.navigate('DrawerOpen');
  }

  selectCategory = () => {
    const { navigation } = this.props;
    navigation.navigate('CategorySelectionPage', { fromForum: true });
  }

  render() {
    return (
      <View
        style={[cs.container, { backgroundColor: alpha(COLORS.PRIMARY, 0.3) }]}
      >
        <View style={cs.header}>
          <Image
            source={IMAGES.HEADER_BG}
            style={cs.headerImage}
          />
          <Text style={cs.headerText}> All Posts </Text>
          <IconButton
            source={IMAGES.EDIT}
            style={{
              position: 'absolute',
              right: 50,
              top: 36,
            }}
            imageStyle={{
              height: 22,
              width: 22,
              resizeMode: 'contain',
            }}
            onPress={this.selectCategory}
          />
          <IconButton
            source={IMAGES.FILTER}
            style={{
              position: 'absolute',
              right: 10,
              top: 40,
            }}
            imageStyle={{
              height: 18,
              width: 18,
              resizeMode: 'contain',
            }}
            onPress={this.openDrawer}
          />
        </View>
        <View
          style={{
            padding: 8,
            backgroundColor: '#F8F8F8',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#CDCDCD',
              borderRadius: 4,
              padding: 8,
              paddingHorizontal: 15,
              alignItems: 'center',
            }}
          >
            <Image
              source={IMAGES.SEARCH}
              style={{
                height: 14,
                width: 14,
                resizeMode: 'contain',
                marginRight: 15,
              }}
            />
            <TextInput
              style={{
                flex: 1,
                color: COLORS.BLACK,
                ...font(14),
              }}
              placeholder="Search"
              placeholderTextColor={COLORS.SEARCH_TEXT}
              underlineColorAndroid={COLORS.TRANSPARENT}
            />
          </View>
        </View>
      </View>
    );
  }
}
