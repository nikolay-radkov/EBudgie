import React, { Component, PropTypes } from 'react';
import {
  NavigationExperimental
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { popRoute, pushRoute } from '../../boundActionCreators/navigation';
import RightHeaderComponent from './RightHeaderComponent';
import LeftHeaderComponent from './LeftHeaderComponent';
import TitleHeaderComponent from './TitleHeaderComponent';

const {
  Header: NavigationHeader,
} = NavigationExperimental;

class CustomHeader extends Component {
  constructor(state) {
    super(state);

    this._renderTitleComponent = this._renderTitleComponent.bind(this);
  }

  _renderTitleComponent = (props) => {
    return <TitleHeaderComponent {...props} />;
  }

  _renderLeftComponent = (props) => {
    return <LeftHeaderComponent {...props} />;
  }

  _renderRightComponent = (props) => {
    return <RightHeaderComponent {...props} />;
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
            backgroundColor: '#023365',
            paddingTop: 20
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

CustomHeader.propTypes = {
  scene: PropTypes.object.isRequired,
  pop: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    pop: popRoute,
    push: pushRoute
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomHeader);
