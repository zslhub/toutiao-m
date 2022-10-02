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
    }
]

const router = new VueRouter({
    routes
})

export default router
