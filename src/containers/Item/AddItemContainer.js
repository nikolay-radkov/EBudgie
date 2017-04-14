import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ItemForm from '../../components/Forms/ItemForm';
import * as actions from '../../actionCreators/addItemForm';

class AddItemContainer extends Component {
  render() {
    const {
      addItemForm,
      addNewItem,
      setItemName,
      setItemCategory,
      resetAddItemForm,
    } = this.props;

    return (
      <ItemForm
        buttonIcon="save"
        buttonText="Save"
        itemForm={addItemForm}
        newItem={addNewItem}
        resetItemForm={resetAddItemForm}
        setItemCategory={setItemCategory}
        setItemName={setItemName}
      />
    );
  }
}

AddItemContainer.propTypes = {
  setItemName: PropTypes.func.isRequired,
  setItemCategory: PropTypes.func.isRequired,
  resetAddItemForm: PropTypes.func.isRequired,
  addItemForm: PropTypes.object.isRequired,
  addNewItem: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    addItemForm: state.addItemForm,
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
)(AddItemContainer);
