import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import { store } from '../store';
import { push } from 'react-router-redux';
import AdminView from '../components/AdminView';
import CartView from '../components/CartView';
import { APP_LOAD, REDIRECT } from '../action/action';


const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  render() {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/mysection" component={AdminView} />
            <Route path="/cartView" component={CartView} />
            </Switch>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
