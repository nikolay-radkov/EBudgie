import React, { PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import {
  List,
  ListItem
} from 'react-native-elements';
import i18n from 'react-native-i18n';

import theme from '../../themes/ApplicationStyles';
import colors from '../../themes/Colors';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.background
  },
  list: {
    marginBottom: 20
  },
  language: {
    textAlign: 'center',
  }
});

const Menu = ({
  goTo,
  categoriesCount,
  itemsCount,
  currentExpense,
  currentIncome,
  currentSalary,
  currency,
  language
}) => {
  const list = [{
    icon: 'today',
    name: i18n.t('SEE_CALENDAR'),
    color: colors.main,
    route: 'calendar'
  }, {
    icon: 'money-off',
    name: i18n.t('ADD_NEW_EXPENSE'),
    subtitle: i18n.t('DRAWER_EXPENSES_DESCRIPTION', {
      expense: currentExpense,
      currency
    }),
    color: colors.error,
    route: 'add_expense'
  }, {
    icon: 'attach-money',
    name: i18n.t('ADD_NEW_INCOME'),
    subtitle: i18n.t('DRAWER_INCOMES_DESCRIPTION', {
      income: currentIncome,
      currency
    }),
    color: colors.success,
    route: 'add_income'
  }, {
    icon: 'library-add',
    name: i18n.t('SEE_CATEGORIES'),
    subtitle: i18n.t('DRAWER_CATEGORIES_DESCRIPTION', {
      count: categoriesCount
    }),
    color: colors.positive,
    route: 'categories'
  }, {
    icon: 'add',
    name: i18n.t('SEE_ITEMS'),
    subtitle: i18n.t('DRAWER_ITEMS_DESCRIPTION', {
      count: itemsCount
    }),
    color: colors.warm,
    route: 'items'
  }, {
    icon: 'repeat',
    name: i18n.t('CHANGE_MONTHLY_SALARY'),
    subtitle: i18n.t('DRAWER_SALARY_DESCRIPTION', {
      salary: currentSalary,
      currency
    }),
    color: colors.panther,
    route: 'edit_salary'
  }, {
    icon: 'lock',
    name: i18n.t('ADD_THRESHOLD'),
    color: colors.bloodOrange,
    route: 'add_threshold'
  }, {
    icon: 'timeline',
    name: i18n.t('SEE_REPORTS'),
    color: colors.cloud,
    route: 'reports'
  }, {
    icon: 'settings',
    name: i18n.t('SETTINGS'),
    color: colors.facebook,
    route: 'settings'
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
      <Text style={styles.language}>{i18n.t('LANGUAGE')} - {language}</Text>
    </ScrollView>
  );
};

Menu.propTypes = {
  goTo: PropTypes.func.isRequired,
  categoriesCount: PropTypes.number,
  itemsCount: PropTypes.number,
  currentExpense: PropTypes.number,
  currentIncome: PropTypes.number,
  currentSalary: PropTypes.number,
  currency: PropTypes.string,
  language: PropTypes.string,
};

Menu.defaultProps = {
  categoriesCount: 0,
  itemsCount: 0,
  currentExpense: 0,
  currentIncome: 0,
  currentSalary: 0,
  currency: '$'
};

export default Menu;
