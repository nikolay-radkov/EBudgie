import React, { Component } from 'react';
import { BackAndroid, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RadarChart from './RadarChart';
import PieChart from './PieChart';
import StackedBarChart from './StackedBarChart';

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
      { key: '1', title: 'First' },
      { key: '2', title: 'Second' },
      { key: '3', title: 'Third' },
    ],
    visitedRoutes: [0]
  };

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
  }

  _handleBackAction = () => {
    const { visitedRoutes } = this.state;
    visitedRoutes.pop();

    if (visitedRoutes.length !== 0) {

      this.setState({
        index: visitedRoutes[visitedRoutes.length - 1],
        visitedRoutes
      });
      return true;
    }
  }

  _handleChangeTab = (index) => {
    const { visitedRoutes } = this.state;

    visitedRoutes.push(index);
    this.setState({
      visitedRoutes,
      index
    });
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
        return <RadarChart />;
      case '2':
        return <PieChart />;
      case '3':
        return <StackedBarChart />;
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
