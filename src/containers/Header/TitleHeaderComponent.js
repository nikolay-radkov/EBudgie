import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavigationExperimental } from 'react-native';

const {
  Header: NavigationHeader,
} = NavigationExperimental;

const TitleHeaderComponent = ({
  scene,
}) => {
  const { route } = scene;
  let title = '';

  if (route.key !== 'login') {
    switch (route.key) {
      case 'home':
        title = 'Home';
        break;
      case 'add_item':
        title = 'Add item';
        break;
      case 'add_category':
        title = 'Add category';
        break;
      case 'edit_salary':
        title = 'Monthly salary';
        break;
      case 'add_income':
        title = 'Add income';
        break;
      default:
       title = 'Not found';
    }
  }

  return (
    <NavigationHeader.Title textStyle={{
      color: '#FFFFFF'
    }}>
      {title}
    </NavigationHeader.Title>
  );
};

TitleHeaderComponent.propTypes = {
  scene: PropTypes.object,
};


export default connect(
  null
)(TitleHeaderComponent);
