import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'

// vuex容器/状态管理：为了访问数据方便，数据是响应式的，不是持久化的
export default new Vuex.Store({
    // state存放数据
    state: {
        user: getItem(TOKEN_KEY)
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))//JSON.parse把字符串转换为对象，因为本地存储的是字符串要转换为对象
    },
    getters: {
    },
    // mutations同步更新数据
    mutations: {
        setUser (state, data) {
            state.user = data
            // 持久化：为了防止刷新丢失数据，我们需要把数据存储到本地
            // window.localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user)) //JSON.stringify:把对象转换为JSON格式的字符串,因为本地存储只能存字符串，如果这里不做转换，就会把对象转换为字符串object Object
            setItem(TOKEN_KEY, state.user)
        }
    },
    // actions则负责进行异步操作
    actions: {
    },
    modules: {
    }
})
