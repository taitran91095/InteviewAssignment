import React from 'react';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED
} from '../action/action';


const mapStateToProps = state => ({
  ...state.home
});

const mapDispatchToProps = dispatch => ({
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  componentWillMount() {
   
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div className="home-page">
        <h1>Welcome To Our Basic Shop</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
