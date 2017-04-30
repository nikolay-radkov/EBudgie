import React, { PropTypes } from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import i18n from 'react-native-i18n';
import { List, ListItem } from 'react-native-elements';
import moment from 'moment';

import colors from '../../themes/Colors';

const styles = StyleSheet.create({
  list: {
    marginTop: 0,
  }
});

const ThresholdItemContent = ({
  events,
  color,
  currency,
  editIncome,
  editExpense,
}) => {

  return (
    <View>
      {events.length !== 0 &&
        <List containerStyle={styles.list}>
          {
            events.map((l, i) => (
              <ListItem
                badge={{
                  value: `${l.value}${currency}`,
                  badgeTextStyle: {
                    color: colors.snow
                  },
                  badgeContainerStyle: {
                    backgroundColor: l.value < 0 ? colors.fire : colors.warm,
                    right: 0,
                  }
                }}
                containerStyle={{
                  backgroundColor: color,
                }}
                hideChevron
                key={i}
                leftIcon={{
                  name: l.value < 0 ? 'money-off' : 'attach-money',
                  color: l.value < 0 ? colors.fire : colors.warm
                }}
                onPress={() => {
                  if (l.value >= 0) {
                    editIncome(l.id);
                  } else {
                    editExpense(l.id);
                  }
                }}
                subtitle={moment(l.date).format('DD-MM-YYYY')}
                title={l.item}
                titleStyle={{ color: colors.snow }}
              />
            ))
          }
        </List>
      }
      {events.length === 0 &&
        <View style={{
          alignItems: 'center'
        }}>
          <Text>{i18n.t('NO_EVENTS_FOR_CATEGORY')}</Text>
        </View>
      }
    </View>
  );
};

ThresholdItemContent.propTypes = {
  events: PropTypes.array,
  currency: PropTypes.string,
  color: PropTypes.string,
  editIncome: PropTypes.func,
  editExpense: PropTypes.func,
};

export default ThresholdItemContent;
