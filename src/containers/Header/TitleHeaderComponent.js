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
      case 'add_expense':
        title = 'Add expense';
        break;
      case 'reports':
        title = 'Reports';
        break;
      case 'settings':
        title = 'Settings';
        break;
      case 'detailed_report':
        title = 'Detailed Reports';
        break;
      case 'report_downloader':
        title = 'Report downloader';
        break;
      case 'edit_expense':
        title = 'Edit expense';
        break;
      case 'edit_income':
        title = 'Edit income';
        break;
      case 'categories':
        title = 'Categories';
        break;
      case 'edit_category':
        title = 'Edit category';
        break;
      case 'items':
        title = 'Items';
        break;
      case 'edit_item':
        title = 'Edit item';
        break;
      default:
        title = 'Not found';
    }
  }

  return (
    <NavigationHeader.Title textStyle={{
      color: '#FFFFFF',
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
