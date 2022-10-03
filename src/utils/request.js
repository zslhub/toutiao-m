// 请求模块
import axios from 'axios'
import store from '@/store'
const request = axios.create(
    {
        baseURL: 'http://toutiao.itheima.net/'
    }
)

// 请求拦截器
request.interceptors.request.use(function (config) {
    // 请求发起会经过这里
    // config：本次请求配置对象
    // console.log("本次请求配置对象",config)
    const { user } = store.state
    if (user && user.token) { // 如果容器中有用户信息并且有token
        config.headers.Authorization = `Bearer ${user.token}` // 请求头传入token
    }
    return config // 放行标记(修改后的配置对象)，这里务必返回config配置对象
}, function (error) {
    // 如果请求出错了（还没有发出去），会进入这里
    return Promise.reject(error)
})

export default request
