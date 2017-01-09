import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  BackAndroid,
  NavigationExperimental,
  Text,
} from 'react-native';
const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;
import { connect } from 'react-redux';

import { push, pop } from '../actions/navigationActions';
import getRoute from '../getRoute';

class NavigationRoot extends Component {
  constructor(props) {
    super(props);

    this._renderScene = this._renderScene.bind(this);
    this._handleNavigate = this._handleNavigate.bind(this);
    this._handleBackAction = this._handleBackAction.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);

    setTimeout(() => SplashScreen.hide(), 1000);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
  }

  _renderScene({ scene }) {
    const {
      index,
      key,
    } = scene;
    // render your scene based on the route (navigationState)
    return getRoute(key);
  }

  _handleBackAction() {
    if (this.props.navigation.index === 0) {
      return false;
    }
    this.props.popRoute();
    return true;
  }

  _handleNavigate(action) {
    switch (action && action.type) {
    case 'push':
      this.props.pushRoute(action.payload);
      return true;
    case 'back':
    case 'pop':
      return this._handleBackAction();
    default:
      return false;
    }
  }

  render() {
    return (
      <NavigationCardStack
        direction='vertical'
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate}
        renderScene={this._renderScene}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: route => dispatch(push(route)),
    popRoute: () => dispatch(pop()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationRoot);
