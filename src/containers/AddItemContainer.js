import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements';
import dismissKeyboard from 'dismissKeyboard';

import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';
import * as actions from '../actionCreators/addItemForm';
import { popRoute } from '../boundActionCreators/navigation';

const styles = StyleSheet.create({

});

class AddItemContainer extends Component {
  constructor() {
    super();

    this.saveItem = this.saveItem.bind(this);
  }

  componentWillUnmount() {
    const { resetAddItemForm } = this.props;
    resetAddItemForm();
  }

  saveItem() {
    const {
      addNewItem,
      pop
    } = this.props;

    const {
      name,
      category
    } = this.props.addItemForm;

    addNewItem({
      name,
      category
    });

    pop();
  }

  render() {
    const {
      setItemName,
      setItemCategory
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[theme.container,]}>
          <FormLabel>Name</FormLabel>
          <FormInput
            onChangeText={setItemName}
            onSubmitEditing={() => dismissKeyboard()} />
          <FormLabel>Category</FormLabel>
          <FormInput
            onChangeText={setItemCategory}
            onSubmitEditing={() => dismissKeyboard()} />
          <View style={{
            flexDirection: 'row-reverse'
          }}>
            <Button
              backgroundColor={colors.main}
              borderRadius={10}
              icon={{ name: 'save' }}
              iconRight
              onPress={this.saveItem}
              title="Save" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

AddItemContainer.propTypes = {
  setItemName: PropTypes.func.isRequired,
  setItemCategory: PropTypes.func.isRequired,
  openCategoryPicker: PropTypes.func.isRequired,
  closeCategoryPicker: PropTypes.func.isRequired,
  resetAddItemForm: PropTypes.func.isRequired,
  addItemForm: PropTypes.object.isRequired,
  addNewItem: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired
};


function mapStateToProps(state) {
  return {
    addItemForm: state.addItemForm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(actions, dispatch),
    pop: bindActionCreators(popRoute, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItemContainer);
