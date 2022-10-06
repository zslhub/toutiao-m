<template>
    <div class="search-history">
        <van-cell title="搜索历史">
            <div v-if="isDeleteShow">
                <!-- 发布通知父组件的自定义事件 -->
                <span @click="$emit('clear-search-historys', [])"
                    >全部删除</span
                >
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span @click="isDeleteShow = false">完成</span>
            </div>

            <van-icon name="delete-o" v-else @click="isDeleteShow = true" />
        </van-cell>
        <van-cell
            @click="onSearchItemClick(item, index)"
            :title="item"
            v-for="(item, index) in SearchHistorys"
            :key="index"
        >
            <van-icon name="close" v-show="isDeleteShow" />
        </van-cell>
    </div>
</template>

<script>
export default {
    name: 'SearchHistory',
    components: {},
    props: {
        /*
            //props数据
            如果是普通数据，比如字符串，数字，布尔值，是不能修改的
            如果是引用类型数据，
            可以修改:[].push(xxx)
            不能重新赋值: xxx = []
        */
        SearchHistorys: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            isDeleteShow: false // 控制删除显示状态
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        onSearchItemClick (item, index) {
            if (this.isDeleteShow) {
                // 删除状态，点击删除历史记录数据
                // const res = this.SearchHistorys.splice(index, 1)     //此写法虽然可以实现功能，但不推荐
                this.$emit('clearOne', index)
            } else {
                // 非删除状态，点击进入搜索
                this.$emit('search', item)
            }
        }
    }
}
</script>

<style scoped lang="less"></style>
