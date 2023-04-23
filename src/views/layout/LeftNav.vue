<template>
    <div class="left-nav" :style="{width: !isCollapse ? '200px' : ''}">
        <!-- logo -->
        <div class="logo">
            <img src="@/assets/img/logo.png" alt="">
            <p v-show="!isCollapse">外卖商家中心</p>
        </div>
        <el-menu unique-opened router background-color="#304156" text-color="#fff" :default-active="$route.path"
            class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="false">
            <template v-for="menu in menus">
                <el-menu-item :key="menu.path" :index="menu.path" v-if="menu.children.length === 1">
                    <i class="iconfont" :class="menu.meta.icon"></i>
                    <span slot="title">{{ menu.meta.title }}</span>
                </el-menu-item>
                <el-submenu :index="menu.path" :key="menu.meta.title" v-else>
                    <template slot="title">
                        <i class="iconfont" :class="menu.meta.icon"></i>
                        <span slot="title">{{ menu.meta.title }}</span>
                    </template>
                    <el-menu-item v-for="item in menu.children" :key="item.path" :index="item.path">{{ item.meta.title
                    }}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu>
        <!-- <el-menu unique-opened router background-color="#304156" text-color="#fff" :default-active="$route.path"
            class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="false">
            <el-menu-item index="/home">
                <i class="iconfont icon-home"></i>
                <span slot="title">后台首页</span>
            </el-menu-item>
            <el-menu-item index="/order">
                <i class="iconfont icon-order"></i>
                <span slot="title">订单管理</span>
            </el-menu-item>
            <el-submenu index="/goods">
                <template slot="title">
                    <i class="iconfont icon-goods"></i>
                    <span slot="title">商品管理</span>
                </template>
                <el-menu-item index="/goods/list">商品列表</el-menu-item>
                <el-menu-item index="/goods/add">商品添加</el-menu-item>
                <el-menu-item index="/goods/cate">商品分类</el-menu-item>
            </el-submenu>
            <el-menu-item index="/shop">
                <i class="iconfont icon-shop"></i>
                <span slot="title">店铺管理</span>
            </el-menu-item>
            <el-submenu index="/account">
                <template slot="title">
                    <i class="iconfont icon-account"></i>
                    <span slot="title">账号管理</span>
                </template>
                <el-menu-item index="/account/list">账号列表</el-menu-item>
                <el-menu-item index="/account/add">账号添加</el-menu-item>
                <el-menu-item index="/account/modify">修改密码</el-menu-item>
                <el-menu-item index="/account/personal">个人中心</el-menu-item>
            </el-submenu>
            <el-submenu index="/sales">
                <template slot="title">
                    <i class="iconfont icon-sales"></i>
                    <span slot="title">销售统计</span>
                </template>
                <el-menu-item index="/sales/goods-total">商品统计</el-menu-item>
                <el-menu-item index="/sales/order-total">订单统计</el-menu-item>
            </el-submenu>
        </el-menu> -->
    </div>
</template>

<script>
import local from '@/utils/local';

export default {
    data() {
        return {
            isCollapse: false,
            menus: []
        };
    },
    created() {
        // $route: 获取当前路由对象
        // console.log(this.$route);
        this.fitNav();
        // 箭头函数的this指向: 该函数定义时所处的作用域
        window.addEventListener('resize', () => {
            this.fitNav()
        })

        // window.addEventListener('resize', this.fitNav)
        // 接受topnav组件传过来的按钮状态
        this.$bus.$on('changeNav', data => {
            this.isCollapse = data;
        })

        // 获取本地存储动态菜单栏
        this.menus = local.get('menus');
        this.menus[0].meta = {
            title: '后台首页',
            icon: 'icon-home'
        }
        console.log(this.menus);
    },
    methods: {
        fitNav() {
            this.isCollapse = document.body.clientWidth < 1000 ? true : false;
        }
    }
}
</script>

<style lang="less" scoped>
.left-nav {
    height: 100%;
    background-color: #304156;

    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 15px;
        color: #fff;

        img {
            width: 40px;
            height: 40px;
            animation: xuan 2s infinite linear;
        }
    }

    .el-menu {
        border-right: 0;

        .el-menu-item {
            &.is-active {
                background-color: #202f3f !important;
            }
        }

        .iconfont {
            margin-right: 8px;
            color: #fff;
        }
    }

    .el-menu--collapse {
        .el-menu-item {
            &.is-active {
                i {
                    color: #409EFF !important;
                }
            }
        }

        .el-submenu {
            &.is-active {
                .el-submenu__title {
                    background-color: red !important;
                }
            }
        }

        // /deep/: 实现样式穿透. 让当前的样式可以作用于更上级的标签
        /deep/.el-submenu {
            &.is-active {
                .el-submenu__title {
                    background-color: #202f3f !important;

                    i {
                        color: #409EFF
                    }
                }
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