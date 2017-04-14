import React, { PropTypes } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Calendar from 'react-native-calendar';
import moment from 'moment';
import { View } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';

import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.background,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
  },
});

const Overview = ({
  onDateSelect,
  onSwipeNext,
  onSwipePrev,
  onTouchNext,
  onTouchPrev,
  eventsDate,
  selectedDate,
  addExpense,
  addIncome,
  getCalendar,
  events,
  editIncome,
  editExpense,
}) => {
  const today = moment();

  return (
    <ScrollView style={[theme.container, styles.scrollView]}>
      <Calendar
        customStyle={{
          calendarContainer: {
            backgroundColor: colors.snow,
            flex: 1
          },
          calendarControls: {
            backgroundColor: colors.main,
          },
          title: {
            color: colors.snow,
          },
          controlButtonText: {
            color: colors.snow,
          },
          dayButtonFiller: {
            backgroundColor: colors.silver,
          },
          monthContainer: {
            marginBottom: 10,
          },
          selectedDayCircle: {
            backgroundColor: colors.main,
          },
          dayHeading: {
            color: colors.snow,
          },
          calendarHeading: {
            backgroundColor: colors.main,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: colors.snow,
          },
          day: {
            fontSize: 15,
            textAlign: 'center'
          },
          eventIndicator: {
            backgroundColor: colors.main,
            width: 10,
            height: 10,
          },
        }}
        eventDates={eventsDate}
        nextButtonText={'Next'}
        onDateSelect={onDateSelect}
        onSwipeNext={onSwipeNext}
        onSwipePrev={onSwipePrev}
        onTouchNext={onTouchNext}
        onTouchPrev={onTouchPrev}
        prevButtonText={'Prev'}
        ref={getCalendar}
        scrollEnabled
        selectedDate={selectedDate}
        showControls
        showEventIndicators
        startDate={today}
        titleFormat={'MMMM YYYY'}
        today={today}
        weekStart={1}
      />
      <View style={styles.buttons}>
        <Button
          backgroundColor={colors.fire}
          buttonStyle={styles.button}
          icon={{ name: 'money-off' }}
          onPress={addExpense}
          raised
          title="Add Expense" />
        <Button
          backgroundColor={colors.warm}
          buttonStyle={styles.button}
          icon={{ name: 'attach-money' }}
          iconRight
          onPress={addIncome}
          raised
          title="Add Income" />
      </View>
      {selectedDate && !!events.length &&
        <View>
          <List containerStyle={styles.list}>
            {
              events.map((l, i) => (
                <ListItem
                  badge={{
                    value: l.value,
                    badgeTextStyle: {
                      color: colors.snow
                    },
                    badgeContainerStyle: {
                      backgroundColor: l.value < 0 ? colors.fire : colors.warm,
                      right: 0
                    }
                  }}
                  containerStyle={{
                    backgroundColor: colors.main
                  }}
                  hideChevron
                  key={i}
                  leftIcon={{
                    name: l.icon,
                    color: l.color
                  }}
                  onPress={() => {
                    if (l.value >= 0) {
                      editIncome(l.id);
                    } else {
                      editExpense(l.id);
                    }
                  }}
                  roundAvatar
                  subtitle={l.item}
                  title={l.category}
                  titleStyle={{ color: colors.snow }}
                />
              ))
            }
          </List>
        </View>
      }
    </ScrollView>
  );
};

Overview.propTypes = {
  onDateSelect: PropTypes.func,
  onSwipeNext: PropTypes.func,
  onSwipePrev: PropTypes.func,
  onTouchNext: PropTypes.func,
  onTouchPrev: PropTypes.func,
  eventsDate: PropTypes.array,
  selectedDate: PropTypes.any,
  addExpense: PropTypes.func.isRequired,
  addIncome: PropTypes.func.isRequired,
  getCalendar: PropTypes.func.isRequired,
  events: PropTypes.array,
  editExpense: PropTypes.func,
  editIncome: PropTypes.func,
};

export default Overview;
