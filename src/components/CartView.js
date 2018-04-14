import {Link} from 'react-router-dom';
import React from 'react';
import agent from '../agent';
import {connect} from 'react-redux';
import {CART_VIEW_SECTION_LOADED} from '../action/action';
import MyTable from './MySection/MyTable';
import MyManagerView from './MySection/MyManagerView';
import CartProductListView from './CartView/CartProductListView';
import CartListView from './CartView/CartListView';

const mapStateToProps = state =>{
    return {
        cartModel : state.cartViewReducer.cartModel
    }
};

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

const mapDispatchToProps = dispatch =>({
    cartViewOnLoad : payload => dispatch({type:CART_VIEW_SECTION_LOADED,payload}),
});

class CartView extends React.Component{
    constructor(){
        super();
        //set inner text for action
        }
    componentWillMount(){
        const productPromise = agent.Product.list;
        let cartID = localStorage.getItem("cartID");
        
        if(cartID != undefined){
            const cartPromise = agent.Cart.get;
            this.props.cartViewOnLoad( Promise.all([productPromise(), cartPromise(cartID)]));
        }else{
            var newCart = Object.assign({},this.props.cartModel);
            newCart.id = guid();
            const cartPromise = agent.Cart.add;
            this.props.cartViewOnLoad( Promise.all([productPromise(), cartPromise(newCart)]));
        }
        
    }

    componentWillReceiveProps(props){
        console.log(props);
    }
    render(){
        var value = this.props.a;
        return(
            <div className="row">
                <div className="col-xs-7">
                    <CartProductListView />
                </div>
                <div className="col-xs-5">
                    <CartListView />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CartView);