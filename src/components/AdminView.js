import React from 'react';
import agent from '../agent';
import {connect} from 'react-redux';
import {ADMIN_VIEW_SECTION_LOADED} from '../action/action';
import AdminProductListView from './AdminView/AdminProductListView';

const mapStateToProps = state =>{
    return {
        listProduct:state.adminViewReducer.productList}
};

const mapDispatchToProps = dispatch =>({
    myOnLoad : payload => dispatch({type:ADMIN_VIEW_SECTION_LOADED,payload})
});

class AdminView extends React.Component{
    constructor(){
        super();
        //set inner text for action
        this.myAction = event => this.props.myAction(event.target.innerText);
        }
    componentWillMount(){
        const productPromise = agent.Product.list;
        this.props.myOnLoad((productPromise()));
    }

    componentWillReceiveProps(props){
        console.log(props);
    }
    render(){
        return(
            <div>
                <AdminProductListView />
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminView);