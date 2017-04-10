import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actionCreators/editCategoryForm';
import CategoryForm from '../../components/Forms/CategoryForm';

class EditCategoryContainer extends Component {
  render() {
    const {
      editCategoryForm,
      editCategoryTitle,
      editCategoryIcon,
      editCategoryColor,
      resetEditCategoryForm,
      editCategory,
    } = this.props;

    return (
      <CategoryForm
        buttonIcon="edit"
        buttonText="Edit"
        categoryForm={editCategoryForm}
        newCategory={editCategory}
        resetCategoryForm={resetEditCategoryForm}
        setCategoryColor={editCategoryColor}
        setCategoryIcon={editCategoryIcon}
        setCategoryTitle={editCategoryTitle}
      />
    );
  }
}

EditCategoryContainer.propTypes = {
  editCategoryTitle: PropTypes.func.isRequired,
  editCategoryIcon: PropTypes.func.isRequired,
  editCategoryColor: PropTypes.func.isRequired,
  resetEditCategoryForm: PropTypes.func.isRequired,
  editCategoryForm: PropTypes.object.isRequired,
  editCategory: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { editCategoryForm } = state;

  return {
    editCategoryForm,
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
)(EditCategoryContainer);
