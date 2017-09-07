import React from 'react';
import { Text, View, Image, TouchableNativeFeedback,
  TouchableOpacity, Platform, ScrollView,
} from 'react-native';
import { PropTypes } from 'prop-types';

import IMAGES from '../common/images';
import COLORS from '../common/colors';
import { IconButton } from '../components';
import { commonStyle as cs, categorySelectionPageStyle as s } from '../common/styles';

export default class CategorySelectionPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  renderCategory = (text, image) => {
    const TouchableWrapper = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
    return (
      <TouchableWrapper>
        <View
          style={{
            height: 125,
            width: 125,
            backgroundColor: COLORS.PRIMARY,
            elevation: 2,
            shadowColor: COLORS.BLACK,
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            borderRadius: 5,
            margin: 20,
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
                height: 95,
                width: 125,
                resizeMode: 'contain',
                bottom: 0,
              }}
            />
            <Image
              source={IMAGES[`${image}`]}
              style={{
                height: 55,
                width: 55,
                resizeMode: 'contain',
              }}
            />
          </View>
          <Text
            style={{
              color: COLORS.WHITE,
              height: 25,
              textAlign: 'center',
              fontSize: 11,
              paddingTop: 4,
              marginHorizontal: 5,
            }}
          >
            {text}
          </Text>
        </View>
      </TouchableWrapper>
    );
  }

  render() {
    return (
      <View style={[cs.container, s.container]}>
        <View style={cs.header}>
          <Image
            source={IMAGES.HEADER_BG}
            style={cs.headerImage}
          />
          <IconButton
            source={IMAGES.BACK}
            onPress={this.goBack}
            style={[cs.backButton, s.backButton]}
            imageStyle={cs.backImage}
          />
          <Text style={cs.headerText}> Which Category would you like to Post in? </Text>
        </View>
        <ScrollView
          style={cs.scroll}
          contentContainerStyle={{
            alignItems: 'center',
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
        </ScrollView>
      </View>
    );
  }
}
