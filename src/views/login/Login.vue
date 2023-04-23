<template>
    <div class="login">
        <div class="login-form">
            <h3>
                <img src="@/assets/img/logo.png" alt="">
                源码大食堂后台管理系统
            </h3>
            <el-form ref="loginForm" :rules="rules" :model="loginForm">
                <el-form-item prop="account">
                    <el-input v-model="loginForm.account"><i slot="prefix" class="iconfont icon-user"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" :type="flag ? 'text': 'password'"><i slot="prefix"
                            class="iconfont icon-lock"></i><i slot="suffix" class="iconfont"
                            :class="flag ? 'icon-eye-open' : 'icon-eye-closed'" @click="changeType"></i></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { checkAccount, checkPwd } from '@/utils'
import { checkLogin } from '@/api/user'
import local from '@/utils/local'
import { createRoutes } from '@/router'
export default {
    data() {
        return {
            loginForm: {
                account: '',
                password: ''
            },
            flag: false,
            rules: {
                account: [
                    { required: true, validator: checkAccount, trigger: 'blur' }
                ],
                password: [
                    { required: true, validator: checkPwd, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        changeType() {
            this.flag = !this.flag;
        },
        login() {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    // console.log('发请求');
                    let res = await checkLogin(this.loginForm);
                    if (res.data.code === 0) {
                        local.set('token', res.data.token);
                        // 本地存储用户的角色
                        local.set('role', res.data.role);
                        // 获取动态路由和菜单
                        createRoutes();
                        this.$router.push('/home');
                    }
                } else {
                    return false;
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: url('@/assets/img/bg.webp') no-repeat;
    background-size: cover;

    .login-form {
        width: 360px;
        height: 300px;
        background-color: rgba(0, 0, 0, .6);
        border-radius: 10px;

        h3 {
            margin-top: 20px;
            margin-bottom: 20px;
            text-align: center;
            color: #fff;
            font-weight: 500;
            font-size: 18px;
            letter-spacing: 2px;

            img {
                width: 40px;
                height: 40px;
                animation: xuan 2s infinite linear;
                vertical-align: middle;
            }
        }

        .el-form {
            margin: 0 20px;

            /deep/.el-input__inner {
                background-color: #283443;
                color: #fff;
            }

            .el-button {
                width: 100%;
            }
        }
    }
}

@keyframes xuan {
    0% {}

    100% {
        transform: rotate(360deg);
    }
}
</style>