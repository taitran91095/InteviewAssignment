import React from 'react';
import MyTable from './MyTable';
import MyFilter from './MyFilter';


const MyManagerView = props => {
    const divStyle = {
        margin: '20px',
        border :'1px solid black',
        padding:'20px'
    }
    const spanStyle = {
        display:'block',
        position:'absolute',
        top:'12rem',
        left:'7rem',
        fontSize:'large',
        fontWeight:'bold',
        background:'white'
    }
    return (
      <div style={divStyle} >
        <span style={spanStyle}>Product</span>
        <MyFilter />
        <MyTable />
      </div>
    );
};

export default MyManagerView;
