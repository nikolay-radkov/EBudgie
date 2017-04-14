import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import _ from 'lodash';
import { bindActionCreators } from 'redux';

import colors from '../../themes/Colors';
import ItemCard from '../../components/ItemCard';
import { populateEditItemForm } from '../../actionCreators/editItemForm';
import { pushRoute } from '../../boundActionCreators/navigation';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 2,
  },
  column: {
    flex: 1,
  },
});

class ItemsContainer extends Component {
  editItem = (id) => {
    const { prepareEditItemForm, items, push } = this.props;
    const itemToEdit = _.find(items, (i) => i.id === id);
    prepareEditItemForm(itemToEdit);

    push({
      key: 'edit_item'
    });
  }

  render() {
    const { categories } = this.props;

    const mappedCategories = categories.map((c, index) => {
      return (
        <ItemCard
          color={c.color}
          evenItems={c.evenItems}
          icon={c.icon}
          key={index}
          oddItems={c.oddItems}
          onPress={this.editItem}
          size={8}
          title={c.title}
        />
      );
    });

    return (
      <ScrollView>
        <View style={styles.container}>
          {mappedCategories}
        </View>
      </ScrollView>
    );
  }
}

ItemsContainer.propTypes = {
  prepareEditItemForm: PropTypes.func.isRequired,
  categories: PropTypes.array,
  items: PropTypes.array,
  push: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { categories, items } = state.ebudgie;

  const mappedCategories = _.map(categories, (c) => {
    return {
      ...c,
      items: _.filter(items, (i) => i.categoryId === c.id),
      evenItems: [],
      oddItems: [],
    };
  });

  _.forEach(mappedCategories, (c) => {
    _.forEach(c.items, (i, index) => {
      if (index % 2 === 0) {
        c.evenItems.push(i);
      } else {
        c.oddItems.push(i);
      }
    });
  });

  return {
    categories: mappedCategories,
    items,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    prepareEditItemForm: populateEditItemForm,
    push: pushRoute,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsContainer);
