import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { PropTypes } from 'prop-types';

import { categoryDrawerStyle as s, commonStyle as cs } from '../common/styles';
import IMAGES from '../common/images';
import { Categories } from '../components';

export default class CategoryDrawer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  closeDrawer = () => {
    this.props.navigation.navigate('DrawerClose');
  }

  selectCategory = () => () => this.closeDrawer();

  render() {
    return (
      <View
        style={cs.container}
      >
        <View style={s.header}>
          <Image
            source={IMAGES.HEADER_BG}
            style={s.headerImage}
          />
          <Text style={s.headerText}> Filters </Text>
        </View>
        <ScrollView
          style={{ flex: 1 }}
        >
          <Categories
            shrinked
            selectCategory={this.selectCategory}
          />
        </ScrollView>
      </View>
    );
  }
}
