import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../themes/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    elevation: 5,
    backgroundColor: colors.main,
  },
  indicator: {
    // backgroundColor: 'white',
    height: 3
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {

  }
});

class DetailedMonthReportContainer extends Component {
  state = {
    index: 0,
    routes: [
      {
        key: '1', title: 'First'
      },
      { key: '2', title: 'Second' },
      { key: '3', title: 'Third' },
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar
      indicatorStyle={styles.indicator}
      renderIcon={this._renderIcon}
      renderLabel={() => { }}
      style={styles.tabBar}  {...props} />;
  };

  _renderIcon = ({route}) => {
    let icon;

    switch (route.key) {
      case '1':
        icon = 'track-changes';
        break;
      case '2':
        icon = 'pie-chart';
        break;
      case '3':
        icon = 'trending-up';
        break;
    }
    return (
      <Icon
        color={colors.snow}
        name={icon}
        size={25}
        style={styles.icon}
      />
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <View style={[styles.page, { backgroundColor: '#ff4081' }]} />;
      case '2':
        return <View style={[styles.page, { backgroundColor: '#673ab7' }]} />;
      case '3':
        return <View style={[styles.page, { backgroundColor: '#002346' }]} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderLabel={this._renderLabel}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

DetailedMonthReportContainer.propTypes = {

};

function mapStateToProps(state) {
  return {

  };
}

export default connect(
  mapStateToProps
)(DetailedMonthReportContainer);
