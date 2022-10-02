<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar title="登录" class="page-nav-bar" />
        <!-- 登录表单 -->
        <!--
            表单验证 :rules，验证通过触发submit事件
         -->
        <van-form @submit="onSubmit">
            <!-- field 表单中的输入框组件 -->
            <van-field
                v-model="user.mobile"
                name="手机号"
                placeholder="请输入手机号"
                :rules="userFormRules.mobile"
                type="number"
                maxlength="11"
            >
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>
            <van-field
                v-model="user.code"
                name="验证码"
                placeholder="请输入验证码"
                :rules="userFormRules.code"
                type="number"
                maxlength="6"
            >
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template #button>
                    <van-button
                        class="send-sms-btn"
                        round
                        size="small"
                        type="default"
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
import { login } from '@/api/user'
import { Toast } from 'vant'
export default {
    name: 'LoginIndex',
    components: {},
    props: {},
    data () {
        return {
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
            }
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
                this.$toast.success('登录成功', res)
            } catch (error) {
                Toast.fail('登录失败') // vant组件轻提示
                console.log('登录失败')
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
