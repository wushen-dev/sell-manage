<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>管理员信息</span>
            </div>
            <div class="content">
                <p>管理员ID: {{ userInfo.id }}</p>
                <el-divider></el-divider>
                <p>账号: {{ userInfo.account }}</p>
                <el-divider></el-divider>
                <p>用户组: {{ userInfo.userGroup }}</p>
                <el-divider></el-divider>
                <p>创建时间: {{ userInfo.ctime }}</p>
                <el-divider></el-divider>
                <p style="display: flex;">
                    <span>管理员头像:</span>
                    <el-upload class="avatar-uploader" action="http://127.0.0.1:5000/users/avatar_upload"
                        :show-file-list="false" :on-success="handleAvatarSuccess">
                        <img v-if="userInfo.imgUrl" :src="userInfo.imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </p>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getUserInfo, uploadAvatar } from '@/api/user'
export default {
    data() {
        return {
            userInfo: {}
        }
    },
    methods: {
        async getUserInfo() {
            let res = await getUserInfo();
            this.userInfo = res.data.accountInfo;
        },
        // 头像上传成功后的回调函数
        async handleAvatarSuccess(res) {
            if (res.code === 0) {
                this.userInfo.imgUrl = 'http://127.0.0.1:5000/upload/imgs/acc_img/' + res.imgUrl;
                // 调用修改头像的接口, 将头像保存到数据库
                let result = await uploadAvatar({ imgUrl: res.imgUrl })
                // 通知topnav组件同步更新头像
                this.$bus.$emit('changeAvatar');
            }
        },
    },
    created() {
        this.getUserInfo();
    }
}
</script>

<style lang="less" scoped>
.box-card {
    margin: 20px;
    color: #8c939d;
    font-size: 14px;

    /deep/.avatar-uploader .el-upload {
        margin-left: 15px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
}
</style>