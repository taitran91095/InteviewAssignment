import {
    APP_LOAD,
    REDIRECT,
  } from '../action/action';
  
  const defaultState = {
    appName: 'Conduit',
    token: null,
    viewChangeCounter: 0
  };
  
  export default (state = defaultState, action) => {
    switch (action.type) {
      case APP_LOAD:
        return {
          ...state,
          appLoaded: true,
        };
      case REDIRECT:
        return { ...state, redirectTo: null };
      default:
        return state;
    }
  };
  