import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actionCreators/addIncomeForm';
import EventForm from '../../components/Forms/EventForm';

class AddIncomeContainer extends Component {
  render() {
    const {
      addIncomeForm,
      setIncomeValue,
      setIncomeCategory,
      setIncomeItem,
      setIncomeDate,
      resetAddIncomeForm,
      addNewIncome,
    } = this.props;

    return (
      <EventForm
        eventForm={addIncomeForm}
        newEvent={addNewIncome}
        resetEventForm={resetAddIncomeForm}
        setEventCategory={setIncomeCategory}
        setEventDate={setIncomeDate}
        setEventItem={setIncomeItem}
        setEventValue={setIncomeValue}
        />
    );
  }
}

AddIncomeContainer.propTypes = {
  setIncomeValue: PropTypes.func.isRequired,
  setIncomeCategory: PropTypes.func.isRequired,
  setIncomeItem: PropTypes.func.isRequired,
  setIncomeDate: PropTypes.func.isRequired,
  resetAddIncomeForm: PropTypes.func.isRequired,
  addIncomeForm: PropTypes.object.isRequired,
  addNewIncome: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { addIncomeForm } = state;

  return {
    addIncomeForm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddIncomeContainer);
