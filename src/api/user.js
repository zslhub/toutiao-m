/*
用户请求相关模块
*/

import request from '@/utils/request'
// import store from "@/store/index";
// 登录
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data: data
    })
}

// 获取验证码
export const sendSms = (mobile) => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`
    })
}

// 获取用户自己信息
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user'
        // headers: {
        // headers固定写法请求头
        // token 的数据格式：Bearer token,Bearer后面有个空格
        // Authorization:`Bearer ${store.state.user.token}`    //从vuex容器中获取token
        // }
    })
}

// 获取用户频道列表
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}
