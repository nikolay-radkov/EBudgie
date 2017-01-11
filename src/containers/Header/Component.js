import React, { Component, PropTypes } from 'react';
import {
  NavigationExperimental
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeaderButton from '../../components/Header/HeaderButton';

import { popRoute, pushRoute } from '../../boundActionCreators/navigation';


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
      <NavigationHeader.Title textStyle={{
        color: '#FFFFFF'
      }}>
        {props.scene.route.title}
      </NavigationHeader.Title>
    );
  }

  _renderLeftComponent = (props) => {
    const { route } = this.props.scene;
    let leftButton;
    let onLeftButtonPress;

    if (route.key !== 'login' && route.key !== 'home') {
      switch (route.key) {
        case 'add_item':
          onLeftButtonPress = this._back;
          leftButton = (
            <HeaderButton
              iconProps={{
                name: 'arrow-back',
                color: '#FFFFFF'
              }}
              onPress={onLeftButtonPress}
              />
          );
          break;
      }
    }

    return leftButton;
  }

  _renderRightComponent = (props) => {
    const { route } = this.props.scene;
    let rightButton;
    let onRightButtonPress;

    if (route.key !== 'login') {
      switch (route.key) {
        case 'home':
          onRightButtonPress = () => this.props.push({
            key: 'add_item',
            title: 'New item'
          });
          rightButton = (
            <HeaderButton
              iconProps={{
                name: 'add',
                color: '#FFFFFF'
              }}
              onPress={onRightButtonPress}
              />
          );
          break;
      }

      return rightButton;
    }
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
  push: PropTypes.func.isRequired
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
