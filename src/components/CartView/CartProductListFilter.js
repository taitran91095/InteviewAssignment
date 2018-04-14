import React from 'react';
import Toggle from 'react-toggle';
import {connect} from 'react-redux';
import {CART_FILTER_CHANGE} from '../../action/action';
import agent from '../../agent';

const mapStateToProps = state => ({
    filter : state.cartViewReducer.filter
});


const mapDispatchToProps = dispatch => ({
    handleFilterChange  : (event) => dispatch({ type: CART_FILTER_CHANGE, value:event.target.value })
});


class CartProductListFilter extends React.Component {
  constructor(){
    super();
        this.handleFilterChange = event =>(this.props.handleFilterChange(event));
    }

  
  render(){
    return(
        <div className="filterDiv ">
            <input className="form-control" type="text" onChange={this.handleFilterChange} value={this.props.filter}/>
        </div>
    );    
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CartProductListFilter);
