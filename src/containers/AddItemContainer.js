import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import {
  FormLabel,
  FormInput,
  Grid,
  Row,
  Col
} from 'react-native-elements';

class AddItemContainer extends Component {
  render() {
    return (
      <Grid>
        <Col size={3}>
          <FormLabel>Name</FormLabel>
          <FormInput  />
        </Col>
        <Col size={2}>
          <FormLabel>Category</FormLabel>
          <FormInput  />
        </Col>
      </Grid>
    );
  }
}

AddItemContainer.propTypes = {

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
)(AddItemContainer);
