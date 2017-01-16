import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, TouchableHighlight, Text, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

import ColorPickerModal from '../components/Modal/ColorPickerModal';
import IconPickerModal from '../components/Modal/IconPickerModal';
import * as actions from '../actionCreators/addCategoryForm';

import {
  FormLabel,
  FormInput,
  Icon
} from 'react-native-elements';

class AddCategoryContainer extends Component {
  constructor() {
    super();

    this.closeAllModals = this.closeAllModals.bind(this);
  }

  componentDidMount() {
    const { setOffset } = this.props;
    const offset = new Animated.Value(Dimensions.get('window').height);

    setOffset(offset);
  }

  componentWillUnmount() {
    const { resetAddCategoryForm } = this.props;
    resetAddCategoryForm();
  }

  closeAllModals() {
    dismissKeyboard();
    const {
      closeColorPicker,
      closeIconPicker
    } = this.props;

    closeColorPicker();
    closeIconPicker();
  }

  render() {
    const {
      offset,
      colorModal,
      iconModal,
      color,
      icon,
      iconColor
    } = this.props.addCategoryForm;

    const {
      openColorPicker,
      closeColorPicker,
      openIconPicker,
      closeIconPicker,
      setCategoryColor,
      setCategoryTitle,
      setCategoryIcon,
      addNewCategory
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.closeAllModals}>
        <View style={{ flex: 1 }}>
          <FormLabel>Title</FormLabel>
          <FormInput
            icon={{ color: '#red', name: 'search' }}
            onChangeText={setCategoryTitle}
            onSubmitEditing={() => dismissKeyboard()} />
          <View style={{
            flexDirection: 'row'
          }}>
            <View style={{
              backgroundColor: color,
              padding: 10,
              width: 50
            }}>
              <Icon
                color={iconColor}
                name={icon}
                size={30}
                />
            </View>
            <TouchableHighlight
              onPress={openColorPicker}
              underlayColor="transparent">
              <Text>Color Picker</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={openIconPicker}
              underlayColor="transparent">
              <Text>Icon Picker </Text>
            </TouchableHighlight>

          </View>
          <View style={{
            flexDirection: 'row-reverse'
          }}>
            <TouchableHighlight
              onPress={addNewCategory}
              underlayColor="transparent">
              <Text>Submit</Text>
            </TouchableHighlight>
          </View>
          {colorModal ?
            <ColorPickerModal
              callback={setCategoryColor}
              closeModal={closeColorPicker}
              offset={offset}
              style={{ flex: 1 }} />
            : null}
          {iconModal ?
            <IconPickerModal
              callback={setCategoryIcon}
              closeModal={closeIconPicker}
              offset={offset}
              style={{ flex: 1 }} />
            : null}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

AddCategoryContainer.propTypes = {
  setCategoryTitle: PropTypes.func.isRequired,
  setCategoryColor: PropTypes.func.isRequired,
  setCategoryIcon: PropTypes.func.isRequired,
  openColorPicker: PropTypes.func.isRequired,
  closeColorPicker: PropTypes.func.isRequired,
  openIconPicker: PropTypes.func.isRequired,
  closeIconPicker: PropTypes.func.isRequired,
  resetAddCategoryForm: PropTypes.func.isRequired,
  addNewCategory: PropTypes.func.isRequired,
  setOffset: PropTypes.func.isRequired,
  addCategoryForm: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    addCategoryForm: state.addCategoryForm
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategoryContainer);
