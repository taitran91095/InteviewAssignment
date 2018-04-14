import React from 'react';
import Toggle from 'react-toggle';
import {connect} from 'react-redux';
import {SORT_LIST_INCREASE,SORT_LIST_DECREASE,MY_CHANGE_VALUE,
  NEW_PRODUCT_VALUE_CHANGE,ADD_NEW_PRODUCT,ADD_PRODUCT_TO_CART,QUANTITY_CHANGE} from '../../action/action';
import agent from '../../agent';

const mapStateToProps = state => ({
    cartProductList : state.cartViewReducer.cartProductList,
    cartList : state.cartViewReducer.cartList,
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
  addProductToCart : payload =>dispatch({type:ADD_PRODUCT_TO_CART,payload}),
  handleCartQuantityChange : cart => dispatch({type:QUANTITY_CHANGE,cart})
});


class CartTable extends React.Component {
  constructor(){
    super();
    this.addProductToCart = (index,event) =>{
      this.props.cartList.productList[index].qty = event.target.value;
     let total = 0;
      for(let i =0 , n = this.props.cartList.productList.length; i <n ;i++ ){
        total += parseFloat(this.props.cartList.productList[i].price) * parseInt(this.props.cartList.productList[i].qty);
      }
      this.props.cartList.total = total;
      return this.props.addProductToCart(agent.Cart.update(this.props.cartList));
    };

    this.handleCartQuantityChange = (index,event) =>{
      this.props.cartList.productList[index].qty = event.target.value;
      return this.props.addProductToCart(this.props.cartList);
    };
    }

  
  render(){
    if(this.props.cartList.productList == undefined){
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
                Quantity
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
                  </th>
                  <th>
                      Price
                  </th>
                  <th>
                      Quantity
                  </th>
              </tr>
              {this.props.cartList.productList.map((product,i) =>
                <tr key={i}>
                    <td>
                        {product.name}
                    </td>
                    <td>
                        {product.price}
                    </td>
                    <td>
                      <input type="number" value={product.qty} onChange={this.handleCartQuantityChange.bind(this,i)} onBlur={this.addProductToCart.bind(this,i)} />
                    </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="total">
              {`Total: ${this.props.cartList.total}` }
          </div>
        </div>
      );
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CartTable);
