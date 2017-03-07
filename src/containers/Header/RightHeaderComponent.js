import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HeaderButton from '../../components/Header/HeaderButton';
import { pushRoute, popRoute } from '../../boundActionCreators/navigation';
import { deleteExpense, resetEditExpenseForm } from '../../actionCreators/editExpenseForm';

const RightHeaderComponent = ({
  scene,
  push,
  removeExpense,
  editExpenseFormId,
  pop,
  resetEditExpense,
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
};

function mapStateToProps(state) {
  return {
    editExpenseFormId: state.editExpenseForm && state.editExpenseForm.id,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push: pushRoute,
    pop: popRoute,
    removeExpense: deleteExpense,
    resetEditExpense: resetEditExpenseForm
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightHeaderComponent);
