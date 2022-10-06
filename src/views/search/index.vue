<template>
    <div class="search-container">
        <!-- Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
        <form action="/" class="search-form">
            <van-search
                shape="round"
                background="#3296fa"
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel"
                @focus="isResultShow = false"
            />
        </form>
        <!-- 搜索结果 -->
        <search-result
            v-if="isResultShow"
            :search-text="searchText"
        ></search-result>

        <!-- 联想建议 -->
        <search-suggestion
            @search="onSearch"
            v-else-if="searchText"
            :search-text="searchText"
        ></search-suggestion>

        <!-- 搜索历史 -->
        <search-history
            v-else
            :search-historys="SearchHistorys"
            @clear-search-historys="SearchHistorys = []"
            @clearOne = "searchClearOne"
            @search="onSearch"
        ></search-history>
    </div>
</template>

<script>
import { setItem, getItem } from '@/utils/storage'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
export default {
    name: 'SearchIndex',
    components: {
        SearchHistory,
        SearchResult,
        SearchSuggestion
    },
    props: {},
    data () {
        return {
            searchText: '',
            isResultShow: false, // 控制搜索结果的展示
            SearchHistorys: getItem('TOUTIAO_SEARCH_HISTORY') || [] // 历史记录
        }
    },
    computed: {},
    watch: {
        SearchHistorys (val) {
            setItem('TOUTIAO_SEARCH_HISTORY', val)
        }
        // SearchHistorys: {
        //     handler(){}
        // }
    },
    created () {},
    mounted () {},
    methods: {
        onSearch (val) {
            console.log(val)
            // 更新文本框数据
            this.searchText = val

            // 存储搜索历史记录
            // 要求：不能存储有重复的历史记录、最新的排在最前面

            const index = this.SearchHistorys.indexOf(val) // 找出SearchHistorys与val等价的索引，indexOf：得到比较数据中相同值的索引
            if (index !== -1) {
                this.SearchHistorys.splice(index, 1) // 删除重复的索引值
            }
            this.SearchHistorys.unshift(val)

            // 搜索结果的展示
            this.isResultShow = true
        },
        onCancel () {
            this.$router.back()
        },
        searchClearOne (index) {
            this.SearchHistorys.splice(index, 1)
        }
    }
}
</script>

<style scoped lang="less">
.search-container {
    padding-top: 108px;
    .search-form {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }
    .van-search__action {
        color: white;
    }
}
</style>
