/**
 * Created by Administrator on 2017/4/24.
 */
import * as config from './Config';

//解析config里的target对象
const {target} = config;

export const  Tool = {};

//返回一个参数的字符串形式
Tool.paramType = (data)=>{
    let paramArr = [];
    let parmStr = '';

    for (let attr in data){
        paramArr.push(attr + '='+data[attr]);
    }
    parmStr = paramArr.join('&');
    parmStr = '?' +parmStr;

    return parmStr;
}
// 给ajax封装一个promise
// 使用 ：ajax(url).then(function(response)).catch(function(err))
// 可以用fetch库来代替
Tool.ajax = (url)=>{
    //promise 接受2个函数作为参数，分别是resolve和reject。由js引擎提供，不用自己部署
    return new Promise((resolve,reject)=>{
        let xml = new XMLHttpRequest();
        /**
         * xhrReq.open(method, url, async);
         */
        xml.open('get',url,true);
        xml.onload = resolve;
        xml.onerror = reject;
        xml.send();
    })
}


let alertText = document.createElement('div');
alertText.setAttribute('id','alertText');

let alertDom = document.createElement('div');
alertDom.setAttribute('id','alertDom');
alertDom.appendChild(alertText);
document.body.appendChild(alertDom);

let timer = null;
Tool.alert = (msg1,msg2)=>{
    clearTimeout(timer);
    if(msg2){
        alertText = msg1 + "<div class='alert_bottom'>"+msg2+" </div>";
    }else {
        alertText.innerHTML = msg1;
    }

    alertDom.style.display = "block";
    alertDom.onclick=()=>{
        clearTimeout(timer);
        alertDom.style.display = 'none';
    }

    timer = setTimeout(()=>{
        alertDom.style.display = 'none';
        clearTimeout(timer)
    },3000)
};

Tool.getStyle= (obj,attr)=>{
    //ie兼容
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else {
        //document.defaultView 返回document 关联的Window对象，这么写算是黑魔法，兼容极小情况出现的火狐浏览器不识别。
        return document.defaultView.getComputedStyle(obj,null)[attr];//非ie
    }
};



Tool.nextPage = (dom,currentPage,totalPage,cb,shouldUpdate)=>{
    let update = shouldUpdate;
    let page =  currentPage;
    let domHeight = 0,
        offsetTop = 0,
        mtBot = 0,
        oldScrollTop = 0;

    dom.addEventListener('touchstart',()=>{
        domHeight = dom.offsetHeight;
        offsetTop = dom.offsetTop;
        mtBot = parseInt(Tool.getStyle(dom,'marginBottom'));
    },false);
    dom.addEventListener('touchmove',()=>{
        loadMore();
    },false);
    dom.addEventListener('touchend',()=>{
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    },false);

    let requestID ;
    let loadMore = ()=>{
        if((page<totalPage) && (update == true)){
            if(window.screen.height + document.body.scrollTop > domHeight + offsetTop + mtBot ){
                cancelAnimationFrame(requestID);
                page++;
                update = false;
                cb(page);
            }
        }
    };

    let moveEnd = ()=>{
        requestID = requestAnimationFrame(()=>{
            if(document.body.scrollTop != oldScrollTop){
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            }else {
                loadMore();
            }
        })
    }
};