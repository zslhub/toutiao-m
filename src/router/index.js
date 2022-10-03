import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
// 路由表
    {
        path: '/login', // 路由地址
        name: 'login', // 路由名称
        // 路由组件 懒加载
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '/', // 路由地址
        name: 'layout', // 路由名称
        // 路由组件 懒加载
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: '/home', // 路由地址 留空表示默认子路由，只能有一个
                name: 'home', // 路由名称
                // 路由组件 懒加载
                component: () => import('@/views/home/index.vue')
            },
            {
                path: '/qa', // 路由地址
                name: 'qa', // 路由名称
                // 路由组件 懒加载
                component: () => import('@/views/qa/index.vue')
            },
            {
                path: '/video', // 路由地址
                name: 'video', // 路由名称
                // 路由组件 懒加载
                component: () => import('@/views/video/index.vue')
            },
            {
                path: '/my', // 路由地址
                name: 'my', // 路由名称
                // 路由组件 懒加载
                component: () => import('@/views/my/index.vue')
            }
        ]

    }

]

const router = new VueRouter({
    routes
})

export default router
