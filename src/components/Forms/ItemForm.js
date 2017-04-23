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

    this.saveItem = this.saveItem.bind(this);
    this.state = {
      defaultInputValue: props.itemForm.name ? `${props.itemForm.name}` : '',
    };
  }

  componentWillUnmount() {
    const { resetItemForm } = this.props;
    resetItemForm();
  }

  async saveItem() {
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
      setItemName,
      setItemCategory,
      categories,
      buttonIcon,
      buttonText,
    } = this.props;

    const categoryOptions = categories.map((category) => (
      <Picker.Item key={category.id} label={category.title} value={category.id} />
    ));

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[theme.container,]}>
          <FormLabel>{i18n.t('NAME')}</FormLabel>
          <FormInput
            defaultValue={this.state.defaultInputValue}
            onChangeText={setItemName}
            onSubmitEditing={() => dismissKeyboard()} />
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
              icon={{ name: buttonIcon }}
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
