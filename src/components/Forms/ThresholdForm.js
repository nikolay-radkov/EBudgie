import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  ScrollView
} from 'react-native';
import {
  FormLabel,
  FormInput,
  Button,
  FormValidationMessage,
  List,
  ListItem,
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
import CategoryThresholdModal from '../Modal/CategoryThresholdModal';
import { mapArrayOfIdsToCategories } from '../../services/mapIdToObject';

class ThresholdForm extends Component {
  textInputRef = null;

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

  refreshGlobalThreshold = () => {
    const { thresholdCategories, setGlobalThreshold } = this.props;
    const value = _.sumBy(thresholdCategories, 'value');
    setGlobalThreshold(value);

    this.textInputRef.setNativeProps({
      text: `${value}`,
    });
  }

  render() {
    const {
      buttonText,
      buttonIcon,
      addCategoryThreshold,
      thresholdForm,
      categories,
      removeCategoryThreshold,
      thresholdCategories,
      currency,
    } = this.props;

    const { errorMessage, defaultInputValue } = this.state;
    const showCategories = !!thresholdCategories && thresholdCategories.length > 0;

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <ScrollView>
          <View style={[theme.container,]}>
            <View style={{
              flexDirection: 'row'
            }}>
              <FormLabel containerStyle={{
                flex: 1,
              }}>{i18n.t('CATEGORIES_THRESHOLD')}</FormLabel>
              <CategoryThresholdModal
                addCategoryThreshold={addCategoryThreshold}
                categories={categories}
                thresholdForm={thresholdForm}
              />
            </View>
            {showCategories &&
              <List>
                {thresholdCategories.map((c, index) => (
                  <ListItem
                    hideChevron
                    key={index}
                    leftIcon={{
                      color: c.color,
                      name: c.icon
                    }}
                    rightTitle={
                      <Text
                        onPress={() => removeCategoryThreshold(c.categoryId)}
                        style={{
                          color: colors.error,
                          fontSize: 20,
                          fontWeight: 'bold',
                          lineHeight: 30,
                        }}>
                        {i18n.t('DELETE')}
                      </Text>
                    }
                    subtitle={<Text>{c.value} {currency}</Text>}
                    title={c.title}
                  />
                ))}
              </List>
            }
            <FormLabel>{i18n.t('GLOBAL_THRESHOLD')}</FormLabel>
            <FormInput
              defaultValue={defaultInputValue}
              keyboardType="numeric"
              onChangeText={this.onChange}
              onSubmitEditing={() => dismissKeyboard()}
              textInputRef={ref => { this.textInputRef = ref; }} />
            {errorMessage && <FormValidationMessage>{errorMessage}</FormValidationMessage>}
            <View style={{
              flexDirection: 'row'
            }}>
              <View style={{
                flexDirection: 'row',
                flex: 1,
              }}>
                <Button
                  backgroundColor={colors.bloodOrange}
                  borderRadius={10}
                  color={colors.snow}
                  icon={{
                    name: 'refresh',
                    color: colors.snow
                  }}
                  onPress={this.refreshGlobalThreshold}
                  title={i18n.t('REFRESH')} />
              </View>
              <View style={{
                flexDirection: 'row-reverse',
                flex: 1
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
          </View>
        </ScrollView >
      </TouchableWithoutFeedback >
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
  thresholdCategories: PropTypes.array,
  buttonIcon: PropTypes.string,
  buttonText: PropTypes.string,
  currency: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  const { ebudgie } = state;

  const categories = _.filter(ebudgie.categories, (c) => {
    const hasCategories = _.findIndex(ebudgie.items, (i) => i.categoryId === c.id) !== -1;
    const isNotUsed = _.findIndex(ownProps.thresholdForm.categories, (i) => i.categoryId === c.id) === -1;
    return hasCategories && isNotUsed;
  });

  const mappedCategories = mapArrayOfIdsToCategories(ebudgie.categories, ownProps.thresholdForm.categories);

  return {
    categories: translateMany(categories, CATEGORY_PROP),
    thresholdCategories: translateMany(mappedCategories, CATEGORY_PROP),
    currency: state.ebudgie.currency,
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
