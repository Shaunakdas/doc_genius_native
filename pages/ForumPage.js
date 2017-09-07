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

  renderQA() {
    return (
      <View
        style={{
          borderRadius: 10,
          padding: 10,
          backgroundColor: COLORS.WHITE,
          margin: 10,
        }}
      >
        <View
          style={{
            alignItems: 'flex-end',
            marginBottom: 5,
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.PRIMARY,
              borderRadius: 4,
              elevation: 2,
              shadowColor: COLORS.BLACK,
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 2,
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}
          >
            <Text style={{ ...font(12), color: COLORS.WHITE }}> SAT/ ACT/ AP </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ ...font(40), color: '#D1D5DB' }}>Q</Text>
          <Text style={{ ...font(16) }}> What is UCLA's average ACT score?</Text>
        </View>
        <View style={{
          borderBottomWidth: 1,
          borderColor: '#B1E0EC',
          flexDirection: 'row',
          paddingBottom: 8,
          alignItems: 'center',
        }}
        >
          <Image
            source={IMAGES.POST_BY}
            style={{ height: 24, width: 24, resizeMode: 'contain', marginLeft: 20 }}
          />
          <Text style={{ ...font(14), marginLeft: 20 }}>Aaron (11th)</Text>
          <Text style={{ ...font(12), color: '#ACB4BE', marginLeft: 40 }}>1 hour ago</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ ...font(12), color: '#ACB4BE' }}>0</Text>
            <Image
              source={IMAGES.HEART}
              style={{ height: 16, width: 26, resizeMode: 'contain', marginLeft: 4 }}
            />

            <Text style={{ ...font(12), color: '#ACB4BE' }}>0</Text>
            <Image
              source={IMAGES.ANSWERS}
              style={{ height: 16, width: 16, resizeMode: 'contain', marginLeft: 4 }}
            />

          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ ...font(40), color: '#D1D5DB' }}>A</Text>
          <Text style={{ ...font(16) }}> Freshman at UCLA had an average ACT of </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          paddingBottom: 8,
          alignItems: 'center',
        }}
        >
          <Image
            source={IMAGES.ANSWER_BY}
            style={{ height: 24, width: 24, resizeMode: 'contain', marginLeft: 20 }}
          />
          <Text style={{ ...font(14), marginLeft: 20 }}>Greg</Text>
          <Text style={{ ...font(12), color: '#ACB4BE', marginLeft: 40 }}>1 hour ago</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ ...font(12), color: '#ACB4BE' }}>0</Text>
            <Image
              source={IMAGES.HEART}
              style={{ height: 16, width: 26, resizeMode: 'contain', marginLeft: 4 }}
            />

            <Text style={{ ...font(12), color: '#ACB4BE' }}>0</Text>
            <Image
              source={IMAGES.REPLY}
              style={{ height: 16, width: 16, resizeMode: 'contain', marginLeft: 4 }}
            />

          </View>
        </View>
      </View>
    );
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
        {this.renderQA()}
      </View>
    );
  }
}
