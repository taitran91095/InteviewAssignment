import {CART_VIEW_SECTION_LOADED,ADD_PRODUCT_TO_CART,QUANTITY_CHANGE,CART_FILTER_CHANGE} from '../action/action';
    
  const initialState = {
    cartProductList: [],
    cartList:{},
    filter: "",
    cartModel:{
        "id": "",
        "total": 0,
        "productList":[]
    },
    productInCartModel:{
        "id": "",
        "name": "",
        "price": 0,
        "qty": 0
    }
  };

export default (state=initialState,action) =>{
    switch(action.type){
        case CART_VIEW_SECTION_LOADED:
            if(action.payload != null){
                let tempCartProductList = action.payload[0].slice().filter(product => (product.visible == true))
                return{...state,cartProductList: tempCartProductList,originalCartProductList: tempCartProductList,cartList:Object.assign({},action.payload[1])};
            }
            else{
                return{...state,cartProductList: state.productList.slice(),originalCartProductList: state.productList.slice(),cartList:Object.assign({},action.payload[1])};
            }
        case ADD_PRODUCT_TO_CART:
            return {...state,cartList:Object.assign({},action.payload)};
        case QUANTITY_CHANGE:
            return {...state,cartList:Object.assign({},action.cart)};
        case CART_FILTER_CHANGE:
            let tempCartProductList = [];
            if(action.value != null && action.value != ""){
                tempCartProductList = state.originalCartProductList.slice().filter(product => (product.name.toUpperCase().includes(action.value.toUpperCase())));
            }else{
                tempCartProductList = state.originalCartProductList.slice();
            }
            return {...state,filter:action.value,cartProductList:tempCartProductList}
        default:
            return state;
    }
}