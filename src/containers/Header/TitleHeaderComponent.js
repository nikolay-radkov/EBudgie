import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { NavigationExperimental } from 'react-native';
import i18n from 'react-native-i18n';

import colors from '../../themes/Colors';

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
        title = i18n.t('HOME');
        break;
      case 'add_item':
        title = i18n.t('ADD_ITEM');
        break;
      case 'add_category':
        title = i18n.t('ADD_CATEGORY');
        break;
      case 'edit_salary':
        title = i18n.t('MONTHLY_SALARY');
        break;
      case 'add_income':
        title = i18n.t('ADD_INCOME');
        break;
      case 'add_expense':
        title = i18n.t('ADD_EXPENSE');
        break;
      case 'reports':
        title = i18n.t('REPORTS');
        break;
      case 'settings':
        title = i18n.t('SETTINGS');
        break;
      case 'detailed_report':
        title = i18n.t('DETAILED_REPORTS');
        break;
      case 'report_downloader':
        title = i18n.t('REPORT_DOWNLOADER');
        break;
      case 'edit_expense':
        title = i18n.t('EDIT_EXPENSE');
        break;
      case 'edit_income':
        title = i18n.t('EDIT_INCOME');
        break;
      case 'categories':
        title = i18n.t('CATEGORIES');
        break;
      case 'edit_category':
        title = i18n.t('EDIT_CATEGORY');
        break;
      case 'items':
        title = i18n.t('ITEMS');
        break;
      case 'edit_item':
        title = i18n.t('EDIT_ITEM');
        break;
      default:
        title = i18n.t('NOT_FOUND');
    }
  }

  return (
    <NavigationHeader.Title textStyle={{
      color: colors.snow,
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
