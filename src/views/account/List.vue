<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账号列表</span>
            </div>
            <el-table ref="accountTable" :data="accountData" tooltip-effect="dark" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="account" label="账号">
                </el-table-column>
                <el-table-column prop="userGroup" label="用户组">
                </el-table-column>
                <el-table-column prop="ctime" label="创建时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="plain" @click="accountEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="accountDel(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[1, 2, 3, 5]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>

            <!-- 编辑功能的对话框 -->
            <el-dialog title="修改账号信息" :visible.sync="dialogVisible" width="30%">
                <el-form ref="editForm" :model="editForm" label-width="80px">
                    <el-form-item label="账号">
                        <el-input style="width: 206px;" v-model="editForm.account"></el-input>
                    </el-form-item>
                    <el-form-item label="用户组">
                        <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                            <el-option label="超级管理员" value="超级管理员"></el-option>
                            <el-option label="普通管理员" value="普通管理员"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="saveAccount">确 定</el-button>
                </span>
            </el-dialog>
            <el-button size="medium" type="danger" @click="batchDel">批量删除</el-button>
            <el-button size="medium" type="primary" @click="cancelSelect">取消选择</el-button>
        </el-card>
    </div>
</template>

<script>
import { accountList, accountDel, accountEdit, accountBatchDel } from '@/api/user'

export default {
    data() {
        return {
            accountData: [],
            currentPage: 1,
            pageSize: 2,
            total: 0,
            dialogVisible: false,
            editForm: {
                id: '',
                account: '',
                userGroup: ''
            },
            ids: [],
        }
    },
    created() {
        this.getAccountList();
    },
    methods: {
        async getAccountList() {
            let res = await accountList({
                currentPage: this.currentPage,
                pageSize: this.pageSize
            })
            this.accountData = res.data.data;
            console.log(this.accountData);
            this.total = res.data.total;
        },
        handleSelectionChange(items) {
            this.ids = items.map(item => item.id);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getAccountList();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getAccountList();
        },
        // 删除单条数据
        async accountDel(id) {
            let res = await accountDel({ id });
            this.getAccountList();
        },
        // 修改用户信息
        accountEdit(row) {
            this.dialogVisible = true;
            this.editForm.id = row.id;
            this.editForm.account = row.account;
            this.editForm.userGroup = row.userGroup;
        },
        // 保存用户信息
        async saveAccount() {
            let res = await accountEdit(this.editForm);
            this.dialogVisible = false;
            this.getAccountList();
        },
        // 取消选择
        cancelSelect() {
            this.$refs.accountTable.clearSelection();
        },
        async batchDel() {
            if (this.ids.length) {
                let res = await accountBatchDel({ ids: JSON.stringify(this.ids) });
                if (res.data.code === 0) {
                    this.getAccountList();
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.el-pagination {
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>