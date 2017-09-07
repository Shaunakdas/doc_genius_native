import React from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import IMAGES from '../common/images';
import COLORS, { alpha } from '../common/colors';

import { commonStyle as cs, font } from '../common/styles';
import { IconButton } from '../components';

export default class ForumPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
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
              right: 70,
              top: 40,
            }}
            imageStyle={{
              height: 18,
              width: 18,
              resizeMode: 'contain',
            }}
          />
          <IconButton
            source={IMAGES.FILTER}
            style={{
              position: 'absolute',
              right: 20,
              top: 40,
            }}
            imageStyle={{
              height: 18,
              width: 18,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            padding: 12,
            backgroundColor: COLORS.SEARCH_FILL,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: alpha(COLORS.SEARCH_TEXT, 0.6),
              borderRadius: 4,
              padding: 4,
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
                color: COLORS.SEARCH_TEXT,
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
