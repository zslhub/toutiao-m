<template>
    <div class="search-result">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :error.sync="error"
            error-text="加载失败，请点击重试！"
        >
            <van-cell
                v-for="(article, index) in list"
                :key="index"
                :title="article.title"
            />
        </van-list>
    </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
    name: 'SearchResult',
    components: {},
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            list: [],
            loading: false,
            finished: false,
            page: 1,
            perPage: 20,
            error: false
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        async onLoad () {
            try {
                // 1请求获取数据
                const { data } = await getSearchResult({
                    page: this.page,
                    per_page: this.perPage,
                    q: this.searchText
                })
                console.log('搜索结果', data)

                if (Math.random() > 0.5) {
                    this.$toast.fail('获取更多文章失败了,呜呜呜')
                    JSON.parse('模拟随机加载文章列表失败的情况')
                }

                // 2、将数据添加到数组列表中
                const { results } = data.data
                this.list.push(...results)
                // 3、将本次加载中的loading关闭
                this.loading = false
                // 4、判断是否还有数据
                if (results.length) {
                    // 如果有，则更新获取下一个数据的页码
                    this.page++
                } else {
                    // 如果没有，则将加载状态 finished 设置为结束
                    this.finished = true
                }
            } catch (error) {
                this.error = true
                this.loading = false
                this.$toast.fail('数据加载失败，请稍后重试！')
            }
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        }
    }
}
</script>

<style scoped lang="less"></style>
