import React,{Component,PropsTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {is,fromJS} from 'immutable';
import {} from 'react-redux';


class Main extends Component{
    constructor(props){
        //调用super的原因：在ES6中，在子类的constructor中必须先调用super才能引用this
        //super(props)的目的：在constructor中可以使用this.props
        //根本原因是constructor会覆盖父类的constructor，导致你父类构造函数没执行，所以手动执行下
        super(props);



    }
}

export default template({
    id:'helpCenter',
    component:Main,
    url:''
})