import React, { PropTypes }from 'react';
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
  goTo
}) => {
  const list = [{
    icon: 'money-off',
    name: 'Add new expense',
    subtitle: 'Current: -1000$',
    color: '#fd1111',
    route: 'add_expense'
  }, {
    icon: 'attach-money',
    name: 'Add new income',
    subtitle: 'Current: 200$',
    color: '#11dd22',
    route: 'add_income'
  }, {
    icon: 'library-add',
    name: 'Add new category',
    subtitle: '25 categories now',
    route: 'add_category'
  }, {
    icon: 'add',
    name: 'Add new item',
    subtitle: '135 categories now',
    route: 'add_item'
  }, {
    icon: 'repeat',
    name: 'Change montly salary',
    subtitle: 'Current: 2000$',
    route: 'edit_salary'
  }, {
    icon: 'timeline',
    name: 'See reports',
    subtitle: '2 reports',
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
  goTo: PropTypes.func.isRequired
}

export default Menu;
