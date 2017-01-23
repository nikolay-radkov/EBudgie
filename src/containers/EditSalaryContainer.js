import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
} from 'react-native-elements';
import dismissKeyboard from 'dismissKeyboard';

import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';
import * as actions from '../actionCreators/editSalaryForm';
import { popRoute } from '../boundActionCreators/navigation';

const styles = StyleSheet.create({

});

class EditSalary extends Component {
  constructor() {
    super();

    this.saveItem = this.saveItem.bind(this);
  }

  componentWillUnmount() {
    const { resetEditSalaryForm } = this.props;
    resetEditSalaryForm();
  }

  async saveItem() {
    const {
      editSalary,
      pop,
    } = this.props;

    const {
      value
    } = this.props.editSalaryForm;

    editSalary({
      value,
      date: new Date()
    });

    pop();
  }

  render() {
    const {
      setSalaryValue,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[theme.container,]}>
          <FormLabel>Value</FormLabel>
          <FormInput
            keyboardType="numeric"
            onChangeText={setSalaryValue}
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

EditSalary.propTypes = {
  setSalaryValue: PropTypes.func.isRequired,
  resetEditSalaryForm: PropTypes.func.isRequired,
  editSalaryForm: PropTypes.object.isRequired,
  editSalary: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    editSalaryForm: state.editSalaryForm,
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
)(EditSalary);
