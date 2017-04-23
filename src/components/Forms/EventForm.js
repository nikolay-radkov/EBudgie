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
import _ from 'lodash';
import dismissKeyboard from 'dismissKeyboard';
import UUIDGenerator from 'react-native-uuid-generator';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import i18n from 'react-native-i18n';

import theme from '../../themes/ApplicationStyles';
import colors from '../../themes/Colors';
import { popRoute } from '../../boundActionCreators/navigation';
import { translateMany } from '../../services/translator';
import { CATEGORY_PROP, ITEM_PROP } from '../../constants/TranslationProps';

class EventForm extends Component {
  constructor(props) {
    super(props);

    this.saveItem = this.saveItem.bind(this);
    this.state = {
      defaultInputValue: props.eventForm.value ? `${props.eventForm.value}` : '',
    };
  }

  componentWillUnmount() {
    const { resetEventForm } = this.props;
    resetEventForm();
  }

  async saveItem() {
    const {
      newEvent,
      pop,
      categories,
      items,
    } = this.props;

    const {
      id,
      categoryId,
      itemId,
      value,
      date,
    } = this.props.eventForm;

    const selectedCategoryId = categoryId ? categoryId : categories[0].id;
    const selectedItemId = itemId ? itemId : items[0].id;
    let uuid = id;

    if (!id) {
      uuid = await UUIDGenerator.getRandomUUID();
    }

    newEvent({
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
      eventForm,
      setEventValue,
      setEventCategory,
      setEventItem,
      categories,
      items,
      setEventDate,
      buttonText,
      buttonIcon
    } = this.props;

    const categoryOptions = categories.map((category) => (
      <Picker.Item key={category.id} label={category.title} value={category.id} />
    ));
    const itemOptions = items.map((item) => (
      <Picker.Item key={item.id} label={item.name} value={item.id} />
    ));

    return (
      <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
        <View style={[theme.container,]}>
          <FormLabel>{i18n.t('VALUE')}</FormLabel>
          <FormInput
            defaultValue={this.state.defaultInputValue}
            keyboardType="numeric"
            onChangeText={setEventValue}
            onSubmitEditing={() => dismissKeyboard()} />
          <FormLabel>{i18n.t('CATEGORY')}</FormLabel>
          <Picker
            onValueChange={setEventCategory}
            selectedValue={eventForm.categoryId}>
            {categoryOptions}
          </Picker>
          <FormLabel>{i18n.t('ITEM')}</FormLabel>
          <Picker
            onValueChange={setEventItem}
            selectedValue={eventForm.itemId}>
            {itemOptions}
          </Picker>
          <FormLabel>{i18n.t('DATE')}</FormLabel>
          <DatePicker
            // style={{ width: 200 }}
            cancelBtnText={i18n.t('CANCEL')}
            confirmBtnText={i18n.t('CONFIRM')}
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
            date={eventForm.date}
            format="YYYY-MM-DD"
            mode="date"
            onDateChange={setEventDate}
            placeholder={i18n.t('SELECT_DATE')}
          />
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

EventForm.propTypes = {
  setEventValue: PropTypes.func.isRequired,
  setEventCategory: PropTypes.func.isRequired,
  setEventItem: PropTypes.func.isRequired,
  setEventDate: PropTypes.func.isRequired,
  resetEventForm: PropTypes.func.isRequired,
  eventForm: PropTypes.object.isRequired,
  newEvent: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  buttonIcon: PropTypes.string,
  buttonText: PropTypes.string,
};

function mapStateToProps(state, ownProps) {
  const { ebudgie } = state;

  const categories = _.filter(ebudgie.categories, (c) => {
    return (_.findIndex(ebudgie.items, (i) => i.categoryId === c.id) !== -1);
  });

  const items = _.filter(ebudgie.items, (item) => {
    return ownProps.eventForm.categoryId ?
      item.categoryId === ownProps.eventForm.categoryId
      : item.categoryId === ebudgie.categories[0].id;
  });

  return {
    categories: translateMany(categories, CATEGORY_PROP),
    items: translateMany(items, ITEM_PROP),
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
)(EventForm);
