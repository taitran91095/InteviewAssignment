import React from 'react';
import Toggle from 'react-toggle';
import {connect} from 'react-redux';
import {FILTER_CHANGE,FILTER_PRODUCT} from '../../action/action';
import agent from '../../agent';

const mapStateToProps = state => ({
    filter : state.myreducer.filter
});


const mapDispatchToProps = dispatch => ({
    handleFilterChange  : (event) => dispatch({ type: FILTER_CHANGE, value:event.target.value }),
    filterProduct : () =>   dispatch({ type: FILTER_PRODUCT })
});


class MyFilter extends React.Component {
  constructor(){
    super();
    this.handleFilterChange = event =>(this.props.handleFilterChange(event));
    this.filterProduct = () =>(this.props.filterProduct());
    }

  
  render(){
    return(
        <div className="filterDiv">
            <input type="text" onChange={this.handleFilterChange} value={this.props.filter}/>
            <input type="button" onClick={this.filterProduct} value ="Filter" />
        </div>
    );    
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(MyFilter);
