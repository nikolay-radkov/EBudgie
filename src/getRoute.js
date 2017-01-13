import React from 'react';

import Login from './containers/LoginContainer';
import Home from './containers/HomeContainer';
import AddItem from './containers/AddItemContainer';
import AddCategory from './containers/AddCategoryContainer';
import NotFound from './containers/NotFoundComponent';

export default (key, params) => {
  switch (key) {
    case 'scene_login':
      return (<Login />);
    case 'scene_home':
      return (<Home />);
    case 'scene_add_item':
      return (<AddItem />);
    case 'scene_add_category':
      return (<AddCategory />);
    default:
      return <NotFound />;
  }
};
