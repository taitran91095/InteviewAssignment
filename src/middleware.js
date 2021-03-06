import {
  ASYNC_START,
  ASYNC_END,
  CART_VIEW_SECTION_LOADED
} from './action/action';

//define promise middleware
const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter != currentView) {
          return
        }
        console.log('RESULT', res);
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter != currentView) {
          return
        }
        console.log('ERROR', error);
        action.error = true;
        action.payload = error.response.body;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type == CART_VIEW_SECTION_LOADED) {
    if (!action.error) {
      window.localStorage.setItem('cartID', action.payload[1].id);
    }
  } 
  next(action);
};

//the return mean if a == true then return b, else return a
//using this here to check if v is null or not
function isPromise(v) {
  return v && typeof v.then == 'function';
}


export { promiseMiddleware,localStorageMiddleware }
 