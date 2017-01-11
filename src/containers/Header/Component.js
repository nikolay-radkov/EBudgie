import React, { Component, PropTypes } from 'react';
import { NavigationExperimental, TouchableHighlight, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { popRoute, pushRoute } from '../../boundActionCreators/navigation';

const NavigationHeaderBackButton = require('NavigationHeaderBackButton');

const {
  Header: NavigationHeader,
} = NavigationExperimental;

class Header extends Component {
  constructor(state) {
    super(state);

    this._back = this._back.bind(this);
    this._renderTitleComponent = this._renderTitleComponent.bind(this);
  }

  _back = () => {
    this.props.pop();
  }

  _renderTitleComponent = (props) => {
    return (
      <NavigationHeader.Title>
        {props.scene.route.title}
      </NavigationHeader.Title>
    );
  }

  _renderLeftComponent = (props) => {
    const { route } = this.props.scene;
    let onNavigateBack;

    if (route.key !== 'fhome') {
      onNavigateBack = this._back;
    }

    return (
      <NavigationHeaderBackButton onPress={onNavigateBack}>
        <Text>+</Text>
      </NavigationHeaderBackButton>
    );
  }

  _renderRightComponent = (props) => {
    return (
      <TouchableHighlight onPress={this._onAddItem}>
        <Text>+</Text>
      </TouchableHighlight>
    );
  }

  render() {
    let navigation;

    const { route } = this.props.scene;

    if (route.key === 'login') {
      navigation = null;
    } else {

      navigation = (
        <NavigationHeader
          style={{
            backgroundColor: '#023365'
          }}
          {...this.props}
          renderLeftComponent={this._renderLeftComponent}
          renderRightComponent={this._renderRightComponent}
          renderTitleComponent={this._renderTitleComponent}
          />
      );
    }

    return navigation;
  }
}

Header.propTypes = {
  scene: PropTypes.object.isRequired,
  pop: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    pop: bindActionCreators(popRoute, dispatch),
    push: bindActionCreators(pushRoute, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
