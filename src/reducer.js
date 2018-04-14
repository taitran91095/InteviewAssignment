import { combineReducers } from 'redux';
import home from './reducers/home';
import { routerReducer } from 'react-router-redux';
import adminViewReducer from './reducers/adminViewReducer';
import common from './reducers/common';
import cartViewReducer from './reducers/cartViewReducer';

export default combineReducers({
  home,
  common,
  adminViewReducer,
  cartViewReducer,
  router: routerReducer
});