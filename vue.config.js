const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})
module.exports = { // 关闭vue Eslint检测校验
    lintOnSave: false
}
