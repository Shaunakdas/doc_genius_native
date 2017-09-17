import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { categoryDrawerStyle as s, commonStyle as cs, font } from '../common/styles';
import IMAGES from '../common/images';
import COLORS from '../common/colors';
import { Categories, Button } from '../components';
import {
  applyFilters,
} from '../store/actions';

const isCategorySelected =
  (category, filters) => filters.filter(item => item.id === category.id).length > 0;

class CategoryDrawer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    filters: PropTypes.array.isRequired,
    apply: PropTypes.func.isRequired,
    filterNumber: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories.map(category => ({
        name: category.name,
        id: category.id,
        selected: isCategorySelected(category, props.filters),
      })) };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filterNumber !== this.props.filterNumber) {
      this.setState({
        categories: nextProps.categories.map(category => ({
          name: category.name,
          id: category.id,
          selected: isCategorySelected(category, nextProps.filters),
        })),
      });
    }
  }

  onApplyFilters = () => {
    const { apply } = this.props;
    const filters = this.state.categories.filter(item => item.selected).map(filter => ({
      id: filter.id,
      name: filter.name,
    }));
    apply(filters);
    this.closeDrawer();
  }

  removeAll = () => {
    this.setState({
      categories: this.state.categories.map(category => ({
        name: category.name,
        id: category.id,
        selected: false,
      })),
    });
  }

  selectAll = () => {
    this.setState({
      categories: this.state.categories.map(category => ({
        name: category.name,
        id: category.id,
        selected: true,
      })),
    });
  }

  closeDrawer = () => {
    this.props.navigation.navigate('DrawerClose', { filtersApplied: true });
  }

  selectCategory = selectedCategory => () => {
    this.setState({
      categories: this.state.categories.map((category) => {
        if (category.id === selectedCategory.id) {
          return {
            ...selectedCategory,
            selected: !selectedCategory.selected,
          };
        }
        return category;
      }),
    });
  };

  render() {
    const { categories } = this.state;
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
          <Button
            style={s.postButton}
            textStyle={s.postButtonText}
            text="Apply"
            onPress={this.onApplyFilters}
          />

        </View>
        <ScrollView
          style={{ flex: 1 }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 30,
              marginTop: 10,
            }}
          >
            <Button
              text="Select All"
              style={{
                borderRadius: 10,
                width: 100,
                paddingVertical: 6,
                borderWidth: 1,
                borderColor: COLORS.PRIMARY,
              }}
              textStyle={{
                ...font(12),
                textAlign: 'center',
                color: COLORS.PRIMARY,
                backgroundColor: COLORS.TRANSPARENT,
              }}
              onPress={this.selectAll}
            />
            <Button
              text="Deselect All"
              style={{
                borderRadius: 10,
                width: 100,
                paddingVertical: 6,
                borderWidth: 1,
                borderColor: COLORS.PRIMARY,
              }}
              textStyle={{
                ...font(12),
                textAlign: 'center',
                color: COLORS.PRIMARY,
                backgroundColor: COLORS.TRANSPARENT,
              }}
              onPress={this.removeAll}
            />
          </View>
          <Categories
            actAsFilters
            selectCategory={this.selectCategory}
            categories={categories}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps =
  ({ categories, filters, appState: { filterNumber } }) => ({ categories, filters, filterNumber });

const mapDispatchToProps = dispatch => ({
  apply: filters => dispatch(applyFilters(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDrawer);
