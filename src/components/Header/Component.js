import React, { Component } from 'react';
import { NavigationExperimental, TouchableHighlight, Text } from 'react-native';

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
    this.props.popRoute();
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

    return (<NavigationHeaderBackButton onPress={onNavigateBack}>
      <Text>+</Text>
    </NavigationHeaderBackButton>)
    // return (<NavigationHeader.NavigationHeaderBackButton>a</NavigationHeader.NavigationHeaderBackButton>)
  }

  _renderRightComponent = (props) => {
    return (<TouchableHighlight onPress={this._onAddItem}>
      <Text>+</Text>
    </TouchableHighlight>)
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
            backgroundColor: "#023365"
          }}
          {...this.props}
          renderTitleComponent={this._renderTitleComponent}
          renderLeftComponent={this._renderLeftComponent}
          renderRightComponent={this._renderRightComponent}
          />
      );
    }

    return navigation;
  }
}

export default Header;
