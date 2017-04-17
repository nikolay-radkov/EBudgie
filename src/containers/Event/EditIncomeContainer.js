import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import i18n from 'react-native-i18n';

import * as actions from '../../actionCreators/editIncomeForm';
import EventForm from '../../components/Forms/EventForm';

class EditIncomeContainer extends Component {
  render() {
    const {
      editIncomeForm,
      editIncomeValue,
      editIncomeCategory,
      editIncomeItem,
      editIncomeDate,
      resetEditIncomeForm,
      editIncome,
    } = this.props;

    return (
      <EventForm
        buttonIcon="edit"
        buttonText={i18n.t('EDIT')}
        eventForm={editIncomeForm}
        newEvent={editIncome}
        resetEventForm={resetEditIncomeForm}
        setEventCategory={editIncomeCategory}
        setEventDate={editIncomeDate}
        setEventItem={editIncomeItem}
        setEventValue={editIncomeValue}
      />
    );
  }
}

EditIncomeContainer.propTypes = {
  editIncomeValue: PropTypes.func.isRequired,
  editIncomeCategory: PropTypes.func.isRequired,
  editIncomeItem: PropTypes.func.isRequired,
  editIncomeDate: PropTypes.func.isRequired,
  resetEditIncomeForm: PropTypes.func.isRequired,
  editIncomeForm: PropTypes.object.isRequired,
  editIncome: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { editIncomeForm } = state;

  return {
    editIncomeForm,
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
)(EditIncomeContainer);
