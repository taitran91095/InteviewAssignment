import { combineReducers } from 'redux';
import home from './reducers/home';
import { routerReducer } from 'react-router-redux';
import myreducer from './reducers/myreducer';
import common from './reducers/common';
import cartViewReducer from './reducers/cartViewReducer';

export default combineReducers({
  home,
  common,
  myreducer,
  cartViewReducer,
  router: routerReducer
});