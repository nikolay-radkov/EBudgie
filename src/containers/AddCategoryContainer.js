import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView } from 'react-native';
import { TriangleColorPicker } from 'react-native-color-picker'
import {
  FormLabel,
  FormInput,
  Grid,
  Row,
  Col
} from 'react-native-elements';

class AddCategoryContainer extends Component {
  render() {
    return (
      <ScrollView>
        <TriangleColorPicker
          onColorSelected={color => alert(`Color selected: ${color}`)}
          style={{ flex: 1, height: 250, backgroundColor: 'white' }}
          />
        <Grid>
          <Row>
            <Col size={3}>
              <FormLabel>Title</FormLabel>
              <FormInput />
            </Col>
            <Col size={1}>
              <FormLabel>Icon</FormLabel>
              <FormInput />
            </Col>
          </Row>
        </Grid>
      </ScrollView>
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
