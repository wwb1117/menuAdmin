import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/home'
import login from '@/views/login/login'

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

export default router
