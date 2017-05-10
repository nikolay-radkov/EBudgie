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
import metrics from '../../themes/Metrics';

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

  _getElevationValue = (route) => {
    let elevation = metrics.elevation;

    switch (route.key) {
      case 'detailed_report':
        elevation = 0;
        break;
    }

    return elevation;
  }

  render() {
    let navigation;

    const { route } = this.props.scene;

    const elevation = this._getElevationValue(route);

    if (route.key === 'login' || route.key === 'intro') {
      navigation = null;
    } else {
      navigation = (
        <NavigationHeader
          style={{
            backgroundColor: '#023365',
            paddingTop: 20,
            elevation: elevation,
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
