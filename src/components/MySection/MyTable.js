import React from 'react';
import Toggle from 'react-toggle';
import {connect} from 'react-redux';
import {SORT_LIST_INCREASE,SORT_LIST_DECREASE,MY_CHANGE_VALUE,
  NEW_PRODUCT_VALUE_CHANGE,ADD_NEW_PRODUCT} from '../../action/action';
import agent from '../../agent';

const mapStateToProps = state => ({
    productList : state.myreducer.productList,
    productModel : state.myreducer.productModel
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
      if(attr!= "visible"){
        return dispatch({ type: MY_CHANGE_VALUE, attr:attr,index:index,value:event.target.value});
      }else{
        console.log(event.target.checked);
        var value = (event.target.checked == true) ? false : true;
        console.log(value);
        return dispatch({ type: MY_CHANGE_VALUE, attr:attr,index:index,value:event.target.checked});
      }
    } ,
    onProductModelChangeHandle: (attr,event) =>{
      if(attr!= "visible"){
        return dispatch({ type: NEW_PRODUCT_VALUE_CHANGE, attr:attr,value:event.target.value});
      }else{
        return dispatch({ type: NEW_PRODUCT_VALUE_CHANGE, attr:attr,value:event.target.checked});
      }
    } ,
    addProduct: (payload) => dispatch({ type: ADD_NEW_PRODUCT ,payload}),
    updateProduct: (payload,index) => dispatch({ type: ADD_NEW_PRODUCT ,payload,index:index})
});


class MyTable extends React.Component {
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
                        <input onBlur={this.updateProduct.bind(this,i)} className="form-control" onChange={this.onChangeHandle.bind(this,'price',i)} value={product.price}  />
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
                    <input className="form-control" onChange={this.onProductModelChangeHandle.bind(this,'price')} value={this.props.productModel.price}  />
                  </td>
                  <td>
                    <input className="form-control" type="number" onChange={this.onProductModelChangeHandle.bind(this,'qty')} value={this.props.productModel.qty}  />
                  </td>
                  <td>
                    <input type="button" onClick={this.addProduct} value="Add" />
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(MyTable);
