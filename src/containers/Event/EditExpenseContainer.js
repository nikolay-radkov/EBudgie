import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actionCreators/editExpenseForm';
import EventForm from '../../components/Forms/EventForm';

class EditExpenseContainer extends Component {
  render() {
    const {
      editExpenseForm,
      editExpenseValue,
      editExpenseCategory,
      editExpenseItem,
      editExpenseDate,
      resetEditExpenseForm,
      editExpense,
    } = this.props;

    return (
      <EventForm
        buttonIcon="edit"
        buttonText="Edit"
        eventForm={editExpenseForm}
        newEvent={editExpense}
        resetEventForm={resetEditExpenseForm}
        setEventCategory={editExpenseCategory}
        setEventDate={editExpenseDate}
        setEventItem={editExpenseItem}
        setEventValue={editExpenseValue}
      />
    );
  }
}

EditExpenseContainer.propTypes = {
  editExpenseValue: PropTypes.func.isRequired,
  editExpenseCategory: PropTypes.func.isRequired,
  editExpenseItem: PropTypes.func.isRequired,
  editExpenseDate: PropTypes.func.isRequired,
  resetEditExpenseForm: PropTypes.func.isRequired,
  editExpenseForm: PropTypes.object.isRequired,
  editExpense: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { editExpenseForm } = state;

  return {
    editExpenseForm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditExpenseContainer);
