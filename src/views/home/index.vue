<template>
    <div class="home-cantainer">
        <van-nav-bar class="page-nav-bar" fixed>
            <van-button
                class="search-btn"
                slot="title"
                type="info"
                round
                size="small"
                icon="search"
                >搜索</van-button
            >
        </van-nav-bar>
        <van-tabs class="channel-tabs" v-model="active" animated swipeable>
            <van-tab
                v-for="channel in channels"
                :title="channel.name"
                :key="channel.id"
                >
                <!-- 文章列表组件 -->
                <article-list :channel="channel"></article-list>
                </van-tab
            >
            <div slot="nav-right" class="plc"></div>
            <div slot="nav-right" class="hbg-btn">
                <i class="toutiao toutiao-gengduo"></i>
            </div>
        </van-tabs>
    </div>
</template>

<script>
import ArticleList from './components/article-list.vue'
import { getUserChannels } from '@/api/user'
export default {
    name: 'HomeIndex',
    components: { ArticleList },
    props: {},
    data () {
        return {
            active: 0,
            channels: [] // 存储获取到的用户频道列表
        }
    },
    computed: {},
    watch: {},
    created () {
        this.loadChannels()
    },
    mounted () {},
    methods: {
        async loadChannels () {
            try {
                const { data } = await getUserChannels() // 调用请求频道列表接口
                this.channels = data.data.channels
                console.log('获取频道列表成功！', data)
                this.$toast.success('获取频道列表成功！')
            } catch (error) {
                this.$toast.fail('获取频道失败！')
            }
        }
    }
}
</script>

<style scoped lang="less">
//scoped 实现了组件样式的私有化，不对全局造成样式污染，添加了scoped的style中的css样式只作用于当前组件中的元素。
.home-cantainer {
    padding-top: 174px;
    padding-bottom: 100px;
    width: 750px;
    /deep/.van-nav-bar__title {
        // /deep/或>>> 作用子组件的样式，如果在一个作用域样式当中，默认只能作用到根节点
        max-width: 80%;
    }
    .search-btn {
        width: 555px;
        height: 64px;
        color: #5babfb;
        border: none;
        font-size: 28px;
        .van-icon {
            font-size: 32px;
        }
    }
    /deep/.channel-tabs {
        .van-tabs__wrap {
            position: fixed;
            z-index: 1;
            left: 0;
            right: 0;
            top: 92px;
            height: 82px;
        }
        .van-tabs__nav {
            padding-bottom: 0px;
        }
        .van-tab {
            width: 200px;
            border-right: 1px solid #edeff3;
            font-size: 30px;
            color: #777777;
        }
        .van-tab--active {
            color: #333333;
        }
        .van-tabs__line {
            width: 31px;
            height: 6px;
            background-color: #3296fa;
            bottom: 8px;
        }
        .plc {
            flex-shrink: 0; //不参与空间计算
            width: 49px;
            height: 82px;
        }
        .hbg-btn {
            position: fixed; //固定定位
            right: 0;
            display: flex;
            width: 66px;
            height: 82px;
            justify-content: center; //水平居中
            align-items: center; //垂直居中
            background-color: #fff;
            opacity: 0.902; //透明度

            i.toutiao {
                font-size: 33px;
            }
            &:before {
                //&找到父级
                content: "";
                width: 1px;
                height: 100%;
                left: 0;
                position: absolute;
                background-image: url(@/assets/gradient-gray-line.png);
                background-size: contain; //填充模式
            }
        }
    }
}
</style>
