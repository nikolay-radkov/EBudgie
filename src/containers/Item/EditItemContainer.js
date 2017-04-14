import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actionCreators/editItemForm';
import ItemForm from '../../components/Forms/ItemForm';

class EditItemContainer extends Component {
  render() {
    const {
      editItemForm,
      editItemName,
      editItemCategory,
      resetEditItemForm,
      editItem,
    } = this.props;

    return (
      <ItemForm
        buttonIcon="edit"
        buttonText="Edit"
        itemForm={editItemForm}
        newItem={editItem}
        resetItemForm={resetEditItemForm}
        setItemCategory={editItemCategory}
        setItemName={editItemName}
      />
    );
  }
}

EditItemContainer.propTypes = {
  editItemName: PropTypes.func.isRequired,
  editItemCategory: PropTypes.func.isRequired,
  resetEditItemForm: PropTypes.func.isRequired,
  editItemForm: PropTypes.object.isRequired,
  editItem: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { editItemForm } = state;

  return {
    editItemForm,
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
)(EditItemContainer);
