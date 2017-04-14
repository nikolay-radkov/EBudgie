import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import dismissKeyboard from 'dismissKeyboard';
import UUIDGenerator from 'react-native-uuid-generator';

import ColorPickerModal from '../../components/Modal/ColorPickerModal';
import IconPickerModal from '../../components/Modal/IconPickerModal';
import * as actions from '../../actionCreators/modals';
import { popRoute } from '../../boundActionCreators/navigation';
import colors from '../../themes/Colors';
import metrics from '../../themes/Metrics';

import {
  FormLabel,
  FormInput,
  Icon
} from 'react-native-elements';

class CategoryContainer extends Component {
  constructor(props) {
    super(props);

    this.closeAllModals = this.closeAllModals.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
    this.state = {
      defaultInputValue: props.categoryForm.title ? `${props.categoryForm.title}` : '',
    };
  }

  componentDidMount() {
    const { setOffset } = this.props;
    const offset = new Animated.Value(Dimensions.get('window').height);

    setOffset(offset);
  }

  componentWillUnmount() {
    const { resetCategoryForm, resetModals } = this.props;
    resetCategoryForm();
    resetModals();
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

  async saveCategory() {
    const {
      newCategory,
      pop
    } = this.props;

    const {
      id,
      title,
      icon,
      color
    } = this.props.categoryForm;

    let uuid = id;

    if (!id) {
      uuid = await UUIDGenerator.getRandomUUID();
    }

    newCategory({
      id: uuid,
      title,
      icon,
      color
    });

    pop();
  }

  render() {
    const {
      icon,
      color,
    } = this.props.categoryForm;

    const {
      offset,
      colorModal,
      iconModal,
    } = this.props.modals;

    const {
      openColorPicker,
      closeColorPicker,
      openIconPicker,
      closeIconPicker,
      setCategoryColor,
      setCategoryTitle,
      setCategoryIcon,
      buttonIcon,
      buttonText,
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.closeAllModals}>
        <View style={{ flex: 1 }}>
          <View style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <Button
              backgroundColor={colors.positive}
              borderRadius={10}
              icon={{ name: 'format-color-fill' }}
              iconLeft
              onPress={openColorPicker}
              title="Color" />
            <View style={{
              backgroundColor: color,
              padding: 10,
              width: 50,
              borderRadius: 50,
              elevation: metrics.elevation,
            }}>
              <Icon
                color={colors.snow}
                name={icon}
                size={30}
              />
            </View>
            <Button
              backgroundColor={colors.warm}
              borderRadius={10}
              color={colors.snow}
              icon={{
                name: 'insert-emoticon',
                color: colors.snow
              }}
              iconRight
              onPress={openIconPicker}
              title="Icon" />

          </View>
          <FormLabel>Title</FormLabel>
          <FormInput
            defaultValue={this.state.defaultInputValue}
            onChangeText={setCategoryTitle}
            onSubmitEditing={() => dismissKeyboard()} />
          <View style={{
            flexDirection: 'row-reverse'
          }}>
            <Button
              backgroundColor={colors.main}
              borderRadius={10}
              icon={{ name: buttonIcon }}
              iconRight
              onPress={this.saveCategory}
              title={buttonText} />
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

CategoryContainer.propTypes = {
  setCategoryTitle: PropTypes.func.isRequired,
  setCategoryColor: PropTypes.func.isRequired,
  setCategoryIcon: PropTypes.func.isRequired,
  openColorPicker: PropTypes.func.isRequired,
  closeColorPicker: PropTypes.func.isRequired,
  openIconPicker: PropTypes.func.isRequired,
  closeIconPicker: PropTypes.func.isRequired,
  resetCategoryForm: PropTypes.func.isRequired,
  newCategory: PropTypes.func.isRequired,
  setOffset: PropTypes.func.isRequired,
  categoryForm: PropTypes.object.isRequired,
  pop: PropTypes.func.isRequired,
  resetModals: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonIcon: PropTypes.string.isRequired,
  modals: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    modals: state.modals,
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
)(CategoryContainer);
