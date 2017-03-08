import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actionCreators/addExpenseForm';
import EventForm from '../../components/Forms/EventForm';

class AddExpenseContainer extends Component {
  render() {
    const {
      addExpenseForm,
      setExpenseValue,
      setExpenseCategory,
      setExpenseItem,
      setExpenseDate,
      resetAddExpenseForm,
      addNewExpense,
    } = this.props;

    return (
      <EventForm
        eventForm={addExpenseForm}
        newEvent={addNewExpense}
        resetEventForm={resetAddExpenseForm}
        setEventCategory={setExpenseCategory}
        setEventDate={setExpenseDate}
        setEventItem={setExpenseItem}
        setEventValue={setExpenseValue}
      />
    );
  }
}

AddExpenseContainer.propTypes = {
  setExpenseValue: PropTypes.func.isRequired,
  setExpenseCategory: PropTypes.func.isRequired,
  setExpenseItem: PropTypes.func.isRequired,
  setExpenseDate: PropTypes.func.isRequired,
  resetAddExpenseForm: PropTypes.func.isRequired,
  addExpenseForm: PropTypes.object.isRequired,
  addNewExpense: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { addExpenseForm } = state;

  return {
    addExpenseForm,
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
)(AddExpenseContainer);
