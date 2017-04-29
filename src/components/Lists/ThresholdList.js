import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import i18n from 'react-native-i18n';
import Accordion from 'react-native-accordion';
import moment from 'moment';

import HeaderWrapper from '../Header/HeaderWrapper';
import { mapArrayOfIdsToCategories } from '../../services/mapIdToObject';
import { translateMany } from '../../services/translator';
import { CATEGORY_PROP } from '../../constants/TranslationProps';
import ThresholdItemHeader from './ThresholdItemHeader';
import colors from '../../themes/Colors';

class ThresholdList extends Component {
  renderRow = ({
    title,
    icon,
    color,
    value,
    incomes,
    expenses
  }) => {
    const { currency } = this.props;
    const currentExpense = _.sumBy(expenses, 'value');

    const header = (
      <View>
        <ThresholdItemHeader
          color={color}
          currency={currency}
          currentExpense={currentExpense}
          icon={icon}
          title={title}
          value={value}
        />
      </View>
    );

    const events = incomes.concat(expenses);
    const orderedEvents = _.sortBy(events, 'date');

    var content = (
      <View>
        {orderedEvents.map(e => (
          <Text>{e.value} | {e.date}</Text>
        ))
        }
        {orderedEvents.length === 0 &&
          <Text> No events for this category</Text>

        }
      </View>
    );

    return (
      <Accordion
        content={content}
        easing="easeOutCubic"
        header={header}
        underlayColor={colors.ember}
      />
    );
  }

  render() {
    const { thresholdCategories } = this.props;

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dataSource = ds.cloneWithRows(thresholdCategories);

    return (
      <View >
        <HeaderWrapper title={i18n.t('CATEGORIES_THRESHOLD')} />
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow}
        />
      </View >
    );
  }
}

function isCurrentMonth(date) {
  const eventDate = moment(date);
  const currentDate = moment();
  return eventDate.month() === currentDate.month() &&
    eventDate.year() === currentDate.year();
}

function mapStateToProps(state) {
  const { thresholds, expenses, incomes, currency } = state.ebudgie;
  const currentThreshold = thresholds[thresholds.length - 1] || {};
  const categories = currentThreshold.categories || [];
  const mappedCategories = mapArrayOfIdsToCategories(state.ebudgie.categories, categories);

  const thresholdCategories = _.map(mappedCategories, (c) => {
    return {
      ...c,
      expenses: _.filter(expenses, (e) => e.categoryId === c.id && isCurrentMonth(e.date)) || [],
      incomes: _.filter(incomes, (i) => i.categoryId === c.id && isCurrentMonth(i.date)) || [],
    };
  });

  return {
    thresholdCategories: translateMany(thresholdCategories, CATEGORY_PROP),
    currency,
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThresholdList);
