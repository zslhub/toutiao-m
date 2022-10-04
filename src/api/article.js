/*
文章请求模块
*/
import request from '@/utils/request'

// 请求获取文章列表数据
export const getAticles = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params: params // params用来获取Query查询参数
    })
}
