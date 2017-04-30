import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import HeaderButton from '../../components/Header/HeaderButton';
import { pushRoute, popRoute } from '../../boundActionCreators/navigation';
import { deleteExpense, resetEditExpenseForm } from '../../actionCreators/editExpenseForm';
import { deleteIncome, resetEditIncomeForm } from '../../actionCreators/editIncomeForm';
import { deleteCategory, resetEditCategoryForm } from '../../actionCreators/editCategoryForm';
import { deleteItem, resetEditItemForm } from '../../actionCreators/editItemForm';
import colors from '../../themes/Colors';

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
  removeItem,
  resetEditItem,
  editItemFormId,
  showItemDeleteButton,
}) => {
  const { route } = scene;
  let rightButton = null;
  let onRightButtonPress;

  if (route.key !== 'login') {
    switch (route.key) {
      case 'home':
        onRightButtonPress = () => push({
          key: 'notifications'
        });
        rightButton = (
          <HeaderButton
            iconProps={{
              name: 'notifications',
              color: colors.snow
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
              color: colors.snow
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
              color: colors.snow
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
              color: colors.snow
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
              color: colors.snow
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
                color: colors.snow
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
              color: colors.snow
            }}
            onPress={onRightButtonPress}
          />
        );
        break;
      case 'edit_item':
        if (showItemDeleteButton) {
          onRightButtonPress = () => {
            removeItem(editItemFormId);
            pop();
            resetEditItem();
          };
          rightButton = (
            <HeaderButton
              iconProps={{
                name: 'delete-forever',
                color: colors.snow
              }}
              onPress={onRightButtonPress}
            />
          );
        }
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
  removeItem: PropTypes.func.isRequired,
  resetEditItem: PropTypes.func.isRequired,
  editItemFormId: PropTypes.string,
  showItemDeleteButton: PropTypes.bool,
};

function getItemsForGategoryId(items, categoryId) {
  return _.filter(items, (i) => i.categoryId === categoryId);
}

function getEventsForItemId(incomes, expenses, itemId) {
  return _.filter(incomes, (i) => i.itemId === itemId)
    .concat(_.filter(expenses, (e) => e.itemId === itemId));
}

function mapStateToProps(state) {
  const editCategoryFormId = _.get(state.editCategoryForm, 'id', '');
  let showCategoryDeleteButton = false;

  if (editCategoryFormId) {
    const items = getItemsForGategoryId(state.ebudgie.items, editCategoryFormId);
    showCategoryDeleteButton = items.length === 0;
  }

  const editItemFormId = _.get(state.editItemForm, 'id', '');
  let showItemDeleteButton = false;

  if (editItemFormId) {
    const items = getEventsForItemId(state.ebudgie.incomes, state.ebudgie.expenses, editItemFormId);
    showItemDeleteButton = items.length === 0;
  }

  return {
    editExpenseFormId: _.get(state.editExpenseForm, 'id', ''),
    editIncomeFormId: _.get(state.editIncomeForm, 'id', ''),
    editCategoryFormId,
    showCategoryDeleteButton,
    editItemFormId,
    showItemDeleteButton,
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
    removeItem: deleteItem,
    resetEditItem: resetEditItemForm,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightHeaderComponent);
