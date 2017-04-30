import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import i18n from 'react-native-i18n';
import moment from 'moment';
import Accordion from 'react-native-collapsible/Accordion';

import HeaderWrapper from '../Header/HeaderWrapper';
import { mapArrayOfIdsToCategories } from '../../services/mapIdToObject';
import { translateMany } from '../../services/translator';
import { CATEGORY_PROP } from '../../constants/TranslationProps';
import ThresholdItemHeader from './ThresholdItemHeader';
import colors from '../../themes/Colors';

class ThresholdList extends Component {
  constructor() {
    super();

    this.state = {
      activeSection: false
    };
  }

  onChange = (index) => {
    this.setState({
      activeSection: index,
    });
  }

  renderHeader = ({
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
    return header;
  }

  renderContent = ({
    title,
    icon,
    color,
    value,
    incomes,
    expenses
  }) => {
    const events = incomes.concat(expenses);
    const orderedEvents = _.sortBy(events, 'date');

    var content = (
      <View>
        {orderedEvents.map((e, index) => (
          <Text key={index}>{e.value} | {moment(e.date).format('DD MM YYYY')}</Text>
        ))
        }
        {orderedEvents.length === 0 &&
          <Text> No events for this category</Text>
        }
      </View>
    );

    return content;
  }

  render() {
    const { thresholdCategories, routeIndex } = this.props;
    const { activeSection } = this.state;
    let active = activeSection;

    if (routeIndex !== 0) {
      active = false;
    }

    return (
      <View >
        <HeaderWrapper title={i18n.t('CATEGORIES_THRESHOLD')} />
        <Accordion
          activeSection={active}
          onChange={this.onChange}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
          sections={thresholdCategories}
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
    routeIndex: state.navigation.index,
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
