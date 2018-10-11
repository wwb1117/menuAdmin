import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/home'
import login from '@/views/login/login'
import { Message } from 'element-ui'
// import store from 'store'

Vue.use(Router)

var router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
            children: [
                {name: "统计", path: '/main', component: () => import('@/views/home/main')},
                {name: "桌码", path: '/deskCode', component: () => import('@/views/deskCode/index')},
                {name: "商品", path: '/goodList', component: () => import('@/views/good/goodList')},
                {name: "修改商品", path: '/editGood', component: () => import('@/views/good/editGood')},
                {name: "规格", path: '/SKUList', component: () => import('@/views/SKU/skuList')},
                {name: "新增商品", path: '/addGood', component: () => import('@/views/good/addGood')},
                {name: "类目", path: '/category', component: () => import('@/views/category/category')}
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: login
        }

    ]
})

router.beforeEach((to, from, next) => {
    // 登录拦截
    if (to.fullPath == '/'){
        if (sessionStorage.getItem('user')){
            next()
            return
        } else {
            Message({
                message: '会话已过期,请重新登录!',
                showClose: true,
                type: 'warning'
            });

            next({ path: '/login' })
            return
        }
    } else if (to.fullPath == '/login'){
        next();
        return
    } else if (to.fullPath == '/main'){
        //从其他页面跳转到首页相关操作
        next();
        return
    } else {
        if (sessionStorage.getItem('user')){
            next();
            return
        } else {
            Message({
                message: '会话已过期,请重新登录!',
                showClose: true,
                type: 'warning'
            });

            next({ path: '/login' })
            return
        }
    }
})

export default router
