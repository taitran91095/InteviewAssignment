import React from 'react';
import Toggle from 'react-toggle';
import {SORT_LIST_INCREASE,SORT_LIST_DECREASE,MY_CHANGE_VALUE} from '../../action/action';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    productList : state.myreducer.productList
});

const mapDispatchToProps = dispatch => ({
    sortDataD: (productList) => dispatch({ type: SORT_LIST_DECREASE, productList }),
    sortData: (productList) => dispatch({ type: SORT_LIST_INCREASE, productList }),
    onChangeHandle: (attr,index,event) =>{
      if(attr!= "isVisible"){
        return dispatch({ type: MY_CHANGE_VALUE, attr:attr,index:index,value:event.target.value});
      }else{
        return dispatch({ type: MY_CHANGE_VALUE, attr:attr,index:index,value:event.target.checked});
      }
    } 
});


class MyTable extends React.Component {
  constructor(){
    super();
    this.sortDataD = data => this.props.sortDataD(this.props.productList);
    this.sortData = data => this.props.sortData(this.props.productList);
    this.onChangeHandle = (attr,index,event) =>{
      console.log(attr);
      console.log(index);
      console.log(event.target.value);
      console.log(event.target.checked);
        return this.props.onChangeHandle(attr,index,event);
    }
    
  }

  
  render(){
    if(this.props.productList.length < 1){
      return (
        <div>
          <table className="table">
          <tbody>
          <tr>
              <th>
                Product Name
              </th>
              <th>
                Price
              </th>
              <th>
                Qty
              </th>
              <th>
                Visible
              </th>
            </tr>
            </tbody>
          </table>
        </div>
      );
    }else{
      return (
        <div>
          <table className="table">
          <tbody>
          <tr>
              <th>
                Product Name
                <button onClick={this.sortData}>Sort</button>
                <button onClick={this.sortDataD}>Sort2</button>
              </th>
              <th>
                Price
              </th>
              <th>
                Qty
              </th>
              <th>
                Visible
              </th>
            </tr>
            {this.props.productList.map((product,i) =>
                <tr key={i}>
                  <td>
                  {product.name}
                  </td>
                  <td>
                   <input className="form-control" onChange={this.onChangeHandle.bind(this,'price',i)} value={product.price}  />
                  </td>
                  <td>
                  <input className="form-control" onChange={this.onChangeHandle.bind(this,'qty',i)} value={product.qty}  />
                  </td>
                  <td>
                    <Toggle defaultChecked={product.visible} onChange={this.onChangeHandle.bind(this,'isVisible',i)} />
                  </td>
                </tr>
          )}
          </tbody>
              </table>
            </div>
        );
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(MyTable);
