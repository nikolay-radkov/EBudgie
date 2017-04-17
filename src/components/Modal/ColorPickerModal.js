import React, { Component, PropTypes } from 'react';
import { Animated, StyleSheet, Dimensions, TouchableHighlight, View, Text } from 'react-native';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker';
import dismissKeyboard from 'dismissKeyboard';
import i18n from 'react-native-i18n';

class ColorPickerModal extends Component {
  constructor() {
    super();

    this.state = {
      color: 'red'
    };

    this.closeModal = this.closeModal.bind(this);
    this.changeColor = this.changeColor.bind(this);
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

  closeModal() {
    const { color } = this.state;

    Animated.timing(this.props.offset, {
      duration: 300,
      toValue: Dimensions.get('window').height
    }).start(this.props.closeModal);
    this.props.callback(color);
  }

  changeColor(color) {
    this.setState({
      color: fromHsv(color)
    });
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
        <TriangleColorPicker
          onColorChange={this.changeColor}
          onColorSelected={this.closeModal}
          style={styles.picker}
          />
      </Animated.View>
    );
  }
}

ColorPickerModal.propTypes = {
  offset: PropTypes.object.isRequired,
  oldColor: PropTypes.object,
  callback: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
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
  }
});

export default ColorPickerModal;
