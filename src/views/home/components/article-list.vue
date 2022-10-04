<template>
    <div class="article-list">
        <!--
        List 列表组件：瀑布流滚动加载，用于展示长列表。

        List 组件通过 loading 和 finished 两个变量控制加载状态，
        当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
        数据更新完毕后，将 loading 设置成 false 即可。
        若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

        - load 事件：
            + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
            + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

        - loading 属性：控制加载中的 loading 状态
            + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
            + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

        - finished 属性：控制加载结束的状态
            + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
            + 所有数据加载结束，finished 为 true，此时不会触发 load 事件
        -->
        <van-pull-refresh
            :success-text="refreshSuccessText"
            v-model="isreFreshLoading"
            @refresh="onRefresh"
            success-duration="500"
        >
            <van-list
                :error.sync="error"
                error-text="失败啦，点击重新加载"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <van-cell
                    v-for="(article, index) in list"
                    :key="index"
                    :title="article.title"
                />
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getAticles } from '@/api/article'
export default {
    name: 'ArticleList',
    components: {},
    props: {
        channel: {
            type: Object,
            requireed: true
        }
    },
    data () {
        return {
            list: [], // 存储文章列表的数组
            loading: false, // 列表加载效果
            finished: false, // 列表加载完成效果
            timestamp: null,
            error: false,
            isreFreshLoading: false,
            refreshSuccessText: '刷新成功'
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        // 初始化或滚动到底部会触发调用onload
        // onLoad() {
        //     //请求获取数据

        //     // 异步更新数据
        //     // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        //     setTimeout(() => {
        //         //把请求数据放到list数组中
        //         for (let i = 0; i < 10; i++) {
        //             this.list.push(this.list.length + 1);
        //         }

        //         // 加载状态结束
        //         this.loading = false;

        //         // 数据全部加载完成
        //         if (this.list.length >= 40) {
        //             this.finished = true;
        //         }
        //     }, 1000);
        // },
        async onLoad () {
            try {
                // 1请求获取数据
                const { data } = await getAticles({
                    timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
                    channel_id: this.channel.id // 频道ID
                })
                const { results } = data.data

                if (Math.random() > 0.5) {
                    this.$toast.fail('获取更多文章失败了,呜呜呜')
                    JSON.parse('模拟随机加载文章列表失败的情况')
                }
                // 2把请求数据放到list数组中
                this.list.push(...results) // 把获取到的数组展开放到list数组中
                // console.log("请求文章列表成功！", results);
                // 3加载状态结束
                this.loading = false
                if (results.length) {
                    this.timestamp = data.data.pre_timestamp
                } else {
                    // 没有数据了，将finished设置为true，不再加载更多
                    this.finished = true
                }
                // 4数据全部加载完成
            } catch (error) {
                console.log('请求失败了', error)
                // 展示错误提示
                this.error = true
                // 请求失败，lodaing也要关闭
                this.loading = false
            }
        },

        // 当下拉刷新的时候会调用该函数
        async onRefresh () {
            try {
                // 请求获取数据
                const { data } = await getAticles({
                    timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
                    channel_id: this.channel.id // 频道ID
                })

                if (Math.random() > 0.5) {
                    this.$toast.fail('刷新失败了,呜呜呜')
                    JSON.parse('模拟随机加载文章列表失败的情况')
                }
                // 刷新了将数据追加到列表的顶部
                this.list.unshift(...data.data.results) // 把得到的数据放在数组最前面
                // 关闭下拉刷新的状态
                this.isreFreshLoading = false
                const { results } = data.data
                this.refreshSuccessText = `nice!你又找到了${results.length}个宝藏！`
            } catch (error) {
                console.log('刷新失败了')
                this.refreshSuccessText = '刷新失败了'
                this.isreFreshLoading = false
            }
        }
        /*
    关于滚动列表后没有记住的问题
    因为并不是在自己内部滚动，而是整个body页面在滚动.无论你是滚动a或b频道，滚动的都是body节点，相当于你滚动a频道时也把b也滚动了
    解决方法：让每一个文章列表都产生自己的滚动容器，这样就不会相互影响了

    下面的代码输入到浏览器控制台可以获得滚动的节点
    function findScroller(element)
    {
    element.onscroll = function ()
    {
            console.log(element)
    }
        Array.from(element.children).forEach(findScroller)
    }
    findScroller(document.body)

    如何给滚动的列表产生自己的容器？
    固定高度：height: xxx;
    溢出滚动：overflow-y: auto;

    然后我们给文章节点列表组件的根节点添加样式如下
    height: 100%;
    overflow-y: auto;

    但是我们发现设置高度没有用这是为什么？
    因为百分百是相对于父元素，而我们通过审查元素发现他所有的父元素都没有高，当然没作用了
    所以我们要给父元素设置高度，但是如果父元素太多就要给所有的父元素设置高太麻烦了，
    怎么解决呢？
    css3中新增了视口单位vw和vh，视口就是根据你浏览器窗口的大小的单位，不受父元素影响(重点)
    在移动端，视口单位相对于布局视口
    1vw = 可视窗口宽度的百分之一，比如窗口宽度是750，则1vw = 7.5px
    1vh = 可视窗口高度的百分之一，比如窗口宽度是667，则1vh = 6.67px

    兼容性：
    PC端只兼容到IE9
    移动端支持到iOS8和Android4.4，并且在微信x5内核也完美支持

*/

    }
}
</script>

<style scoped lang="less">
    .article-list
    {
        height: 80vh;
        overflow-y: auto;
    }
</style>
