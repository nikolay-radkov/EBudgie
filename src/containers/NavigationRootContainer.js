import React, { Component, PropTypes } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  BackAndroid,
  NavigationExperimental
} from 'react-native';
const {
  CardStack: NavigationCardStack
} = NavigationExperimental;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pushRoute, popRoute } from '../boundActionCreators/navigation';
import getRoute from '../getRoute';
import Header from './Header/Component';

class NavigationRootContainer extends Component {
  constructor(props) {
    super(props);

    this._renderScene = this._renderScene.bind(this);
    this._handleNavigate = this._handleNavigate.bind(this);
    this._handleBackAction = this._handleBackAction.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);

    setTimeout(() => SplashScreen.hide(), 1000);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
  }

  _renderHeader(sceneProps) {
    return (
      <Header
        {...sceneProps}
        />
    );
  }

  _renderScene({ scene }) {
    const {
      key,
    } = scene;

    return getRoute(key);
  }

  _handleBackAction() {
   const { drawer, navigation } = this.props;

    if (drawer && drawer._open) {
      drawer.close();
      return true;
    } else {
      if (navigation.index === 0) {
        return false;
      }

      this.props.popRoute();
      return true;
    }
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
        direction="horizontal"
        enableGestures={false}
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate}
        renderHeader={this._renderHeader}
        renderScene={this._renderScene}
        />
    );
  }
}

NavigationRootContainer.propTypes = {
  drawer: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  pushRoute: React.PropTypes.func.isRequired,
  popRoute: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    drawer: state.drawer.instance,
    navigation: state.navigation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: bindActionCreators(pushRoute, dispatch),
    popRoute: bindActionCreators(popRoute, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationRootContainer);
