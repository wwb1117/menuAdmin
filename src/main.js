// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'jquery'
// 引入代码填充,解决浏览器兼容问题n
import 'babel-polyfill'
import myBase from './utils/base'

import 'element-ui/lib/theme-chalk/index.css' //引入elementUI主题样式

// 引入全局css
import './assets/css/bootstrap.css'
import './assets/css/animate.css'
import './assets/css/font-awesome.min.css'
import './assets/css/simple-line-icons.css'
import './assets/css/font.css'

// 自定义公共样式文件
import './assets/css/app.css'

Vue.config.productionTip = false
Vue.prototype.myBase = myBase

// 进入页面重新获取屏幕可视高度
var winheight = document.documentElement.clientHeight;
var winwidth = document.documentElement.clientWidth;

store.commit('setDevice', {width: winwidth, height: winheight});
store.commit('setModelContentHeight', winheight - 100);
store.commit('setModelContentWidth', winwidth - 220);

var userInfo = window.localStorage.getItem("userInfo")
var menuId = window.localStorage.getItem("currentMenuId")

userInfo = JSON.parse(userInfo)

store.commit('setUserInfo', userInfo)
store.commit('setCurrentMenuId', menuId)

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})

window.onresize = function(){
    winheight = document.documentElement.clientHeight
    winwidth = document.documentElement.clientWidth
    if (winheight < 700){
        winheight = 700
    }
    if (winwidth < 1380){
        winwidth = 1380
    }

    store.commit('setDevice', {width: winwidth, height: winheight})
    store.commit('setModelContentHeight', winheight - 100)
    store.commit('setModelContentWidth', winwidth - 220);
}
