import React from 'react';
import {connect} from 'react-redux';
import {ADD_PRODUCT_TO_CART,QUANTITY_CHANGE} from '../../action/action';
import agent from '../../agent';

const mapStateToProps = state => ({
    cartProductList : state.cartViewReducer.cartProductList,
    cartList : state.cartViewReducer.cartList,
});


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
        total += parseFloat(this.props.cartList.productList[i].price) * parseInt(this.props.cartList.productList[i].qty,10);
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
    if(this.props.cartList.productList == null){
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
                      <input className="form-control" type="number" value={product.qty} onChange={this.handleCartQuantityChange.bind(this,i)} onBlur={this.addProductToCart.bind(this,i)} />
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
