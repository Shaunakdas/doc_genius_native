import React from 'react';
import { Text, View, Image } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import IMAGES from '../common/images';
import { IconButton, Categories } from '../components';
import { commonStyle as cs, categorySelectionPageStyle as s } from '../common/styles';

class CategorySelectionPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
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

  goToAskForum = category => () => {
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const { fromForum = false } = params;

    navigation.navigate(fromForum ? 'AskForumPage' : 'ChatAskForumPage', { category });
  }

  render() {
    const { categories } = this.props;
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
        <Categories
          selectCategory={this.goToAskForum}
          categories={categories}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ categories }) => ({ categories });
export default connect(mapStateToProps)(CategorySelectionPage);
