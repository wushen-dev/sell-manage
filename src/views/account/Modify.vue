<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>
            <el-form ref="modifyForm" :rules="rules" :model="modifyForm" label-width="100px">
                <el-form-item label="原密码" prop="pwd">
                    <el-input v-model="modifyForm.pwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input v-model="modifyForm.newPwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="surePwd">
                    <el-input v-model="modifyForm.surePwd" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="modifyPwd">确定</el-button>
                    <el-button size="medium" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { oldpwdCheck, editpwd } from '@/api/user'
import local from '@/utils/local';
export default {
    data() {
        // 检查原密码
        var checkOldPwd = async (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入原密码'));
            }
            let res = await oldpwdCheck({ oldPwd: value });
            if (res.data.code === "11") {
                return callback(new Error('请输入正确的密码'));
            }
            callback();
        }
        // 检查新密码
        var checkNewPwd = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入新密码'));
            }
            if (value === this.modifyForm.pwd) {
                return callback(new Error('新密码不能和原密码一样'));
            }
            if (!(/^\w{3,6}$/.test(value))) {
                return callback(new Error('请输入正确的新密码'));
            }
            callback();
        }
        // 确认新密码
        var checkSurePwd = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请再次输入密码'));
            }
            if (value !== this.modifyForm.newPwd) {
                return callback(new Error('两次密码输入不一致'));
            }
            callback();
        }
        return {
            modifyForm: {
                pwd: '',
                newPwd: '',
                surePwd: ''
            },
            rules: {
                pwd: [
                    { required: true, validator: checkOldPwd, trigger: 'blur' },
                ],
                newPwd: [
                    { required: true, validator: checkNewPwd, trigger: 'blur' },
                ],
                surePwd: [
                    { required: true, validator: checkSurePwd, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        modifyPwd() {
            this.$refs.modifyForm.validate(async valid => {
                if (valid) {
                    let res = await editpwd({ newPwd: this.modifyForm.newPwd })
                    if (res.data.code === 0) {
                        this.$router.push('/login');
                        local.remove('token');
                    }
                } else {
                    return false;
                }
            })
        },
        resetForm() {
            this.$refs.modifyForm.resetFields();
        }
    }
}
</script>

<style lang="less" scoped>
.box-card {
    margin: 20px;

    .el-form {
        /deep/.el-input__inner {
            width: 206px;
        }
    }
}
</style>