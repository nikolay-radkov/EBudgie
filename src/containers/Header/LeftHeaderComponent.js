import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HeaderButton from '../../components/Header/HeaderButton';
import { pushRoute, popRoute } from '../../boundActionCreators/navigation';
import colors from '../../themes/Colors';

const toggleDrawer = (drawer) => {
  if (drawer) {
    !drawer._open ? drawer.open() : drawer.close();
  }
};

const LeftHeaderComponent = ({
  scene,
  push,
  pop,
  drawer
}) => {
  const { route } = scene;
  let leftButton = null;
  let onLeftButtonPress;

  if (route.key !== 'login') {
    switch (route.key) {
      case 'home':
        onLeftButtonPress = () => toggleDrawer(drawer);
        leftButton = (
          <HeaderButton
            iconProps={{
              name: 'menu',
              color: colors.snow
            }}
            onPress={onLeftButtonPress}
          />
        );
        break;
      case 'add_item':
        onLeftButtonPress = pop;
        leftButton = (
          <HeaderButton
            iconProps={{
              name: 'arrow-back',
              color: colors.snow
            }}
            onPress={onLeftButtonPress}
          />
        );
        break;
      default:
        onLeftButtonPress = pop;
        leftButton = (
          <HeaderButton
            iconProps={{
              name: 'arrow-back',
              color: colors.snow
            }}
            onPress={onLeftButtonPress}
          />
        );
    }
  }

  return leftButton;
};

LeftHeaderComponent.propTypes = {
  scene: PropTypes.object,
  drawer: PropTypes.object,
  push: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    drawer: state.drawer.instance
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push: pushRoute,
    pop: popRoute
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftHeaderComponent);
