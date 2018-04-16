import React from 'react';
import Toggle from 'react-toggle';
import {connect} from 'react-redux';
import {SORT_LIST_INCREASE,SORT_LIST_DECREASE,PRODUCT_LIST_CHANGE_VALUE,
  NEW_PRODUCT_VALUE_CHANGE,ADD_NEW_PRODUCT,UPDATE_PRODUCT} from '../../action/action';
import agent from '../../agent';

const mapStateToProps = state => ({
    productList : state.adminViewReducer.productList,
    productModel : state.adminViewReducer.productModel
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const mapDispatchToProps = dispatch => ({
    sortDataD: (productList) => dispatch({ type: SORT_LIST_DECREASE, productList }),
    sortData: (productList) => dispatch({ type: SORT_LIST_INCREASE, productList }),
    onChangeHandle: (attr,index,event) =>{
      if(attr != "visible"){
        return dispatch({ type: PRODUCT_LIST_CHANGE_VALUE, attr:attr,index:index,value:event.target.value});
      }else{
        console.log(event.target.checked);
        var value = (event.target.checked == true) ? false : true;
        console.log(value);
        return dispatch({ type: PRODUCT_LIST_CHANGE_VALUE, attr:attr,index:index,value:event.target.checked});
      }
    } ,
    onProductModelChangeHandle: (attr,event) =>{
      if(attr != "visible"){
        return dispatch({ type: NEW_PRODUCT_VALUE_CHANGE, attr:attr,value:event.target.value});
      }else{
        return dispatch({ type: NEW_PRODUCT_VALUE_CHANGE, attr:attr,value:event.target.checked});
      }
    } ,
    addProduct: (payload) => dispatch({ type: ADD_NEW_PRODUCT ,payload}),
    updateProduct: (payload,index) => dispatch({ type: UPDATE_PRODUCT ,payload, index:index})
});


class AdminProductListTable extends React.Component {
  constructor(){
    super();
    this.sortDataD = data => this.props.sortDataD(this.props.productList);
    this.sortData = data => this.props.sortData(this.props.productList);
    this.onChangeHandle = (attr,index,event) =>(this.props.onChangeHandle(attr,index,event));
    this.onProductModelChangeHandle = (attr,event) =>(this.props.onProductModelChangeHandle(attr,event));
    this.addProduct = () =>{
      this.props.productModel.id = guid(); 
      var payload = agent.Product.add(this.props.productModel);
      return this.props.addProduct(payload);
    }
    this.updateProduct =(index,event) => {
      var payload = agent.Product.update(this.props.productList[index]);
      return this.props.updateProduct(payload,index);
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
                      <span onClick={this.sortDataD} className="glyphicon glyphicon-sort-by-alphabet-alt float-right"></span>
                      <span onClick={this.sortData} className="glyphicon glyphicon-sort-by-alphabet float-right"></span>
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
                        <input onBlur={this.updateProduct.bind(this,i)} step="0.01" type="number" className="form-control" onChange={this.onChangeHandle.bind(this,'price',i)} value={product.price}  />
                    </td>
                    <td>
                        <input onBlur={this.updateProduct.bind(this,i)} type="number" className="form-control" onChange={this.onChangeHandle.bind(this,'qty',i)} value={product.qty}  />
                    </td>
                    <td>
                        <Toggle onBlur={this.updateProduct.bind(this,i)} checked={product.visible} onChange={this.onChangeHandle.bind(this,'visible',i)} />
                    </td>
                </tr>
              )}
              <tr>
                  <td>
                    <input className="form-control" onChange={this.onProductModelChangeHandle.bind(this,'name')} value={this.props.productModel.name}  />
                  </td>
                  <td>
                    <input className="form-control" step="0.01" type="number" onChange={this.onProductModelChangeHandle.bind(this,'price')} value={this.props.productModel.price}  />
                  </td>
                  <td>
                    <input className="form-control"  type="number" onChange={this.onProductModelChangeHandle.bind(this,'qty')} value={this.props.productModel.qty}  />
                  </td>
                  <td className="form-inline">
                    <button onClick={this.addProduct} className="form-control" ><span className="glyphicon glyphicon-triangle-left "></span>Add</button>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(AdminProductListTable);
