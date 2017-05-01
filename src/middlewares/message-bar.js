import React from 'react';
import i18n from 'react-native-i18n';
import { MessageBarManager } from 'react-native-message-bar';
import { StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';

import {
  NEW_ITEM,
  NEW_CATEGORY,
  EDIT_SALARY,
  NEW_INCOME,
  NEW_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  EDIT_INCOME,
  DELETE_INCOME,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  EDIT_ITEM,
  DELETE_ITEM,
  NEW_THRESHOLD,
} from '../constants/ActionTypes';

const messageBar = store => next => async action => {
  const result = next(action);
  let shouldShowMessage = true;
  const options = {
    title: 'Your alert title goes here',
    alertType: 'success',
    viewTopInset: StatusBar.currentHeight,
    avatar: (
      <Icon
        color="white"
        name="warning"
        size={50}
      />
    )
  };

  switch (action.type) {
    case NEW_ITEM:
      options.title = 'New item added';
      break;
    case NEW_CATEGORY:
      options.title = 'New category added';
      break;
    case EDIT_SALARY:
      options.title = 'Salary updated';
      break;
    case NEW_INCOME:
      options.title = 'New income added';
      break;
    case NEW_EXPENSE:
      options.title = 'New expense added';
      break;
    case NEW_THRESHOLD:
      options.title = 'New threshold added';
      break;
    case EDIT_INCOME:
      options.title = 'Income updated';
      break;
    case EDIT_EXPENSE:
      options.title = 'Expense updated';
      break;
    case EDIT_CATEGORY:
      options.title = 'Category updated';
      break;
    case EDIT_ITEM:
      options.title = 'Item updated';
      break;
    case DELETE_INCOME:
      options.title = 'Income deleted';
      break;
    case DELETE_EXPENSE:
      options.title = 'Expense deleted';
      break;
    case DELETE_CATEGORY:
      options.title = 'Category deleted';
      break;
    case DELETE_ITEM:
      options.title = 'Item deleted';
      break;

    default:
      shouldShowMessage = false;
  }

  if (shouldShowMessage) {
    MessageBarManager.showAlert(options);
  }

  return result;
};


export default messageBar;
