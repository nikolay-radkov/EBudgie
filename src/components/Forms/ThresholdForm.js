import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  TouchableWithoutFeedback,
  Picker,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
  FormValidationMessage,
} from 'react-native-elements';
import _ from 'lodash';
import dismissKeyboard from 'dismissKeyboard';
import UUIDGenerator from 'react-native-uuid-generator';
import moment from 'moment';
import i18n from 'react-native-i18n';

import theme from '../../themes/ApplicationStyles';
import colors from '../../themes/Colors';
import { popRoute } from '../../boundActionCreators/navigation';
import { translateMany } from '../../services/translator';
import { CATEGORY_PROP } from '../../constants/TranslationProps';

class ThresholdForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultInputValue: props.thresholdForm.value ? `${props.thresholdForm.value}` : '',
      errorMessage: null,
    };
  }

  componentWillUnmount = () => {
    const { resetThresholdForm } = this.props;
    resetThresholdForm();
  }

  validateValue = (value) => {
    if (!value) {
      this.setState({
        errorMessage: i18n.t('INVALID_VALUE'),
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
    const { setGlobalThreshold } = this.props;
    const value = parseFloat(newValue);
    if (!this.validateValue(value)) {
      return;
    }

    setGlobalThreshold(value);
  }

  saveItem = async () => {
    const {
      newThreshold,
      pop,
    } = this.props;

    const {
      id,
      categories,
      value,
      date,
    } = this.props.thresholdForm;

    if (!this.validateValue(value)) {
      return;
    }

    let uuid = id;

    if (!id) {
      uuid = await UUIDGenerator.getRandomUUID();
    }

    newThreshold({
      id: uuid,
      value: parseFloat(value),
      categories,
      date: date ? moment(date) : moment(),
    });

    pop();
  }

  render() {
    const {
      categories,
      buttonText,
      buttonIcon
    } = this.props;

    const { errorMessage, defaultInputValue } = this.state;

    const categoryOptions = categories.map((category) => (
      <Picker.Item key={category.id} label={category.title} value={category.id} />
    ));

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[theme.container,]}>
          <FormLabel>{i18n.t('VALUE')}</FormLabel>
          <FormInput
            defaultValue={defaultInputValue}
            keyboardType="numeric"
            onChangeText={this.onChange}
            onSubmitEditing={() => dismissKeyboard()} />
          {errorMessage && <FormValidationMessage>{errorMessage}</FormValidationMessage>}
          {/*<FormLabel>{i18n.t('CATEGORY')}</FormLabel>
          <Picker
            onValueChange={setEventCategory}
            selectedValue={thresholdForm.categoryId}>
            {categoryOptions}
          </Picker>*/}
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
                name: buttonIcon,
                color: !errorMessage ? colors.snow : colors.error
              }}
              iconRight
              onPress={this.saveItem}
              title={buttonText} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ThresholdForm.propTypes = {
  setGlobalThreshold: PropTypes.func.isRequired,
  addCategoryThreshold: PropTypes.func.isRequired,
  removeCategoryThreshold: PropTypes.func.isRequired,
  resetThresholdForm: PropTypes.func.isRequired,
  thresholdForm: PropTypes.object.isRequired,
  newThreshold: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  buttonIcon: PropTypes.string,
  buttonText: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  const { ebudgie } = state;

  const categories = _.filter(ebudgie.categories, (c) => {
    const hasCategories = _.findIndex(ebudgie.items, (i) => i.categoryId === c.id) !== -1;
    const isNotUsed = _.findIndex(ownProps.thresholdForm.categories, (i) => i.categoryId === c.id) === -1;
    return hasCategories && isNotUsed;
  });

  return {
    categories: translateMany(categories, CATEGORY_PROP),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pop: bindActionCreators(popRoute, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThresholdForm);
