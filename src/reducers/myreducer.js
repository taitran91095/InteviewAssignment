import {MY_ACTION,MY_SECTION_LOADED,SORT_LIST_INCREASE,
    SORT_LIST_DECREASE,MY_CHANGE_VALUE,NEW_PRODUCT_VALUE_CHANGE,
    ADD_NEW_PRODUCT,UPDATE_PRODUCT,FILTER_CHANGE,FILTER_PRODUCT} from '../action/action';
    
    function guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }

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
        case MY_ACTION:
            return{...state,mykey: action.value};
        case MY_SECTION_LOADED:
            if(action.payload != null){
                return{...state,productList: action.payload.slice(),productListOriginal: action.payload.slice()};
            }
            else{
                return{...state,productList: state.productList.slice(),productListOriginal: state.productList.slice()};
            }
        case SORT_LIST_INCREASE:
            var temp = action.productList.sort(compare)
            console.log(state);
            return{...state,productList: state.productList.slice(0,0).concat(temp),productListOriginal: state.productList.slice(0,0).concat(temp)};
        case SORT_LIST_DECREASE:
            var temp = action.productList.sort(compareD)
            console.log(state);
            return{...state,productList: state.productList.slice(0,0).concat(temp),productListOriginal: state.productList.slice(0,0).concat(temp)};
        case MY_CHANGE_VALUE:
            console.log(action.value);
            state.productList[action.index][action.attr] = action.value;
            return{...state,productList: state.productList.slice()};
        case NEW_PRODUCT_VALUE_CHANGE:
            state.productModel[action.attr] = action.value;
            return{...state,productModel: Object.assign({},state.productModel)};
        case ADD_NEW_PRODUCT:
            state.productList.push(action.payload);
            return{...state,productModel: state.productList.slice(),productListOriginal: state.productList.slice()};
        case UPDATE_PRODUCT:
            state.productList[action.index](action.payload);
            return{...state,productModel: state.productList.slice(),productListOriginal: state.productList.slice()};
        case FILTER_PRODUCT:
            if(state.filter != undefined && state.filter != "")
            {
                console.log(state.filter)
                var tempArr = state.productListOriginal.slice().filter(product => (product.name.includes(state.filter)));
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