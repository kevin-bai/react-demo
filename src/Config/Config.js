/**
 * Created by Administrator on 2017/4/24.
 */
import FastClick from './fastclick.js';

//felxiable rem
((doc,win)=>{
    const docEl = doc.documentElement,
        resizeEvent = 'orientationchange' in win ? 'orientationchange': 'resize',
        recalc = ()=>{
            let clientWidth = docEl.clientWidth;
            if(!clientWidth){return}
            docEl.clientWidth = 20*(clientWidth/320) +'px';
        };
    if(!doc.addEventListener){return}
    //当屏幕发生旋转的时候，触发节点计算
    win.addEventListener(resizeEvent,recalc,false);
    //当文档流加载完成是，触发根节点计算
    doc.addEventListener('DOMContentLoaded',recalc,false)
})(document,window);

//fastclick
if('addEventListener' in window){
    document.addEventListener('DOMContentLoaded',function () {
        FastClick.attach(document.body)
    },false)
}

//useragent
const system = (()=>{
    let u = window.userAgent;
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    let isAndroid = u.indexOf('android') > -1 || u.indexOf('Linux');
    let system;
    if(isAndroid){
        system = 'android'
    }
    if(isIOS){
        system = 'ios'
    }
    return system;
})();

// env
const target = process.env.NODE_ENV !== 'production' ? '':'http://dev.fe.ptdev.cn'; //目标网站;

export  {
    target,
    system
}