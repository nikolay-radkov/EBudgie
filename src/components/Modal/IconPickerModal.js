import React, { Component, PropTypes } from 'react';
import { ScrollView, Animated, StyleSheet, Dimensions, TouchableHighlight, View, Text } from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import i18n from 'react-native-i18n';

import materialIconCategories from '../../constants/MaterialIconCategories';
import IconCategory from './IconCategory';

class IconPickerModal extends Component {
  constructor() {
    super();
    this.state = {
      categories: materialIconCategories.slice(0, 1),
      name: 'adb'
    };

    this.changeIcon = this.changeIcon.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    dismissKeyboard();
  }

  componentDidMount() {
    Animated.timing(this.props.offset, {
      duration: 300,
      toValue: 0
    }).start();
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  loadNextCategory() {
    if (this.state.categories.length < materialIconCategories.length) {
      this.setState({ categories: materialIconCategories.slice(0, this.state.categories.length + 1) });
    }
  }

  closeModal() {
    const { icon } = this.state;

    Animated.timing(this.props.offset, {
      duration: 300,
      toValue: Dimensions.get('window').height
    }).start(this.props.closeModal);
    this.props.callback(icon);
  }


  changeIcon(icon) {
    this.setState({
      icon
    });
  }

  renderCategory(category) {
    return (
      <IconCategory
        {...this.props}
        category={category}
        changeIcon={this.changeIcon}
        finishedLoading={() => { this._timeout = setTimeout(this.loadNextCategory.bind(this), 100);}}
        key={category}
        selected={this.state.icon}
        />
    );
  }

  render() {
    return (
      <Animated.View style={[styles.container, {
        transform: [{ translateY: this.props.offset }],
      }]}>
        <View style={styles.closeButtonContainer}>
          <TouchableHighlight
            onPress={this.closeModal}
            style={styles.closeButton}
            underlayColor="transparent">
            <Text style={styles.closeButtonText}>{i18n.t('CHOOSE')}</Text>
          </TouchableHighlight>
        </View>

        <ScrollView horizontal>
          {this.state.categories.map(this.renderCategory.bind(this))}
        </ScrollView>
      </Animated.View>
    );
  }
}

IconPickerModal.propTypes = {
  offset: PropTypes.object.isRequired,
  oldColor: PropTypes.object,
  callback: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  picker: {
    flex: 1,
    backgroundColor: 'white'
  },
  closeButtonContainer: {
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1
  },
  closeButton: {
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  closeButtonText: {
    color: '#027afe'
  },
  clearButton: {
    flex: 1,
    padding: 15,
    textAlign: 'center',
    color: 'black',
    textAlignVertical: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  visible: {
    top: 0,
    flex: 1,
    justifyContent: 'center',
  },
  hidden: {
    top: 1000,
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: 'grey',
    opacity: 0.5,
  },
  categoryOuter: {
    flex: -1,
  },
});

export default IconPickerModal;
