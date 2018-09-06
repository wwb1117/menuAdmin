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
                {name: "首页", path: '/main', component: () => import('@/views/home/main')}
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
