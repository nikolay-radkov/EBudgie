import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Picker,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements';
import dismissKeyboard from 'dismissKeyboard';
import UUIDGenerator from 'react-native-uuid-generator';

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

  async saveItem() {
    const {
      addNewItem,
      pop,
      categories
    } = this.props;

    const {
      name,
      categoryId
    } = this.props.addItemForm;

    const selectedCategoryId = categoryId ? categoryId : categories[0].id;

    const uuid = await UUIDGenerator.getRandomUUID();
    addNewItem({
      id: uuid,
      name,
      categoryId: selectedCategoryId
    });

    pop();
  }

  render() {
    const {
      addItemForm,
      setItemName,
      setItemCategory,
      categories
    } = this.props;

    const categoryOptions = categories.map((category) => (
      <Picker.Item key={category.id} label={category.title} value={category.id} />
    ));
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[theme.container,]}>
          <FormLabel>Name</FormLabel>
          <FormInput
            onChangeText={setItemName}
            onSubmitEditing={() => dismissKeyboard()} />
          <FormLabel>Category</FormLabel>
          <Picker
            onValueChange={setItemCategory}
            selectedValue={addItemForm.categoryId}>
            {categoryOptions}
          </Picker>
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
  pop: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    addItemForm: state.addItemForm,
    categories: state.ebudgie.categories
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
