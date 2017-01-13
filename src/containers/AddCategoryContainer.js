import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, TouchableHighlight, Text, Animated, Dimensions } from 'react-native';

import ColorPickerModal from '../components/Modal/ColorPickerModal';

import {
  FormLabel,
  FormInput,
  Grid,
  Row,
  Col
} from 'react-native-elements';

class AddCategoryContainer extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      offSet: new Animated.Value(Dimensions.get('window').height),
      color: 'white'
    };

    this.changeColor = this.changeColor.bind(this);
  }

  changeColor(color) {
    debugger;
    this.setState({
      color
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FormLabel>Title</FormLabel>
        <FormInput />
        <Grid>
          <Row>
            <Col size={1}>
              <TouchableHighlight
                onPress={() => this.setState({ modal: true })}
                style={{backgroundColor: this.state.color}}
                underlayColor="transparent">
                <Text>Color Picker</Text>
              </TouchableHighlight>
            </Col>
            <Col size={1}>
              <TouchableHighlight
                onPress={() => this.setState({ modal: true })}
                underlayColor="transparent">
                <Text>Icon Picker </Text>
              </TouchableHighlight>
            </Col>
          </Row>

        </Grid>
        {this.state.modal ?
          <ColorPickerModal
            callback={this.changeColor}
            closeModal={() => this.setState({ modal: false })}
            offSet={this.state.offSet}
            showtime={this.state.time}
            style={{ flex: 1 }} />
          : null}
      </View>
    );
  }
}

AddCategoryContainer.propTypes = {

};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCategoryContainer);
