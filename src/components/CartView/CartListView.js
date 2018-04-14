import React from 'react';
import CartProductTable from './CartProductTable';
import CartTable from './CartTable';


const CartListView = props => {
    const divStyle = {
        margin: '20px',
        border :'1px solid black',
        padding:'20px'
    }
    const spanStyle = {
        display:'block',
        position:'absolute',
        top:'1rem',
        left:'7rem',
        fontSize:'large',
        fontWeight:'bold',
        background:'white'
    }
    return (
      <div style={divStyle} >
        <span style={spanStyle}>Cart</span>
        <CartTable />
      </div>
    );
};

export default CartListView;
