import React, { PropTypes } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Calendar from 'react-native-calendar';

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
  onTouchPrev
}) => {
  const today = new Date();

  return (
    <ScrollView style={[theme.container, styles.scrollView]}>
      <Calendar
        customStyle={{
          day: {
            fontSize: 15,
            textAlign: 'center'
          }
        }}
        eventDates={['2018-01-21']}
        events={[{ date: '2015-07-01' }]}
        nextButtonText={'Next'}
        onDateSelect={(date) => onDateSelect(date)}
        onSwipeNext={onSwipeNext}
        onSwipePrev={onSwipePrev}
        onTouchNext={onTouchNext}
        onTouchPrev={onTouchPrev}
        prevButtonText={'Prev'}
        scrollEnabled
        selectedDate={'2017-01-15'}
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
};

export default Overview;
