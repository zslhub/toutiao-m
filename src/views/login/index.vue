<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar title="登录" class="page-nav-bar">
            <van-icon slot="left" name="arrow-left" @click="$router.back()">
                返回
            </van-icon>
        </van-nav-bar>
        <!-- 登录表单 -->
        <!-- 表单验证 :rules，验证通过触发submit事件 -->
        <van-form @submit="onSubmit" ref="loginForm">
            <!-- field 表单中的输入框组件 -->
            <van-field
                v-model="user.mobile"
                name="mobile"
                placeholder="请输入手机号"
                :rules="userFormRules.mobile"
                type="number"
                maxlength="11"
            >
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field
                v-model="user.code"
                name="code"
                placeholder="请输入验证码"
                :rules="userFormRules.code"
                type="number"
                maxlength="6"
            >
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template #button>
                    <!-- 倒计时 -->
                    <van-count-down
                        v-if="isCountDownShow"
                        :time="time"
                        format="ss s"
                        @finish="isCountDownShow = false"
                    />
                    <van-button
                        v-else
                        class="send-sms-btn"
                        round
                        size="small"
                        type="default"
                        @click="onSendSms"
                        native-type="button"
                        >发送验证码</van-button
                    >
                </template>
            </van-field>
            <div class="login-btn-warp">
                <van-button
                    class="login-btn"
                    block
                    type="info"
                    native-type="submit"
                    >登录</van-button
                >
            </div>
        </van-form>
    </div>
</template>
<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'
export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data () {
        return {
            isCountDownShow: false,
            user: {
                // 请求参数绑定到表单
                mobile: '',
                code: ''
            },
            // 表单验证规则
            userFormRules: {
                mobile: [
                    { required: true, message: '手机号不能为空' },
                    { pattern: /1[3|5|7|8]\d{9}/, message: '手机格式错误' }
                ],
                code: [
                    { required: true, message: '验证码不能为空' },
                    { pattern: /\d{6}/, message: '验证码格式错误' }
                ]
            },
            time: 1000 * 10
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        async onSubmit (values) {
            this.$toast.loading({
                message: '登录中...',
                forbidClick: true, // 加载时禁用背景点击
                duration: 0 // 加载展示时间，如果为0持续加载
            })

            const user = this.user // 接收表单数据
            // 1、获取表单数据，2表单验证，3提交表单登录，4根据请求响应结果处理后续操作
            try {
                const res = await login(user) // 调用请求方法，传递表单数据
                this.$toast.success('登录成功')

                console.log('手机号登录成功', res)
                this.$store.commit('setUser', res.data.data)
                this.$router.back()
            } catch (error) {
                Toast.fail('登录失败') // vant组件轻提示
                console.log('登录失败')
            }
        },
        // 1校验手机号，2验证通过现实倒计时，3请求发送验证码
        async onSendSms () {
            try {
                this.$refs.loginForm.validate('mobile') // validate通过表单的表单名来单项验证，此方法会返回promise对象
                console.log('手机号格式验证通过')
                this.isCountDownShow = true
            } catch (error) {
                return console.log('验证失败') // 失败后不再执行后面的代码
            }
            try {
                const res = await sendSms(this.user.mobile)
                console.log('验证码发送成功', res)
            } catch (error) {
                this.isCountDownShow = false
                if (error.response.status === 429) {
                    this.$toast(
                        `发送太频繁了，请${60 - this.time / 1000}秒后重试`
                    )
                } else {
                    console.log('发送失败')
                }
            }
        }
    }
}
</script>

<style scoped lang="less">
.login-container {
    .toutiao {
        font-size: 37px;
    }

    .send-sms-btn {
        background-color: #ededed;
        width: 156px;
        height: 46px;
        line-height: 46px;
        font-size: 22px;
        color: #666;
    }

    .login-btn-warp {
        padding: 53px 33px;

        .login-btn {
            border: none;
            background-color: #6db4fb;
        }
    }
}
</style>
