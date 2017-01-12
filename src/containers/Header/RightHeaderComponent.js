import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HeaderButton from '../../components/Header/HeaderButton';
import { pushRoute } from '../../boundActionCreators/navigation';

const RightHeaderComponent = ({
  scene,
  push
}) => {
  const { route } = scene;
  let rightButton = null;
  let onRightButtonPress;

  if (route.key !== 'login') {
    switch (route.key) {
      case 'home':
        onRightButtonPress = () => push({
          key: 'settings'
        });
        rightButton = (
          <HeaderButton
            iconProps={{
              name: 'settings',
              color: '#FFFFFF'
            }}
            onPress={onRightButtonPress}
            />
        );
        break;
    }
  }

  return rightButton;
};

RightHeaderComponent.propTypes = {
  scene: PropTypes.object,
  push: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ push: pushRoute }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(RightHeaderComponent);
