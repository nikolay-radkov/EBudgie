import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import _ from 'lodash';
import { bindActionCreators } from 'redux';

import colors from '../../themes/Colors';
import CategoryCard from '../../components/CategoryCard';
import { populateEditCategoryForm } from '../../actionCreators/editCategoryForm';
import { pushRoute } from '../../boundActionCreators/navigation';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 2,
  },
  column: {
    flex: 1,
  },
});

class CategoriesContainer extends Component {
  editCategory = (id) => {
    const { prepareEditCategoryForm, categories, push } = this.props;
    const categoryToEdit = _.find(categories, (i) => i.id === id);
    prepareEditCategoryForm(categoryToEdit);

    push({
      key: 'edit_category'
    });
  }

  render() {
    const { evenCategories, oddCategories } = this.props;

    const mappedEvenCategories = evenCategories.map((c, i) => {
      return (
        <CategoryCard
          color={c.color}
          icon={c.icon}
          key={i}
          onPress={() => this.editCategory(c.id)}
          size={16}
          subtitle={`${c.itemsCount} items`}
          title={c.title}
        />
      );
    });

    const mappedOddCategories = oddCategories.map((c, i) => {
      return (
        <CategoryCard
          color={c.color}
          icon={c.icon}
          key={i}
          onPress={() => this.editCategory(c.id)}
          size={16}
          subtitle={`${c.itemsCount} items`}
          title={c.title}
        />
      );
    });

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.column}>{mappedEvenCategories}</View>
          <View style={styles.column}>{mappedOddCategories}</View>
        </View>
      </ScrollView>
    );
  }
}

CategoriesContainer.propTypes = {
  evenCategories: PropTypes.array,
  oddCategories: PropTypes.array,
  prepareEditCategoryForm: PropTypes.func.isRequired,
  categories: PropTypes.array,
  push: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { categories, items } = state.ebudgie;

  const mappedCategories = _.map(categories, (c) => {
    return {
      ...c,
      itemsCount: _.filter(items, (i) => i.categoryId === c.id).length || 0,
    };
  });

  const evenCategories = [];
  const oddCategories = [];

  _.forEach(mappedCategories, (c, i) => {
    if (i % 2 === 0) {
      evenCategories.push(c);
    } else {
      oddCategories.push(c);
    }
  });

  return {
    categories,
    evenCategories,
    oddCategories,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    prepareEditCategoryForm: populateEditCategoryForm,
    push: pushRoute,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesContainer);
