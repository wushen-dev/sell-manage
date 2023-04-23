<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>店铺管理</span>
                <el-button @click="saveShop" size="mini" style="float: right;" :type='isEdit ? "success" : "plain"'>{{
                isEdit ? '保存' :
                '编辑' }}</el-button>
            </div>
            <!-- 店铺信息 -->
            <el-form :disabled="!isEdit" ref="shopForm" :model="shopForm" label-width="80px">
                <el-form-item label="店铺名称">
                    <el-input v-model="shopForm.name"></el-input>
                </el-form-item>
                <el-form-item label="店铺公告">
                    <el-input type="textarea" placeholder="请输入内容" v-model="shopForm.bulletin">
                    </el-input>
                </el-form-item>
                <el-form-item label="店铺头像">
                    <el-upload class="avatar-uploader" action="http://127.0.0.1:5000/shop/upload"
                        :show-file-list="false" :on-success="handleAvatarSuccess">
                        <img v-if="shopForm.avatar" :src="shopForm.avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item class="pics" label="店铺图片">
                    <!-- 照片墙 -->
                    <!-- file-list: 控制显示的图片 -->
                    <el-upload action="http://127.0.0.1:5000/shop/upload" list-type="picture-card"
                        :file-list="shopForm.pics" :on-success="handleNewPics" :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <!-- 缩略图 -->
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item label="配送费">
                    <el-input-number v-model="shopForm.deliveryPrice" :min="1" label="描述文字">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="配送时间">
                    <el-input-number v-model="shopForm.deliveryTime" :min="1" label="描述文字">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="配送描述">
                    <el-input type="textarea" placeholder="请输入内容" v-model="shopForm.description">
                    </el-input>
                </el-form-item>
                <el-form-item label="店铺评分">
                    <el-rate allow-half v-model="shopForm.score"></el-rate>
                </el-form-item>
                <el-form-item label="销量">
                    <el-input-number v-model="shopForm.sellCount" :min="1" label="描述文字">
                    </el-input-number>
                </el-form-item>
                <el-form-item label="活动">
                    <el-checkbox-group v-model="shopForm.supports">
                        <el-checkbox label="在线支付满28减5" name="supports"></el-checkbox>
                        <el-checkbox label="VC无限橙果汁全场8折" name="supports"></el-checkbox>
                        <el-checkbox label="单人精彩套餐" name="supports"></el-checkbox>
                        <el-checkbox label="特价饮品8折抢购" name="supports"></el-checkbox>
                        <el-checkbox label="单人特色套餐" name="supports"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="营业时间">
                    <el-time-picker is-range value-format="HH:mm:ss" v-model="shopForm.date" range-separator="至"
                        start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
                    </el-time-picker>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { getShopInfo, saveShopInfo } from '@/api/shop'
export default {
    data() {
        return {
            shopForm: {
                name: '',
                bulletin: '',
                avatar: '',
                deliveryPrice: 0,
                deliveryTime: '',
                description: '',
                score: 3,
                sellCount: 0,
                supports: [],
                pics: [],
                date: []
            },
            dialogImageUrl: '', // 缩略图的图片路径
            dialogVisible: false, // 展示缩略图的对话框
            api: 'http://127.0.0.1:5000/upload/shop/',
            isEdit: false  // 控制编辑和查看切换
        }
    },
    created() {
        this.getShopInfo();
    },
    methods: {
        // 获取店铺信息
        async getShopInfo() {
            let res = await getShopInfo();
            let data = res.data.data;
            data.avatar = this.api + data.avatar;
            data.pics = data.pics.map(item => {
                return {
                    name: item,
                    url: this.api + item
                }
            })
            this.shopForm = data;
        },
        // 店铺头像上传成功后的回调
        handleAvatarSuccess(res) {
            console.log(res);
            if (res.code === 0) {
                this.shopForm.avatar = this.api + res.imgUrl;
            }
        },
        // 照片墙新增图片成功的回调
        handleNewPics(res) {
            if (res.code === 0) {
                this.shopForm.pics.push({
                    name: res.imgUrl,
                    url: this.api + res.imgUrl
                })
            }
        },
        // 点击查看照片墙缩略图
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 移除了照片墙图片后的回调
        handleRemove(file, fileList) {
            this.shopForm.pics = fileList;
        },
        // 修改店铺信息
        // 细节: 1. 数据中的照片墙,日期格式,活动这三个字段必须转JSON字符串; 2. 图片只需要名字,需要将路径切掉
        async saveShop() {
            this.isEdit = !this.isEdit;
            if (!this.isEdit) {
                let data = JSON.parse(JSON.stringify(this.shopForm));
                data.pics = data.pics.map(item => item.name);
                data.pics = JSON.stringify(data.pics);
                data.avatar = data.avatar.replace(this.api, '');
                data.date = JSON.stringify(data.date);
                data.supports = JSON.stringify(data.supports);
                await saveShopInfo(data);
            }
        }
    }
}
</script>

<style lang="less" scoped>
.box-card {
    margin: 20px;

    .el-form {
        width: 400px;

        /deep/.avatar-uploader .el-upload {
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
            width: 120px;
            height: 120px;
            line-height: 120px;
            text-align: center;
        }

        .avatar {
            width: 120px;
            height: 120px;
            display: block;
        }

        /deep/.el-upload--picture-card {
            width: 100px;
            height: 100px;
            line-height: 110px;
        }

        /deep/.el-upload-list__item {
            width: 100px;
            height: 100px;
        }

        .pics {
            white-space: nowrap;
        }

        /deep/.el-dialog {
            width: 25%;
        }
    }
}
</style>