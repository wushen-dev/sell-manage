<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品列表</span>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <el-form-item label="商品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="所属店铺">
                                <span>{{ props.row.shop }}</span>
                            </el-form-item>
                            <el-form-item label="商品 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{ props.row.shopId }}</span>
                            </el-form-item>
                            <el-form-item label="商品分类">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称">
                    <!-- 表格数据默认是以纯文本内容展示的,如果需要添加不同的样式,需要使用作用域插槽私有化定制 -->
                    <template slot-scope="scope">
                        <h5>{{ scope.row.name }}</h5>
                    </template>
                </el-table-column>
                <el-table-column label="所属分类" prop="category">
                </el-table-column>
                <el-table-column label="商品价格" prop="price" width="120px">
                </el-table-column>
                <el-table-column label="商品图片">
                    <template slot-scope="scope">
                        <img style="width: 100px;" :src="scope.row.imgUrl" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="商品描述" prop="desc">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary">编辑</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[100, 211, 300, 400]" :page-size="211"
                layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                name: '好滋好味鸡蛋仔',
                category: '单身狗豪华套餐',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                price: '78.99',
                imgUrl: require('@/assets/img/logo.png'),
                shopId: '10333'
            }, {
                name: '好滋好味鸡蛋仔',
                category: '单身狗豪华套餐',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                price: '78.99',
                imgUrl: require('@/assets/img/logo.png'),
                shopId: '10333'
            }, {
                name: '好滋好味鸡蛋仔',
                category: '单身狗豪华套餐',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                price: '78.99',
                imgUrl: require('@/assets/img/logo.png'),
                shopId: '10333'
            }],
            currentPage: 2
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}   
</script>

<style lang="less" scoped>
.box-card {
    margin: 20px;

    .el-table {
        .el-form {
            margin-left: 40px;
        }
    }

    .el-pagination {
        margin-top: 15px;
    }
}
</style>