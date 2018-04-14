import {ADMIN_VIEW_SECTION_LOADED,SORT_LIST_INCREASE,
    SORT_LIST_DECREASE,PRODUCT_LIST_CHANGE_VALUE,NEW_PRODUCT_VALUE_CHANGE,
    ADD_NEW_PRODUCT,UPDATE_PRODUCT,FILTER_CHANGE,FILTER_PRODUCT} from '../action/action';

    function compare(a,b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
    }

    function compareD(a,b) {
    if (a.name < b.name)
      return 1;
    if (a.name > b.name)
      return -1;
    return 0;
    }


  const initialState = {
    productList: [],
    productModel:{
        "id": "",
        "name": "",
        "price": "",
        "qty": "",
        "visible": false
    }
  };

export default (state=initialState,action) =>{
    switch(action.type){
        case ADMIN_VIEW_SECTION_LOADED:
            if(action.payload != null){
                return{...state,productList: action.payload.slice(),productListOriginal: action.payload.slice()};
            }
            else{
                return{...state,productList: state.productList.slice(),productListOriginal: state.productList.slice()};
            }
        case SORT_LIST_INCREASE:
            return{...state,productList: state.productList.slice().sort(compare)};
        case SORT_LIST_DECREASE:
            return{...state,productList: state.productList.slice().sort(compareD)};
        case PRODUCT_LIST_CHANGE_VALUE:
            state.productList[action.index][action.attr] = action.value;
            return{...state,productList: state.productList.slice()};
        case NEW_PRODUCT_VALUE_CHANGE:
            state.productModel[action.attr] = action.value;
            return{...state,productModel: Object.assign({},state.productModel)};
        case ADD_NEW_PRODUCT:
            state.productList.push(action.payload);
            return{...state,productModel: state.productList.slice(),productListOriginal: state.productList.slice(),productModel: {"id":"","name":"","price":"","qty":"","visible":false}};
        case UPDATE_PRODUCT:
            state.productList[action.index](action.payload);
            return{...state,productModel: state.productList.slice(),productListOriginal: state.productList.slice()};
        case FILTER_PRODUCT:
            if(state.filter != null && state.filter != "")
            {
                console.log(state.filter)
                var tempArr = state.productListOriginal.slice().filter(product => (product.name.toUpperCase().includes(state.filter.toUpperCase())));
                console.log(tempArr);
                return{...state,productList: tempArr};
            }else{
                return{...state,productList: state.productListOriginal.slice()};
            }
        case FILTER_CHANGE:
            return{...state,filter:action.value}
        default:
            return state;
    }
}