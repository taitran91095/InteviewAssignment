import React from 'react';
import {connect} from 'react-redux';
import {ADD_PRODUCT_TO_CART} from '../../action/action';
import agent from '../../agent';

const mapStateToProps = state => ({
    cartProductList : state.cartViewReducer.cartProductList,
    cartList:state.cartViewReducer.cartList,
    //productModel : state.myreducer.productModel
});



const mapDispatchToProps = dispatch => ({
  addProductToCart : payload =>dispatch({type:ADD_PRODUCT_TO_CART,payload})
});


class CartProductTable extends React.Component {
  constructor(){
    super();
    this.addProductToCart = (index,event) =>{
      let addProduct = this.props.cartProductList[index];
      //let productList = this.props.cartList.productList;
      let alreadyAdd = false;
      for(let i =0 , n = this.props.cartList.productList.length; i <n ;i++ ){
        if(this.props.cartList.productList[i].id == addProduct.id){
          this.props.cartList.productList[i].qty++;
          alreadyAdd = true;
          break;
        }
      }
      if(!alreadyAdd){
        addProduct.qty = 1;
        this.props.cartList.productList.push(addProduct);
      }
      let total = 0;
      for(let i =0 , n = this.props.cartList.productList.length; i <n ;i++ ){
        total += parseFloat(this.props.cartList.productList[i].price) * parseInt(this.props.cartList.productList[i].qty,10);
      }
      this.props.cartList.total = total;
      return this.props.addProductToCart(agent.Cart.update(this.props.cartList));
    }

    }

  
  render(){
    if(this.props.cartProductList.length < 1){
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
                Add
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
                      Add
                  </th>
              </tr>
              {this.props.cartProductList.map((product,i) =>
                <tr key={i}>
                    <td>
                        {product.name}
                    </td>
                    <td>
                        {product.price}
                    </td>
                    <td className="form-inline">
                        <button className="form-control" onClick={this.addProductToCart.bind(this,i)}><span className="glyphicon glyphicon-shopping-cart"></span>Add</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(CartProductTable);
