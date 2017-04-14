import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import HeaderButton from '../../components/Header/HeaderButton';
import { pushRoute, popRoute } from '../../boundActionCreators/navigation';
import { deleteExpense, resetEditExpenseForm } from '../../actionCreators/editExpenseForm';
import { deleteIncome, resetEditIncomeForm } from '../../actionCreators/editIncomeForm';
import { deleteCategory, resetEditCategoryForm } from '../../actionCreators/editCategoryForm';

const RightHeaderComponent = ({
  scene,
  push,
  removeExpense,
  editExpenseFormId,
  pop,
  resetEditExpense,
  removeIncome,
  editIncomeFormId,
  resetEditIncome,
  removeCategory,
  resetEditCategory,
  editCategoryFormId,
  showCategoryDeleteButton,
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
      case 'reports':
        onRightButtonPress = () => push({
          key: 'report_downloader'
        });
        rightButton = (
          <HeaderButton
            iconProps={{
              name: 'file-download',
              color: '#FFFFFF'
            }}
            onPress={onRightButtonPress}
          />
        );
        break;
      case 'edit_expense':
        onRightButtonPress = () => {
          removeExpense(editExpenseFormId);
          pop();
          resetEditExpense();
        };
        rightButton = (
          <HeaderButton
            iconProps={{
              name: 'delete-forever',
              color: '#FFFFFF'
            }}
            onPress={onRightButtonPress}
          />
        );
        break;
      case 'edit_income':
        onRightButtonPress = () => {
          removeIncome(editIncomeFormId);
          pop();
          resetEditIncome();
        };
        rightButton = (
          <HeaderButton
            iconProps={{
              name: 'delete-forever',
              color: '#FFFFFF'
            }}
            onPress={onRightButtonPress}
          />
        );
        break;
      case 'categories':
        onRightButtonPress = () => push({
          key: 'add_category'
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
      case 'edit_category':
        if (showCategoryDeleteButton) {
          onRightButtonPress = () => {
            removeCategory(editCategoryFormId);
            pop();
            resetEditCategory();
          };
          rightButton = (
            <HeaderButton
              iconProps={{
                name: 'delete-forever',
                color: '#FFFFFF'
              }}
              onPress={onRightButtonPress}
            />
          );
        }
        break;
      case 'items':
        onRightButtonPress = () => push({
          key: 'add_item'
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
  }

  return rightButton;
};

RightHeaderComponent.propTypes = {
  scene: PropTypes.object,
  push: PropTypes.func.isRequired,
  removeExpense: PropTypes.func.isRequired,
  editExpenseFormId: PropTypes.string,
  pop: PropTypes.func.isRequired,
  resetEditExpense: PropTypes.func.isRequired,
  removeIncome: PropTypes.func.isRequired,
  editIncomeFormId: PropTypes.string,
  resetEditIncome: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired,
  resetEditCategory: PropTypes.func.isRequired,
  editCategoryFormId: PropTypes.string,
  showCategoryDeleteButton: PropTypes.bool,
};

function getItemsForGategoryId(items, categoryId) {
  return _.filter(items, (i) => i.categoryId === categoryId);
}

function mapStateToProps(state) {
  const editCategoryFormId = _.get(state.editCategoryForm, 'id', '');
  let showCategoryDeleteButton = false;

  if (editCategoryFormId) {
    const items = getItemsForGategoryId(state.ebudgie.items, editCategoryFormId);
    showCategoryDeleteButton = items.length === 0;
  }

  return {
    editExpenseFormId: _.get(state.editExpenseForm, 'id', ''),
    editIncomeFormId: _.get(state.editIncomeForm, 'id', ''),
    editCategoryFormId,
    showCategoryDeleteButton,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push: pushRoute,
    pop: popRoute,
    removeExpense: deleteExpense,
    resetEditExpense: resetEditExpenseForm,
    removeIncome: deleteIncome,
    resetEditIncome: resetEditIncomeForm,
    removeCategory: deleteCategory,
    resetEditCategory: resetEditCategoryForm,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightHeaderComponent);
