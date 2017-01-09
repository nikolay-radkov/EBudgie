import React from 'react';
import { Text } from 'react-native';

import Login from './containers/LoginContainer';
import Home from './containers/HomeContainer';

export default (key, params) => {
  switch (key) {
    case 'scene_login':
      return (<Login />);
    case 'scene_home':
      return (<Home />);
    default:
      return <Text>Not found</Text>;
  }
};
