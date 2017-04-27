import React, { Component, PropTypes } from 'react';
import {
  FormLabel,
  FormInput,
  Button,
  FormValidationMessage,
} from 'react-native-elements';
import {
  View,
  TouchableWithoutFeedback,
  Picker,
  Modal,
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import i18n from 'react-native-i18n';
import _ from 'lodash';

import colors from '../../themes/Colors';

class CategoryThresholdModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      modalVisible: false,
      selectedCategory: null,
      selectedCategoryThreshold: 0,
    };
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
  showCategoryList = () => {
    this.setState({
      modalVisible: true,
    });
  }

  closeCategoryList = () => {
    this.setState({
      selectedCategory: null,
      selectedCategoryThreshold: 0,
      modalVisible: false,
      errorMessage: null,
    });
  }

  setCategoryThreshold = (newValue) => {
    const value = parseFloat(newValue);
    if (!this.validateValue(value)) {
      return;
    }

    this.setState({
      selectedCategoryThreshold: value,
    });
  }

  addNewCategoryThreshold = () => {
    const { addCategoryThreshold, categories } = this.props;
    const { selectedCategory, selectedCategoryThreshold } = this.state;

    if (!this.validateValue(selectedCategoryThreshold)) {
      return;
    }

    const selectedCategoryId = selectedCategory ? selectedCategory : categories[0].id;

    addCategoryThreshold(selectedCategoryId, selectedCategoryThreshold);
    this.closeCategoryList();
  }

  render() {
    const {
      categories,
    } = this.props;

    const { errorMessage, modalVisible, selectedCategory } = this.state;
    const categoryOptions = categories.map((category) => (
      <Picker.Item key={category.id} label={category.title} value={category.id} />
    ));

    const shoudEnableButton = categories && categories.length > 0;

    return (
      <View>
        <View style={{
          flexDirection: 'row-reverse'
        }}>
          <Button
            backgroundColor={colors.bloodOrange}
            borderRadius={10}
            color={shoudEnableButton ? colors.snow : colors.error}
            disabled={!shoudEnableButton}
            disabledStyle={{
              backgroundColor: colors.frost,
            }}
            icon={{
              name: 'playlist-add',
              color: shoudEnableButton ? colors.snow : colors.error
            }}
            onPress={this.showCategoryList}
            small />
        </View>
        <Modal
          animationType="slide"
          onRequestClose={this.closeCategoryList}
          transparent={false}
          visible={modalVisible}>
          <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View style={{ marginTop: 22 }}>
              <Button
                borderRadius={10}
                onPress={this.closeCategoryList}
                small
                title={i18n.t('CANCEL')} />

              <FormLabel>{i18n.t('CATEGORY')}</FormLabel>
              <Picker
                onValueChange={(id) => this.setState({
                  selectedCategory: id,
                })}
                selectedValue={selectedCategory}>
                {categoryOptions}
              </Picker>
              <FormLabel>{i18n.t('VALUE')}</FormLabel>
              <FormInput
                keyboardType="numeric"
                onChangeText={this.setCategoryThreshold}
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
                  onPress={this.addNewCategoryThreshold}
                  title={i18n.t('SAVE')} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View >
    );
  }
}

export default CategoryThresholdModal;
