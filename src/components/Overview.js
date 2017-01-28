import React, { PropTypes } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Calendar from 'react-native-calendar';
import moment from 'moment';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

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
  }
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
}) => {
  const today = moment();

  return (
    <ScrollView style={[theme.container, styles.scrollView]}>
      <Calendar
        customStyle={{
          day: {
            fontSize: 15,
            textAlign: 'center'
          },
          eventIndicator: {
            backgroundColor: 'blue',
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
          onPress={addIncome}
          raised
          title="Add Income" />
      </View>
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
};

export default Overview;
