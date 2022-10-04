<template>
    <div class="my-cantainer">
        <!-- 已登录头部 -->
        <div v-if="user" class="header user-info">
            <div class="base-info">
                <div class="left">
                    <van-image
                        fit="cover"
                        round
                        class="avatar"
                        :src="userInfo.photo"
                    />
                    <span class="name">{{ userInfo.name }}</span>
                </div>
                <div class="right">
                    <van-button round size="mini">编辑资料</van-button>
                </div>
            </div>
            <div class="data-stats">
                <div class="data-item">
                    <span class="count">{{ userInfo.art_count }}</span>
                    <span class="text">头条</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.follow_count }}</span>
                    <span class="text">关注</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.fans_count }}</span>
                    <span class="text">粉丝</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.like_count }}</span>
                    <span class="text">获赞</span>
                </div>
            </div>
        </div>
        <!-- 未登录头部 -->
        <div v-else class="header not-login">
            <div class="login-btn" @click="$router.push('/login')">
                <img class="mobile-img" src="@/assets/mobile.png" alt="" />
                <span class="text">登录 / 注册</span>
            </div>
        </div>
        <van-grid :column-num="2" class="grid-nav mb-9" clickable>
            <van-grid-item class="grid-item">
                <i slot="icon" class="toutiao toutiao-shoucang"></i>
                <span slot="text" class="text">收藏</span>
            </van-grid-item>
            <van-grid-item class="grid-item">
                <i slot="icon" class="toutiao toutiao-lishi"></i>
                <span slot="text" class="text">历史</span>
            </van-grid-item>
        </van-grid>
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell class="mb-9" title="小智同学" is-link></van-cell>
        <div v-if="user" class="logout-div">
            <van-cell
                class="logout-cell"
                title="退出登录"
                clickable
                @click="lougout"
            >
            </van-cell>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
    name: 'MyIndex',
    components: {},
    props: {},
    data () {
        return {
            userInfo: {} // 用户信息
        }
    },
    computed: {
        ...mapState(['user'])
    },
    watch: {},
    created () {
        //  如果用户登录了，则请求加载用户信息
        if (this.user) {
            this.loadUserInfo()
        }
    },
    mounted () {},
    methods: {
        lougout () {
            // 退出提示
            this.$dialog
                .confirm({
                    title: '确认退出吗？',
                    message: '呜呜呜，在看看啦，求求你了'
                })
                .then(() => {
                    // on confirm
                    this.$store.commit('setUser', null)
                    // 确认退出：清除登录状态（vuex和本地存储中的user）
                })
                .catch(() => {
                    // on cancel
                })
        },
        async loadUserInfo () {
            try {
                const { data } = await getUserInfo()
                this.userInfo = data.data
                console.log('获取用户信息成功', data)
                this.$toast('获取用户信息成功')
            } catch (error) {
                // console.log(error)
                if (error.response.status === 401) {
                    this.$toast('未获授权')
                } else {
                    this.$toast('获取用户信息失败')
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
.my-cantainer {
    .header {
        height: 361px;
        background: url("@/assets/banner.png"); //
        background-size: cover;
    }

    .not-login {
        display: flex;
        justify-content: center; //水平居中
        align-content: center; //垂直居中

        .login-btn {
            display: flex;
            flex-direction: column; //垂直排列
            justify-content: center; //水平居中
            align-content: center; //垂直居中

            .text {
                display: flex;
                justify-content: center;
                font-size: 28px;
            }

            .mobile-img {
                width: 132px;
                height: 132px;
                color: #fff;
                margin-bottom: 15px;
            }
        }
    }

    .user-info {
        .base-info {
            display: flex;
            height: 231px;
            padding: 76px 32px 23px;
            box-sizing: border-box;
            justify-content: space-between;
            align-items: center;

            .left {
                display: flex;
                align-items: center;

                .avatar {
                    height: 132px;
                    width: 132px;
                    margin-right: 23px;
                    border: 4px solid #fff;
                }

                .name {
                    font-size: 30px;
                    color: #fff;
                }
            }
        }

        .data-stats {
            display: flex;

            .data-item {
                display: flex;
                flex: 1;
                height: 130px;
                flex-direction: column; //内容布局方式:垂直分布
                justify-content: center; //垂直居中
                align-items: center; //水平居中
                // align-content: center;
                color: #fff;

                .count {
                    font-size: 36px;
                }

                .text {
                    font-size: 26px;
                }
            }
        }
    }

    .grid-nav {
        .grid-item {
            height: 141px;

            i.toutiao {
                font-size: 45px;
            }

            .toutiao-shoucang {
                color: #eb5253;
            }

            .toutiao-lishi {
                color: #ff9d1d;
            }

            span.text {
                font-size: 28px;
            }
        }
    }

    .logout-div {
        .logout-cell {
            align-items: center;
            // justify-content: center;
            flex-direction: column;
            color: #eb5253;
        }
    }
}
</style>
