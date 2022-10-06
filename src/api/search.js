import request from '@/utils/request'
// import store from "@/store/index";
// 登录
/*
- 找到数据接口
- 封装请求方法
- 请求获取数据
- 模板绑定
*/
export const getSearchSuggestions = (q) => {
    return request({
        method: 'GET',
        url: '/v1_0/suggestion',
        params: { q }
    })
}

export const getSearchResult = params => {
    return request({
        method: 'GET',
        url: '/v1_0/search',
        params: params
    })
}
