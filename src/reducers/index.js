import { combineReducers } from 'redux';
import navigation from './navigation';
import todo from './todo';

const rootReducer = combineReducers({
  navigation,
  todo
});

export default rootReducer;
