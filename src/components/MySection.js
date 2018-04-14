import {Link} from 'react-router-dom';
import React from 'react';
import agent from '../agent';
import {connect} from 'react-redux';
import {MY_ACTION,MY_SECTION_LOADED} from '../action/action';
import MyTable from './MySection/MyTable';
import MyManagerView from './MySection/MyManagerView';

const mapStateToProps = state =>{
    return {a:state.myreducer.mykey,
        listProduct:state.myreducer.productList}
};

const mapDispatchToProps = dispatch =>({
    myAction: value => dispatch({type:MY_ACTION,key:'mySection',value}),
    myOnLoad : payload => dispatch({type:MY_SECTION_LOADED,payload})
});

class MySection extends React.Component{
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
        var value = this.props.a;
        return(
            <div>
                <h1 onClick={this.myAction}>This is my page</h1>
                <h2 attr={this.props.a}>{value}</h2>
                {/* <MyTable productList={this.props.listProduct}/> */}
                <MyManagerView productList={this.props.listProduct}/>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MySection);