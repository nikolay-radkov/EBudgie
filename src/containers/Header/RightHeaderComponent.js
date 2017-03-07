import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HeaderButton from '../../components/Header/HeaderButton';
import { pushRoute, popRoute } from '../../boundActionCreators/navigation';
import { deleteExpense, resetEditExpenseForm } from '../../actionCreators/editExpenseForm';
import { deleteIncome, resetEditIncomeForm } from '../../actionCreators/editIncomeForm';

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
        }
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
        }
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
};

function mapStateToProps(state) {
  return {
    editExpenseFormId: state.editExpenseForm && state.editExpenseForm.id,
    editIncomeFormId: state.editIncomeForm && state.editIncomeForm.id,
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
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightHeaderComponent);
