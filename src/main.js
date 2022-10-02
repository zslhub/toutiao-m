import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载全局样式
import './styles/less/index.less'
// 加载vant核心组件库
import Vant from 'vant'
// 加载vant全局样式
import 'vant/lib/index.css'
// 加载动态设置REM基准值组件
import 'amfe-flexible'
// 注册使用vant组件库
Vue.use(Vant)
Vue.config.productionTip = false

//
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
