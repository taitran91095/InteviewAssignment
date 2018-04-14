import React from 'react';
import AdminProductListTable from './AdminProductListTable';
import AdminProductListFilter from './AdminProductListFilter';


const AdminProductListView = props => {
    const divStyle = {
        margin: '20px',
        border :'1px solid black',
        padding:'20px'
    }
    const spanStyle = {
        display:'block',
        position:'absolute',
        top:'-1.4rem',
        left:'7rem',
        fontSize:'large',
        fontWeight:'bold',
        background:'white'
    }
    return (
      <div style={divStyle} className="col-xs-11" >
        <span style={spanStyle}>Product</span>
        <AdminProductListFilter />
        <AdminProductListTable />
      </div>
    );
};

export default AdminProductListView;
