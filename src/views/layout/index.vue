<template>
    <div class="loyout-container">
        <!-- 子路由出口 -->
        <router-view />

        <!-- 标签导航栏 -->
        <van-tabbar v-model="active" class="layout-tabbar" route>
            <van-tabbar-item to="/home">
                <!-- tabbar的slot插槽：自定义图标 -->
                <i slot="icon" class="toutiao toutiao-shouye"></i>
                <span class="text">首页</span>
            </van-tabbar-item>
            <van-tabbar-item to="/qa">
                <i slot="icon" class="toutiao toutiao-wenda"></i>
                <span class="text">问答</span>
            </van-tabbar-item>
            <van-tabbar-item to="/video">
                <i slot="icon" class="toutiao toutiao-shipin"></i>
                <span class="text">视频</span>
            </van-tabbar-item>
            <van-tabbar-item to="/my">
                <i slot="icon" class="toutiao toutiao-wode"></i>
                <span class="text">{{$store.state.user ? "我的":"未登录"}}</span>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    name: 'LayoutIndex',
    components: {},
    props: {},
    data () {
        return {
            active: 0
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {}
}
</script>

<style scoped lang="less">
.loyout-container {
    .layout-tabbar {
        i.toutiao {
            font-size: 40px;
        }
        span.text{
            font-size: 20px;
        }
    }
}
</style>
