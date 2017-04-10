import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actionCreators/addCategoryForm';
import CategoryForm from '../../components/Forms/CategoryForm';

class AddCategoryContainer extends Component {
  render() {
    const {
      addCategoryForm,
      addNewCategory,
      setCategoryColor,
      setCategoryTitle,
      setCategoryIcon,
      resetAddCategoryForm,
    } = this.props;

    return (
      <CategoryForm
        buttonIcon="save"
        buttonText="Save"
        categoryForm={addCategoryForm}
        newCategory={addNewCategory}
        resetCategoryForm={resetAddCategoryForm}
        setCategoryColor={setCategoryColor}
        setCategoryIcon={setCategoryIcon}
        setCategoryTitle={setCategoryTitle}
      />
    );
  }
}

AddCategoryContainer.propTypes = {
  setCategoryTitle: PropTypes.func.isRequired,
  setCategoryColor: PropTypes.func.isRequired,
  setCategoryIcon: PropTypes.func.isRequired,
  resetAddCategoryForm: PropTypes.func.isRequired,
  addNewCategory: PropTypes.func.isRequired,
  addCategoryForm: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { addCategoryForm } = state;

  return {
    addCategoryForm,
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
)(AddCategoryContainer);
