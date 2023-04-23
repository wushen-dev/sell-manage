<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品分类</span>
                <el-button size="mini" style="float: right; font-size: 12px;" type="primary" @click="addCate">添加分类
                </el-button>
            </div>
            <el-table :data="cateData" style="width: 100%">
                <el-table-column prop="id" label="序号">
                </el-table-column>
                <el-table-column label="分类名称">
                    <template slot-scope="{row}">
                        <el-input v-if="row.isEdit" size="mini" v-model="row.cateName"></el-input>
                        <span v-else>{{ row.cateName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="是否启用">
                    <template slot-scope="scope">
                        <el-switch :disabled="!scope.row.isEdit" v-model="scope.row.state" active-color="#13ce66"
                            inactive-color="gray">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" :type="scope.row.isEdit ? 'success' : 'plain'"
                            @click="cateEdit(scope.row)">{{ scope.row.isEdit ? '完成' :
                            '编辑' }}</el-button>
                        <el-button v-permisson="'super'" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[1, 2, 3, 5]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
            <el-dialog title="添加分类" :visible.sync="dialogVisible" width="30%">
                <el-form ref="cateForm" :model="cateForm" label-width="80px">
                    <el-form-item label="分类名称">
                        <el-input v-model="cateForm.cateName"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用">
                        <el-switch v-model="cateForm.state" active-color="#13ce66" inactive-color="gray">
                        </el-switch>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="medium" type="primary" @click="saveCate">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import { getGoodsCate, cateEdit, cateAdd } from '@/api/goods'
export default {
    data() {
        return {
            cateData: [],
            currentPage: 1,
            pageSize: 3,
            total: 0,
            cateForm: {
                cateName: '',
                state: true
            },
            dialogVisible: false
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.getGoodsCate();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getGoodsCate();
        },
        async getGoodsCate() {
            let res = await getGoodsCate({
                currentPage: this.currentPage,
                pageSize: this.pageSize
            });
            this.cateData = res.data.data.map(item => {
                return {
                    isEdit: false, // 控制当前行数据是否可以编辑
                    ...item,
                    state: item.state ? true : false
                }
            })
            console.log(this.cateData);
            this.total = res.data.total;
        },
        // 编辑商品分类
        async cateEdit(row) {
            row.isEdit = !row.isEdit;
            console.log(row);
            if (!row.isEdit) {
                row.state = row.state ? 1 : 0;
                console.log(row);
                let res = await cateEdit(row);
                if (res.data.code === 0) {
                    this.getGoodsCate();
                }
            }
        },
        // 添加分类
        addCate() {
            this.dialogVisible = true;
        },
        // 保存分类
        async saveCate() {
            console.log(this.cateForm.state);
            this.cateForm.state = this.cateForm.state ? 1 : 0;
            console.log(this.cateForm.state);
            let res = await cateAdd(this.cateForm);
            if (res.data.code === 0) {
                this.getGoodsCate();
                this.dialogVisible = false;
            }
        }
    },
    created() {
        this.getGoodsCate();
    }
}
</script>

<style lang="less" scoped>
.box-card {
    margin: 20px;

    .el-pagination {
        margin-top: 15px;
    }
}
</style>