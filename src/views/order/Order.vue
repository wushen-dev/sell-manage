<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>订单管理</span>
            </div>
            <!-- 查询订单的表单 -->
            <el-form ref="orderForm" inline :model="orderForm" label-width="100px" size="mini">
                <el-form-item label="订单号">
                    <el-input v-model="orderForm.orderNo"></el-input>
                </el-form-item>
                <el-form-item label="收货人">
                    <el-input v-model="orderForm.consignee"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="orderForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="orderForm.orderState">
                        <el-option label="已受理" value="已受理"></el-option>
                        <el-option label="派送中" value="派送中"></el-option>
                        <el-option label="已完成" value="已完成"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择时间">
                    <!-- value-format: 将时间调整为标准的北京时间 -->
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="orderForm.date" type="datetimerange"
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchList">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="orderData" style="width: 100%">
                <el-table-column prop="orderNo" label="订单号">
                </el-table-column>
                <el-table-column prop="orderTime" label="下单时间" width="200px">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" width="120px">
                </el-table-column>
                <el-table-column prop="consignee" label="收货人">
                </el-table-column>
                <el-table-column prop="deliverAddress" label="配送地址" width="120px">
                </el-table-column>
                <el-table-column prop="deliveryTime" label="送达时间" width="200px">
                </el-table-column>
                <el-table-column prop="remarks" label="备注">
                </el-table-column>
                <el-table-column prop="orderAmount" label="订单金额">
                </el-table-column>
                <el-table-column prop="orderState" label="订单状态">
                </el-table-column>
                <el-table-column label="操作" width="100px">
                    <template slot-scope="scope">
                        <el-button type="text">查看</el-button>
                        <el-button type="text">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[3, 5, 7, 10]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import { getOrderList } from '@/api/order'
export default {
    data() {
        return {
            orderForm: {
                orderNo: '',
                consignee: '',
                phone: '',
                orderState: '',
                date: [],
            },
            orderData: [],
            currentPage: 1,
            pageSize: 3,
            total: 0
        }
    },
    created() {
        // 获取订单列表
        this.getOrderList();
    },
    methods: {
        async getOrderList() {
            let res = await getOrderList(
                {
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    ...this.orderForm,
                    date: JSON.stringify(this.orderForm.date)
                }
            );
            this.orderData = res.data.data;
            this.total = res.data.total;
        },
        // 当页面范围发生改变时触发的函数
        handleSizeChange(val) {
            this.pageSize = val;
            this.getOrderList();
        },
        // 当当前选中的页面改变时触发的函数
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getOrderList();
        },
        // 查询订单数据
        searchList() {
            this.getOrderList();
        }
    }
}
</script>

<style lang="less" scoped>
.box-card {
    margin: 20px;

    .el-pagination {
        margin-top: 15px;
        margin-bottom: 20px;
    }
}
</style>