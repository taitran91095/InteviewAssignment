import React from 'react';
import {connect} from 'react-redux';
import {FILTER_CHANGE,FILTER_PRODUCT} from '../../action/action';

const mapStateToProps = state => ({
    filter : state.adminViewReducer.filter
});


const mapDispatchToProps = dispatch => ({
    handleFilterChange  : (event) => dispatch({ type: FILTER_CHANGE, value:event.target.value }),
    filterProduct : () =>   dispatch({ type: FILTER_PRODUCT })
});


class AdminProductListFilter extends React.Component {
  constructor(){
    super();
    this.handleFilterChange = event =>(this.props.handleFilterChange(event));
    this.filterProduct = () =>(this.props.filterProduct());
    }

  
  render(){
    return(
        <div className="filterDiv form-inline">
            <input type="text" className="form-control" onChange={this.handleFilterChange} value={this.props.filter}/>
            <input type="button" className="form-control" onClick={this.filterProduct} value ="Filter" />
        </div>
    );    
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(AdminProductListFilter);
