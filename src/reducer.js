import { combineReducers } from 'redux';
import home from './reducers/home';
import { routerReducer } from 'react-router-redux';
import myreducer from './reducers/myreducer';
import common from './reducers/common';

export default combineReducers({
  home,
  common,
  myreducer,
  router: routerReducer
});