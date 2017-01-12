import React, { Component } from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import { connect } from 'react-redux';

class NotFoundComponent extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#EEF1F4',
        paddingTop: 50
      }}>
        <View onTouchStart={this.skip} style={{
          flex: 2,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image source={require('../images/budgie-icon.png')} />
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{
            fontSize: 30,
            textAlign: 'center'
          }}>
            The resource could not be found
          </Text>
        </View>
      </View>
    );
  }
}

export default connect(
  null
)(NotFoundComponent);
