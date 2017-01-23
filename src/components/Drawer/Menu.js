import React, { PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet
} from 'react-native';
import {
  List,
  ListItem
} from 'react-native-elements';

import theme from '../../themes/ApplicationStyles';
import colors from '../../themes/Colors';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.background
  },
  list: {
    marginBottom: 20
  }
});

const Menu = ({
  goTo,
  categoriesCount,
  itemsCount,
  currentExpenses,
  currentIncome,
  currentSallary,
}) => {
  const list = [{
    icon: 'money-off',
    name: 'Add new expense',
    subtitle: `Current: ${currentExpenses}$`,
    color: colors.error,
    route: 'add_expense'
  }, {
    icon: 'attach-money',
    name: 'Add new income',
    subtitle: `Current: ${currentIncome}$`,
    color: colors.success,
    route: 'add_income'
  }, {
    icon: 'library-add',
    name: 'Add new category',
    subtitle: `${categoriesCount} categories now`,
    color: colors.positive,
    route: 'add_category'
  }, {
    icon: 'add',
    name: 'Add new item',
    subtitle: `${itemsCount} items now`,
    color: colors.warm,
    route: 'add_item'
  }, {
    icon: 'repeat',
    name: 'Change montly salary',
    subtitle: `Current: ${currentSallary}$`,
    color: colors.panther,
    route: 'edit_salary'
  }, {
    icon: 'timeline',
    name: 'See reports',
    color: colors.cloud,
    route: 'reports'
  }];

  return (
    <ScrollView style={[theme.container, styles.scrollView]}>
      <List containerStyle={styles.list}>
        {
          list.map((l, i) => (
            <ListItem
              avatar={l.avatar_url}
              key={i}
              leftIcon={{
                name: l.icon,
                color: l.color
              }}
              onPress={() => goTo(l.route)}
              roundAvatar
              subtitle={l.subtitle}
              title={l.name}
              />
          ))
        }
      </List>
    </ScrollView>
  );
};

Menu.propTypes = {
  goTo: PropTypes.func.isRequired,
  categoriesCount: PropTypes.number,
  itemsCount: PropTypes.number,
  currentExpenses: PropTypes.number,
  currentIncome: PropTypes.number,
  currentSallary: PropTypes.number,
};

Menu.defaultProps = {
  categoriesCount: 0,
  itemsCount: 0,
  currentExpenses: 0,
  currentIncome: 0,
  currentSallary: 0,
};

export default Menu;
