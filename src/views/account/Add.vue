<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加账号</span>
            </div>
            <el-form class="account-add" :rules="rules" ref="accountAddForm" :model="accountAddForm" label-width="80px">
                <el-form-item label="账号" prop="account">
                    <el-input v-model="accountAddForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="accountAddForm.password"></el-input>
                </el-form-item>
                <el-form-item label="用户组" prop="userGroup">
                    <el-select v-model="accountAddForm.userGroup" placeholder="请选择用户组">
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                        <el-option label="普通管理员" value="普通管理员"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="accountAdd">添加</el-button>
                    <el-button size="medium" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { checkAccount, checkPwd } from '@/utils'
import { accountAdd } from '@/api/user'

export default {
    data() {
        return {
            accountAddForm: {
                account: '',
                password: '',
                userGroup: '',
            },
            rules: {
                account: [
                    { required: true, validator: checkAccount, trigger: 'blur' }
                ],
                password: [
                    { required: true, validator: checkPwd, trigger: 'blur' },
                ],
                userGroup: [
                    { required: true, message: '请选择用户组', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        // 点击提交按钮,验证用户输入内容
        accountAdd() {
            this.$refs.accountAddForm.validate(async valid => {
                if (valid) {
                    let res = await accountAdd(this.accountAddForm);
                    console.log(res);
                } else {
                    return false;
                }
            })
        },
        resetForm() {
            this.$refs.accountAddForm.resetFields();
        }
    }
}
</script>

<style lang="less" scoped>
.box-card {
    margin: 20px;

    .account-add {
        /deep/.el-input__inner {
            width: 206px;
        }
    }
}
</style>