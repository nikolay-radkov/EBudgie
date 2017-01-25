import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Picker,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements';
import _ from 'lodash';
import dismissKeyboard from 'dismissKeyboard';
import UUIDGenerator from 'react-native-uuid-generator';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';
import * as actions from '../actionCreators/addExpenseForm';
import { popRoute } from '../boundActionCreators/navigation';

const styles = StyleSheet.create({

});

class AddExpenseContainer extends Component {
  constructor() {
    super();

    this.state = { date: "2016-05-15" }
    this.saveItem = this.saveItem.bind(this);
  }

  componentWillUnmount() {
    const { resetAddExpenseForm } = this.props;
    resetAddExpenseForm();
  }

  async saveItem() {
    const {
      addNewExpense,
      pop,
      categories,
      items
    } = this.props;

    const {
      categoryId,
      itemId,
      value,
      date
    } = this.props.addExpenseForm;

    const selectedCategoryId = categoryId ? categoryId : categories[0].id;
    const selectedItemId = itemId ? itemId : items[0].id;

    const uuid = await UUIDGenerator.getRandomUUID();
    addNewExpense({
      id: uuid,
      value: parseFloat(value),
      categoryId: selectedCategoryId,
      itemId: selectedItemId,
      date: moment(date),
    });

    pop();
  }

  render() {
    const {
      addExpenseForm,
      setExpenseValue,
      setExpenseCategory,
      setExpenseItem,
      categories,
      items,
      setExpenseDate,
    } = this.props;
    const today = moment().format();

    const categoryOptions = categories.map((category) => (
      <Picker.Item key={category.id} label={category.title} value={category.id} />
    ));
    const itemOptions = items.map((item) => (
      <Picker.Item key={item.id} label={item.name} value={item.id} />
    ));
    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[theme.container,]}>
          <FormLabel>Value</FormLabel>
          <FormInput
            keyboardType="numeric"
            onChangeText={setExpenseValue}
            onSubmitEditing={() => dismissKeyboard()} />
          <FormLabel>Category</FormLabel>
          <Picker
            onValueChange={setExpenseCategory}
            selectedValue={addExpenseForm.categoryId}>
            {categoryOptions}
          </Picker>
          <FormLabel>Item</FormLabel>
          <Picker
            onValueChange={setExpenseItem}
            selectedValue={addExpenseForm.itemId}>
            {itemOptions}
          </Picker>
          <FormLabel>Date</FormLabel>
          <DatePicker
            // style={{ width: 200 }}
            cancelBtnText="Cancel"
            confirmBtnText="Confirm"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            date={addExpenseForm.date}
            format="YYYY-MM-DD"
            mode="date"
            onDateChange={setExpenseDate}
            placeholder="select date"
            />
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

AddExpenseContainer.propTypes = {
  setExpenseValue: PropTypes.func.isRequired,
  setExpenseCategory: PropTypes.func.isRequired,
  setExpenseItem: PropTypes.func.isRequired,
  setExpenseDate: PropTypes.func.isRequired,
  resetAddExpenseForm: PropTypes.func.isRequired,
  addExpenseForm: PropTypes.object.isRequired,
  addNewExpense: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const {addExpenseForm, ebudgie} = state;

  return {
    addExpenseForm: addExpenseForm,
    categories: ebudgie.categories,
    items: _.filter(ebudgie.items, (item) => {
      return addExpenseForm.categoryId ?
        item.categoryId === addExpenseForm.categoryId
        : item.categoryId === ebudgie.categories[0].id;
    })
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
)(AddExpenseContainer);
