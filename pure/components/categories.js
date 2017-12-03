import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { PropTypes } from 'prop-types';

import IMAGES from '../common/images';
import COLORS from '../common/colors';
import { commonStyle as cs } from '../common/styles';
import { getCategory } from '../common/helper';
import { categoryImageMap as imageMap, categoryOrder } from '../common/constants';

export default class Categories extends Component {
  static propTypes = {
    actAsFilters: PropTypes.bool,
    selectCategory: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
  }

  static defaultProps = {
    actAsFilters: false,
  }

  renderCategory = (categoryName, image) => {
    const TouchableWrapper = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
    const { actAsFilters } = this.props;
    const scale = actAsFilters ? 0.8 : 1;
    const { categories } = this.props;
    const category = getCategory(categories, categoryName);
    return (
      <TouchableWrapper
        onPress={this.props.selectCategory(category)}
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
            marginHorizontal: this.props.actAsFilters ? 12 : 20,
            marginVertical: 8,
          }}
        >
          {actAsFilters && !category.selected ? <View
            style={{
              position: 'absolute',
              backgroundColor: COLORS.WHITE,
              opacity: 0.5,
              ...StyleSheet.absoluteFillObject,
            }}
          /> : null}
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
              backgroundColor: COLORS.TRANSPARENT,
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {category.name}
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
          {this.renderCategory(categoryOrder[0], imageMap.get(categoryOrder[0]))}
          {this.renderCategory(categoryOrder[1], imageMap.get(categoryOrder[1]))}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {this.renderCategory(categoryOrder[2], imageMap.get(categoryOrder[2]))}
          {this.renderCategory(categoryOrder[3], imageMap.get(categoryOrder[3]))}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {this.renderCategory(categoryOrder[4], imageMap.get(categoryOrder[4]))}
          {this.renderCategory(categoryOrder[5], imageMap.get(categoryOrder[5]))}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {this.renderCategory(categoryOrder[6], imageMap.get(categoryOrder[6]))}
          {this.renderCategory(categoryOrder[7], imageMap.get(categoryOrder[7]))}
        </View>
      </ScrollView>);
  }
}
