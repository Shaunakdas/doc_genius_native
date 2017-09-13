import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  Image,
} from 'react-native';
import { PropTypes } from 'prop-types';

import IMAGES from '../common/images';
import COLORS from '../common/colors';
import { commonStyle as cs } from '../common/styles';

export default class Categories extends Component {
  static propTypes = {
    shrinked: PropTypes.bool,
    selectCategory: PropTypes.func.isRequired,
  }

  static defaultProps = {
    shrinked: false,
  }

  renderCategory = (text, image) => {
    const TouchableWrapper = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
    const { shrinked } = this.props;
    const scale = shrinked ? 0.8 : 1;
    return (
      <TouchableWrapper
        onPress={this.props.selectCategory(text)}
      >
        <View
          style={{
            height: 125 * scale,
            width: 125 * scale,
            backgroundColor: COLORS.PRIMARY,
            elevation: 2,
            shadowColor: COLORS.BLACK,
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            borderRadius: 5,
            marginHorizontal: this.props.shrinked ? 12 : 20,
            marginVertical: 8,
          }}
        >
          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.WHITE,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={IMAGES[`${image}_BG`]}
              style={{
                position: 'absolute',
                height: 95 * scale,
                width: 125 * scale,
                resizeMode: 'contain',
                bottom: 0,
              }}
            />
            <Image
              source={IMAGES[`${image}`]}
              style={{
                height: 55 * scale,
                width: 55 * scale,
                resizeMode: 'contain',
              }}
            />
          </View>
          <Text
            style={{
              color: COLORS.WHITE,
              height: 25 * scale,
              textAlign: 'center',
              fontSize: 11,
              paddingTop: 4,
              marginHorizontal: 5,
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {text}
          </Text>
        </View>
      </TouchableWrapper>
    );
  }

  render() {
    return (
      <ScrollView
        style={cs.scroll}
        contentContainerStyle={{
          alignItems: 'center',
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {this.renderCategory('SAT / ACT / AP', 'SAT')}
          {this.renderCategory('Course Selection', 'COURSE')}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {this.renderCategory('College/Career', 'COLLEGE')}
          {this.renderCategory('Essay', 'ESSAY')}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {this.renderCategory('Recommendation', 'RECOMMENDATION')}
          {this.renderCategory('Applications', 'APPLICATION')}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {this.renderCategory('Financial Aid', 'FINANCIAL')}
          {this.renderCategory('Other', 'OTHER')}
        </View>
      </ScrollView>);
  }
}
