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
import dismissKeyboard from 'dismissKeyboard';
import UUIDGenerator from 'react-native-uuid-generator';
import i18n from 'react-native-i18n';

import theme from '../../themes/ApplicationStyles';
import colors from '../../themes/Colors';
import { popRoute } from '../../boundActionCreators/navigation';
import { translateMany } from '../../services/translator';
import { CATEGORY_PROP } from '../../constants/TranslationProps';

class ItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultInputValue: props.itemForm.name ? `${props.itemForm.name}` : '',
      errorMessage: null,
    };
  }

  componentWillUnmount = () => {
    const { resetItemForm } = this.props;
    resetItemForm();
  }

  validateName = (value) => {
    if (!value) {
      this.setState({
        errorMessage: i18n.t('NAME_IS_REQUIRED'),
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
    const { setItemName } = this.props;

    if (!this.validateName(newValue)) {
      return;
    }

    setItemName(newValue);
  }

  saveItem = async () => {
    const {
      newItem,
      pop,
      categories
    } = this.props;

    const {
      id,
      name,
      categoryId
    } = this.props.itemForm;

    if (!this.validateName(name)) {
      return;
    }

    const selectedCategoryId = categoryId ? categoryId : categories[0].id;
    let uuid = id;

    if (!id) {
      uuid = await UUIDGenerator.getRandomUUID();
    }

    newItem({
      id: uuid,
      name,
      categoryId: selectedCategoryId
    });

    pop();
  }

  render() {
    const {
      itemForm,
      setItemCategory,
      categories,
      buttonIcon,
      buttonText,
    } = this.props;

    const { errorMessage, defaultInputValue } = this.state;

    const categoryOptions = categories.map((category) => (
      <Picker.Item key={category.id} label={category.title} value={category.id} />
    ));

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[theme.container,]}>
          <FormLabel>{i18n.t('NAME')}</FormLabel>
          <FormInput
            defaultValue={defaultInputValue}
            onChangeText={this.onChange}
            onSubmitEditing={() => dismissKeyboard()} />
          {errorMessage && <FormValidationMessage>{errorMessage}</FormValidationMessage>}
          <FormLabel>{i18n.t('CATEGORY')}</FormLabel>
          <Picker
            onValueChange={setItemCategory}
            selectedValue={itemForm.categoryId}>
            {categoryOptions}
          </Picker>
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
                color: colors.warm,
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

ItemForm.propTypes = {
  setItemName: PropTypes.func.isRequired,
  setItemCategory: PropTypes.func.isRequired,
  resetItemForm: PropTypes.func.isRequired,
  itemForm: PropTypes.object.isRequired,
  newItem: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  buttonIcon: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    categories: translateMany(state.ebudgie.categories, CATEGORY_PROP),
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
)(ItemForm);
