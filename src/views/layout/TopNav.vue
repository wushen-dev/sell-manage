<template>
    <div>
        <el-row>
            <el-col class="bread" :span="12">
                <i @click="changeNav" :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="item, index in breads" :to="{ path: item.to }">{{item.title}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col class="user" :span="12">
                欢迎你,<el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ userInfo.account }}
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="/account/personal">个人中心</el-dropdown-item>
                        <el-dropdown-item command="/login">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-avatar :size="40" :src="userInfo.imgUrl">
                </el-avatar>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import local from '@/utils/local'
export default {
    data() {
        return {
            isCollapse: false,
            breads: [
                // { title: '商品管理', to: '/goods' },
                // { title: '商品列表', to: '/goods/list' },
            ],
            userInfo: {}
        }
    },
    methods: {
        handleCommand(command) {
            if (command === '/login') {
                local.remove('token');
                // location.reload();
            }
            this.$router.push(command);
        },
        changeNav() {
            this.isCollapse = !this.isCollapse;
            // 将按钮的状态传给左侧菜单栏
            this.$bus.$emit('changeNav', this.isCollapse);
        },
        getBreadNav() {
            this.breads = this.$route.matched.filter(v => v.meta.title).map(item => {
                return {
                    title: item.meta.title,
                    to: item.path
                }
            })
        },
        async getUserInfo() {
            let res = await getUserInfo();
            this.userInfo = res.data.accountInfo;
        },
    },
    created() {
        // 获取动态面包屑导航
        // 思路: 根据$route获取当前路由的信息,遍历matched数组,根据数组对象里面的meta和path属性组装新的数组对象,给到面包屑即可
        this.getBreadNav();
        this.getUserInfo();
        this.$bus.$on('changeAvatar', () => {
            this.getUserInfo();
        })
    },
    watch: {
        // topnav组件不是路由组件,只会渲染一次.就必须监听路由变化,获取动态面包屑
        '$route.path'() {
            this.getBreadNav();
        }
    }
}
</script>

<style lang="less" scoped>
.bread {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 50px;

    // line-height: 50px;
    .el-breadcrumb {
        line-height: 50px;
    }
}

.user {
    padding-right: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;

    .el-dropdown {
        margin-right: 8px;
    }
}
</style>