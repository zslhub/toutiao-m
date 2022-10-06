<template>
    <div class="search-suggestion">
        <van-cell
            v-for="(text, index) in suggestions"
            :key="index"
            icon="search"
            @click="$emit('search',text)"
        >
        <!-- v-html可以绑定渲染带有HTML标签的字符串 -->
            <div slot="title" v-html="highlight(text)"></div>
        </van-cell>
    </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
    name: 'SearchSuggestion',
    components: {
    },
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            suggestions: []
        }
    },
    computed: {},

    // 监听数据，监听谁写谁
    watch: {
        searchText: {
            // 当searchText发生改变时就会调用handler函数，handler是固定函数语法规则
            // handler(values) {
            //     //values输入的文本
            //     this.loadSearchSuggestions(values);
            // },

            // debounce 防抖函数
            handler: debounce(function (value) {
                this.loadSearchSuggestions(value)
            }, 300),
            immediate: true // 将会在侦听开始之后被立即调用
        }
    },
    created () {},
    mounted () {},
    methods: {
        async loadSearchSuggestions (q) {
            try {
                const { data } = await getSearchSuggestions(q)
                console.log(data)
                this.suggestions = data.data.options
                console.log('得到联想建议数据', this.suggestions)
            } catch (error) {
                this.$toast('数据获取失败，请稍后重试！')
            }
        },
        highlight (text) {
            // 正则表达式//中间的内容都会当做匹配的字符串来使用，而不是数据变量
            // 如果需要根据数据变量动态的创建正则表达式，则需要手动 new RegExp() 构造函数的对象
            // 参数1：匹配模式字符串，他会根据这个字符串创建正则对象
            // 参数2：匹配模式，要写到字符串中
            const highlightStr = `<span class="active">${this.searchText}</span>`
            const reg = new RegExp(this.searchText, 'gi') // g全局 i忽略大小写
            return text.replace(reg, highlightStr)
        }
    }
}
</script>

<style scoped lang="less">
.search-suggestion {
    /deep/span.active {
        color: red;
    }
}
</style>
