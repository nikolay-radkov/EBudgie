import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import _ from 'lodash';

import colors from '../../themes/Colors';
import CategoryCard from '../../components/CategoryCard';

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
  render() {
    const { evenCategories, oddCategories } = this.props;

    const mappedEvenCategories = evenCategories.map((c, i) => {
      return (
        <CategoryCard
          color={c.color}
          icon={c.icon}
          key={i}
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
    evenCategories,
    oddCategories,
  };
}

export default connect(
  mapStateToProps,
)(CategoriesContainer);
