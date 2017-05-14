import React, { Component, PropTypes } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  BackAndroid,
  NavigationExperimental,
  StyleSheet,
  AsyncStorage
} from 'react-native';
const {
  CardStack: NavigationCardStack
} = NavigationExperimental;
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { pushRoute, popRoute, replaceRoute } from '../boundActionCreators/navigation';
import { createNewPouchDB } from '../boundActionCreators/pouchdb';
import getRoute from '../getRoute';
import CustomHeader from './Header/CustomHeader';

import colors from '../themes/Colors';
import metrics from '../themes/Metrics';

const styles = StyleSheet.create({
  navigationStyles: {
    backgroundColor: colors.main,
    paddingTop: metrics.statusBarPadding
  }
});

class NavigationRootContainer extends Component {
  constructor(props) {
    super(props);

    this._renderScene = this._renderScene.bind(this);
    this._handleNavigate = this._handleNavigate.bind(this);
    this._handleBackAction = this._handleBackAction.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this.goToHome = this.goToHome.bind(this);
  }

  async componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction);

    const isUserLogged = await AsyncStorage.getItem('isLogged');

    if (isUserLogged) {
      const dbName = await AsyncStorage.getItem('dbName');
      const docId = await AsyncStorage.getItem('docId');
      await this.goToHome(dbName, docId);
      SplashScreen.hide();
      return;
    }

    const didIntro = JSON.parse(await AsyncStorage.getItem('didIntro'));

    if (!didIntro) {
      return this.props.replace({ key: 'intro' });
    }
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction);
  }

  async goToHome(dbName = 'unauthorized') {
    await this.props.createPouchDB(dbName);
    this.props.replace({ key: 'home' });
  }

  _renderHeader(sceneProps) {
    return (
      <CustomHeader
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
    const { drawer, navigation, pop } = this.props;

    if (drawer && drawer._open) {
      drawer.close();
      return true;
    } else {
      if (navigation.index === 0) {
        return false;
      }

      pop();
      return true;
    }
  }

  _handleNavigate(action) {
    const { push } = this.props;
    switch (action && action.type) {
      case 'push':
        push(action.payload);
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
        style={styles.navigationStyles}
      />
    );
  }
}

NavigationRootContainer.propTypes = {
  drawer: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  push: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  replace: React.PropTypes.func.isRequired,
  createPouchDB: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    drawer: state.drawer.instance,
    navigation: state.navigation,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push: pushRoute,
    pop: popRoute,
    replace: replaceRoute,
    createPouchDB: createNewPouchDB
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationRootContainer);
