// postcss.config.js
module.exports = {
    // 配置使用 PostCss 插件
    plugins: {
        // 配置使用autoprefixer 插件
        // 作用: 生成浏览器CSS的样式规则前缀
        // vue cli 内部已经配置了autoprefixer
        // 'autoprefixer': // 插件的配置
        // {
        //   // 配置要兼容的环境信息
        //   browsers:['Android >=4.0','iOS >= 8']
        // },

        // 配置使用的postcss-pxtorem插件
        // 作用：把px转换为rem
        'postcss-pxtorem': {
        // lib-flexible 的适配方案：把一行分为10份，所以rootValue应该设置为设计稿的十分之一
        // 我们的设计稿是750，所以应该是750/10 = 75
        // 但是vant建议设置为37.5，vant是基于375写的

            // 更好的方法？vant的样式 37.5转换,自己的样式 75转换
            // rootValue 支持 固定数值，函数动态返回
            // postcss-pxtorem 处理每个css 文件的时候都会调用这个函数，他会把被处理的css文件相关信息通过参数传递给该函数
            rootValue ({ file }) {
                // console.log('处理的css文件' + file)
                return file.indexOf('vant') !== -1 ? 37.5 : 75
                // return 37.5
            },
            propList: ['*'] // 配置要转换的css属性， *号表示所有
        }
    }
}
