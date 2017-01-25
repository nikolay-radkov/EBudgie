import React, { PropTypes } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Calendar from 'react-native-calendar';
import moment from 'moment';

import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.background,
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
        onDateSelect={(date) => onDateSelect(date)}
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

};

export default Overview;
