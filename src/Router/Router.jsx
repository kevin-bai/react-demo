import React,{Component,PropTypes} from 'react'
import {Router,IndexRoute,Redirect,Route,browserHistory,hashHistory} from 'react-router';

import index from '../Component/index.jsp'

const history = process.env.NODE_ENV !== 'production' ? browserHistory :hashHistory;

class Roots extends Component{
    render(){
        return (
            <div>{this.props.children}</div>
        );
    }
}
/**
 *
 * @param location   means nextstate?
 * @param cb 回调
 */
const chooseProducts = (location,cb)=>{
    require.ensure([],(require)=>{
        cb(null,require('../Component/chooseProducts').default)
    },'chooseProducts')
};

const helpCenter = (location,cb)=>{
    require.ensure([],(require)=>{
        cb(null,require('../Component/helpCenter').default);
    },'helpCenter')
}

/**
 * Route组件上，component 和getComponent 指令区别是，getComponent按需加载，配合webpack的require.ensure使用
 */
const RouteConfig = (
    <Router histroy = {history}>
        <Route path = "/" component={Roots}>
            <IndexRoute component={index} />
            <Route path='/chooseProducts' getComponent={chooseProducts} />
            <Route path='/helpCenter' getComponent={helpCenter} />
            <Redirect from='*' to='/' />
        </Route>
    </Router>
);

export default RouteConfig;