import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import i18n from 'react-native-i18n';

import * as actions from '../../actionCreators/addThresholdForm';
import ThresholdForm from '../../components/Forms/ThresholdForm';

class AddThresholdContainer extends Component {
  render() {
    const {
      addCategoryThreshold,
      removeCategoryThreshold,
      setGlobalThreshold,
      resetAddThresholdForm,
      addNewThreshold,
      addThresholdForm
    } = this.props;

    return (
      <ThresholdForm
        addCategoryThreshold={addCategoryThreshold}
        buttonIcon="save"
        buttonText={i18n.t('SAVE')}
        newThreshold={addNewThreshold}
        removeCategoryThreshold={removeCategoryThreshold}
        resetThresholdForm={resetAddThresholdForm}
        setGlobalThreshold={setGlobalThreshold}
        thresholdForm={addThresholdForm}
      />
    );
  }
}

AddThresholdContainer.propTypes = {
  addCategoryThreshold: PropTypes.func.isRequired,
  removeCategoryThreshold: PropTypes.func.isRequired,
  setGlobalThreshold: PropTypes.func.isRequired,
  resetAddThresholdForm: PropTypes.func.isRequired,
  addNewThreshold: PropTypes.func.isRequired,
  addThresholdForm: PropTypes.object.isRequired,

};

function mapStateToProps(state) {
  const { addThresholdForm } = state;

  return {
    addThresholdForm,
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
)(AddThresholdContainer);
