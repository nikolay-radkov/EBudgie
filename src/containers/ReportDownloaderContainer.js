import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dismissKeyboard from 'dismissKeyboard';
import DatePicker from 'react-native-datepicker';
import ModalPicker from 'react-native-modal-picker';
import SettingsList from 'react-native-settings-list';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import moment from 'moment';

import * as actions from '../actionCreators/reportForm';
import { popRoute } from '../boundActionCreators/navigation';
import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';
import { getReportForDownload } from '../services/events';
import { mapReportForDownload } from '../services/mapIdToObject';
import csv from '../services/csv';
import { saveFile } from '../services/file';

const iconSize = 25;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  imageStyle: {
    marginLeft: 15,
    alignSelf: 'center',
    width: iconSize,
    height: iconSize,
    justifyContent: 'center'
  },
  header: {
    color: colors.main,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  devider: {
    marginTop: -5
  },
  title: {
    color: 'black',
    fontSize: 16
  },
  hiddenModal: {
    width: 0,
    height: 0
  }
});

const decimalSeparators = [
  { key: '0', section: true, label: 'Choose decimal separator' },
  { key: '.', label: 'Decimal point \'.\'' },
  { key: ',', label: 'Decimal comma \',\'' },
];

const delimiterCharacters = [
  { key: '0', section: true, label: 'Choose delimiter character' },
  { key: ',', label: 'Comma \',\'' },
  { key: ';', label: 'Semicolon \';\'' },
];

class ReportDownloaderComponent extends Component {
  saveReport = async () => {
    const {
      pop,
      resetReportForm,
      events,
    } = this.props;

    const data = csv(['date', 'category', 'item', 'value'], events);
    await saveFile(data, `report-${moment().format('YYYY-MM-DD')}`)
    resetReportForm();
    pop();
  }

  render() {
    const headerProps = {
      borderHide: 'Both',
      hasNavArrow: false,
      titleStyle: styles.header
    };

    const {
      reportForm,
      setReportFormDecimalSeparator,
      setReportFormDelimiterCharacter,
      toggleReportFormIsRangeEvents,
      setReportFormFromDate,
      setReportFormToDate,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[theme.container,]}>
          <ModalPicker
            data={decimalSeparators}
            onChange={(option) => setReportFormDecimalSeparator(option.key)}
            ref={ref => { this.decimalModal = ref; }}
            style={styles.hiddenModal} />
          <ModalPicker
            data={delimiterCharacters}
            onChange={(option) => setReportFormDelimiterCharacter(option.key)}
            ref={ref => { this.delimiterModal = ref; }}
            style={styles.hiddenModal} />

          <DatePicker
            cancelBtnText="Cancel"
            confirmBtnText="Confirm"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            date={reportForm.fromDate}
            format="YYYY-MM-DD"
            mode="date"
            onDateChange={setReportFormFromDate}
            placeholder="select date"
            ref={ref => { this.fromDateModal = ref; }}
            style={styles.hiddenModal}
          />

          <DatePicker
            cancelBtnText="Cancel"
            confirmBtnText="Confirm"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            date={reportForm.toDate}
            format="YYYY-MM-DD"
            mode="date"
            onDateChange={setReportFormToDate}
            placeholder="select date"
            ref={ref => { this.toDateModal = ref; }}
            style={styles.hiddenModal}
          />

          <SettingsList
            borderColor={colors.steel}
            defaultItemSize={50}>
            <SettingsList.Item
              {...headerProps}
              title="File Settings"
            />
            <SettingsList.Item
              hasNavArrow={false}
              icon={
                <View style={styles.imageStyle}>
                  <Icon
                    color={colors.main}
                    name="more-horiz"
                    size={iconSize} />
                </View>
              }
              onPress={() => this.decimalModal.open()}
              title="Decimal separator"
              titleInfo={reportForm.decimalSeparator}
              titleStyle={styles.title}
            />
            <SettingsList.Item
              hasNavArrow={false}
              icon={
                <View style={styles.imageStyle}>
                  <Icon
                    color={colors.main}
                    name="line-style"
                    size={iconSize} />
                </View>
              }
              onPress={() => this.delimiterModal.open()}
              title="Delimiter character"
              titleInfo={reportForm.delimiterCharacter}
              titleStyle={styles.title}
            />

            <SettingsList.Header headerStyle={styles.devider} />
            <SettingsList.Item
              {...headerProps}
              title="Events"
            />
            <SettingsList.Item
              hasNavArrow={false}
              hasSwitch
              icon={
                <View style={styles.imageStyle}>
                  <Icon
                    color={colors.main}
                    name={reportForm.isRangeEvents ? 'check-box' : 'check-box-outline-blank'}
                    size={iconSize} />
                </View>
              }
              switchOnValueChange={toggleReportFormIsRangeEvents}
              switchState={reportForm.isRangeEvents}
              title="Report for time period"
              titleStyle={styles.title}
            />
            {
              reportForm.isRangeEvents &&
              <SettingsList.Item
                hasNavArrow={false}
                icon={
                  <View style={styles.imageStyle}>
                    <Icon
                      color={colors.main}
                      name="date-range"
                      size={iconSize} />
                  </View>
                }
                onPress={() => this.fromDateModal.onPressDate()}
                title="From Date"
                titleInfo={reportForm.fromDate}
                titleStyle={styles.title}
              />
            }
            {
              reportForm.isRangeEvents &&
              <SettingsList.Item
                hasNavArrow={false}
                icon={
                  <View style={styles.imageStyle}>
                    <Icon
                      color={colors.main}
                      name="date-range"
                      size={iconSize} />
                  </View>
                }
                onPress={() => this.toDateModal.onPressDate()}
                title="To date"
                titleInfo={reportForm.toDate}
                titleStyle={styles.title}
              />
            }

            <SettingsList.Header headerStyle={styles.devider} />
            <SettingsList.Item
              icon={
                <View style={styles.imageStyle}>
                  <Icon
                    color={colors.main}
                    name={'file-download'}
                    size={iconSize} />
                </View>
              }
              onPress={this.saveReport}
              title="Download CSV"
              titleStyle={styles.title}
            />
          </SettingsList>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ReportDownloaderComponent.propTypes = {
  reportForm: PropTypes.object.isRequired,
  setReportFormDecimalSeparator: PropTypes.func.isRequired,
  setReportFormDelimiterCharacter: PropTypes.func.isRequired,
  toggleReportFormIsRangeEvents: PropTypes.func.isRequired,
  setReportFormFromDate: PropTypes.func.isRequired,
  setReportFormToDate: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  downloadReport: PropTypes.func.isRequired,
  resetReportForm: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const { reportForm, ebudgie } = state;
  let incomes = [];
  let expenses = [];

  if (!reportForm.isRangeEvents) {
    incomes = _.map(ebudgie.incomes, (i) => mapReportForDownload(ebudgie.categories, ebudgie.items, i));
    expenses = _.map(ebudgie.expenses, (i) => mapReportForDownload(ebudgie.categories, ebudgie.items, i));
  } else {
    const result = getReportForDownload(ebudgie, reportForm.fromDate, reportForm.toDate);

    incomes = result.incomes;
    expenses = result.expenses;
  }

  let events = incomes.concat(expenses);
  events = _.orderBy(events, 'date') || [];

  return {
    events,
    reportForm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(actions, dispatch),
    pop: bindActionCreators(popRoute, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportDownloaderComponent);
