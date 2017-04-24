import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
  FormValidationMessage,
} from 'react-native-elements';
import dismissKeyboard from 'dismissKeyboard';
import moment from 'moment';
import i18n from 'react-native-i18n';

import theme from '../themes/ApplicationStyles';
import colors from '../themes/Colors';
import * as actions from '../actionCreators/editSalaryForm';
import { popRoute } from '../boundActionCreators/navigation';

class EditSalary extends Component {
  constructor() {
    super();

    this.state = {
      errorMessage: null,
    };
  }

  componentWillUnmount = () => {
    const { resetEditSalaryForm } = this.props;
    resetEditSalaryForm();
  }

  validateValue = (value) => {
    if (!value) {
      this.setState({
        errorMessage: i18n.t('INVALID_SALARY'),
      });
      return false;
    } else {
      this.setState({
        errorMessage: null
      });

      return true;
    }
  }

  onChange = (newValue) => {
    const { setSalaryValue } = this.props;
    const value = parseFloat(newValue);
    if (!this.validateValue(value)) {
      return;
    }

    setSalaryValue(value);
  }

  saveItem = async () => {
    const {
      editSalary,
      pop,
    } = this.props;

    const {
      value
    } = this.props.editSalaryForm;

    if (!this.validateValue(value)) {
      return;
    }

    editSalary({
      value: parseFloat(value),
      date: moment()
    });

    pop();
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[theme.container,]}>
          <FormLabel>{i18n.t('SALARY')}</FormLabel>
          <FormInput
            keyboardType="numeric"
            onChangeText={this.onChange}
            onSubmitEditing={() => dismissKeyboard()} />
          {errorMessage && <FormValidationMessage>{errorMessage}</FormValidationMessage>}
          <View style={{
            flexDirection: 'row-reverse'
          }}>
            <Button
              backgroundColor={colors.main}
              borderRadius={10}
              color={!errorMessage ? colors.snow : colors.error}
              disabled={!!errorMessage}
              disabledStyle={{
                backgroundColor: colors.frost,
              }}
              icon={{
                name: 'save',
                color: !errorMessage ? colors.snow : colors.error
              }}
              iconRight
              onPress={this.saveItem}
              title={i18n.t('SAVE')} />
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
