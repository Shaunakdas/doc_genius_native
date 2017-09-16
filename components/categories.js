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
import { connect } from 'react-redux';

import IMAGES from '../common/images';
import COLORS from '../common/colors';
import { commonStyle as cs } from '../common/styles';

const imageMap = new Map([
  ['SAT/ACT/AP', 'SAT'],
  ['Course Selection', 'COURSE'],
  ['College/Career', 'COLLEGE'],
  ['Essay', 'ESSAY'],
  ['Recommendation Letters', 'RECOMMENDATION'],
  ['Applications', 'APPLICATION'],
  ['Financial Aid', 'FINANCIAL'],
  ['Others', 'OTHER'],
]);

class Categories extends Component {
  static propTypes = {
    shrinked: PropTypes.bool,
    selectCategory: PropTypes.func.isRequired,
    actAsFilters: PropTypes.bool,
  }

  static defaultProps = {
    shrinked: false,
    actAsFilters: false,
  }

  onCategorySelect = () => {

  }

  renderCategory = (category, image) => {
    const TouchableWrapper = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
    const { shrinked } = this.props;
    const scale = shrinked ? 0.8 : 1;
    return (
      <TouchableWrapper
        onPress={this.props.selectCategory(category.name)}
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
            {category.name}
          </Text>
        </View>
      </TouchableWrapper>
    );
  }

  render() {
    const { categories } = this.props;
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
          {this.renderCategory(categories[0], imageMap.get(categories[0].name))}
          {this.renderCategory(categories[1], imageMap.get(categories[1].name))}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {this.renderCategory(categories[2], imageMap.get(categories[2].name))}
          {this.renderCategory(categories[3], imageMap.get(categories[3].name))}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {this.renderCategory(categories[4], imageMap.get(categories[4].name))}
          {this.renderCategory(categories[5], imageMap.get(categories[5].name))}
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {this.renderCategory(categories[6], imageMap.get(categories[6].name))}
          {this.renderCategory(categories[7], imageMap.get(categories[7].name))}
        </View>
      </ScrollView>);
  }
}

const mapStateToProps = ({ categories, filters }) => ({
  categories,
  filters,
});

export default connect(mapStateToProps)(Categories);
