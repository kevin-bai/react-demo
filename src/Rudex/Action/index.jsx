import fetch from 'isomorphic-fetch';
import {target} from '../../Config/Config';
import {Tool} from '../../Config/tools';

export const SET_STATE = 'SET_STATE';
export const REQUEST_POST = 'REQUEST_POST';

//开始获取数据
const requestPost = (path)=>{
    return {
        type: REQUEST_POST,
        path
    }
};


//获取数据成功
const receivePost = (path,json)=>{
    return {
        
    }
};
