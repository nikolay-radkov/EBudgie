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
import i18n from 'react-native-i18n';

import * as actions from '../actionCreators/reportForm';
import { popRoute } from '../boundActionCreators/navigation';
import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';
import { getReportForDownload } from '../services/events';
import { mapReportForDownload } from '../services/mapIdToObject';
import csv from '../services/csv';
import { saveFile } from '../services/file';
import { schedule } from '../services/localNotifications';
import { DOWNLOADED_CSV_ID } from '../constants/NotificationIds';

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

const delimiterCharacters = [
  { key: '0', section: true, label: i18n.t('CHOOSE_DELIMITER_CHARACTER') },
  { key: ',', label: i18n.t('COMMA') },
  { key: ';', label: i18n.t('SEMICOLON') },
];

class ReportDownloaderComponent extends Component {
  saveReport = async () => {
    const {
      pop,
      resetReportForm,
      events,
    } = this.props;

    const data = csv([{
      name: 'date',
      label: i18n.t('DATE')
    }, {
      name: 'category',
      label: i18n.t('CATEGORY')
    }, {
      name: 'item',
      label: i18n.t('ITEM')
    }, {
      name: 'value',
      label: i18n.t('VALUE')
    }], events);
    await saveFile(data, `report-${moment().format('YYYY-MM-DD')}`);

    const fireDate = moment();
    fireDate.seconds(fireDate.seconds() + 40);
    const date = fireDate.toDate();

    schedule({
      id: DOWNLOADED_CSV_ID,
      title: 'Completed the jorney',
      message: 'Glad you\'ve used the full potential of the app',
      date,
    });
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
      setReportFormDelimiterCharacter,
      toggleReportFormIsRangeEvents,
      setReportFormFromDate,
      setReportFormToDate,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[theme.container,]}>
          <ModalPicker
            data={delimiterCharacters}
            onChange={(option) => setReportFormDelimiterCharacter(option.key)}
            ref={ref => { this.delimiterModal = ref; }}
            style={styles.hiddenModal} />

          <DatePicker
            cancelBtnText={i18n.t('CANCEL')}
            confirmBtnText={i18n.t('CONFIRM')}
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
            placeholder={i18n.t('SELECT_DATE')}
            ref={ref => { this.fromDateModal = ref; }}
            style={styles.hiddenModal}
          />

          <DatePicker
            cancelBtnText={i18n.t('CANCEL')}
            confirmBtnText={i18n.t('CONFIRM')}
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
            placeholder={i18n.t('SELECT_DATE')}
            ref={ref => { this.toDateModal = ref; }}
            style={styles.hiddenModal}
          />

          <SettingsList
            borderColor={colors.steel}
            defaultItemSize={50}>
            <SettingsList.Item
              {...headerProps}
              title={i18n.t('FILE_SETTINGS')}
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
              title={i18n.t('DELIMITER_CHARACTER')}
              titleInfo={reportForm.delimiterCharacter}
              titleStyle={styles.title}
            />

            <SettingsList.Header headerStyle={styles.devider} />
            <SettingsList.Item
              {...headerProps}
              title={i18n.t('EVENTS')}
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
              title={i18n.t('REPORT_FOR_TIME_PERIOD')}
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
                title={i18n.t('FROM_DATE')}
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
                title={i18n.t('TO_DATE')}
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
              title={i18n.t('DOWNLOAD_CSV')}
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
