import Vue from 'vue'
import VueRouter from 'vue-router'
import local from '@/utils/local'

// 解决重复点击面包屑导航报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

import Login from '@/views/login/Login.vue';
import Layout from '@/views/layout/Layout.vue';
import Home from '@/views/home/Home.vue';
// import Shop from '@/views/shop/Shop.vue';
import AccountList from '@/views/account/List.vue';
import AccountAdd from '@/views/account/Add.vue';
import AccountModify from '@/views/account/Modify.vue';
import Personal from '@/views/account/Personal.vue';
import GoodsList from '@/views/goods/List.vue';
import GoodsAdd from '@/views/goods/Add.vue';
import GoodsCate from '@/views/goods/Cate.vue';
import Order from '@/views/order/Order.vue';
import GoodsTotal from '@/views/sales/GoodsTotal.vue';
import OrderTotal from '@/views/sales/OrderTotal.vue';

console.log(222);

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Layout,
    children: [
      { path: '', component: Home }, // 当没有三级路由的时候,path留空即可
    ]
  }
]

// 动态路由(根据角色判断是否有对应权限的路由)
const dynamicRoutes = [
  {
    path: '/shop',
    component: Layout,
    meta: { title: '店铺管理', icon: 'icon-shop' },
    children: [
      // 路由懒加载: 不用一打开页面就把所有组件导入, 当切换到对应路由的时候,才导入对应组件. 可以提高初始页面的加载速度
      { path: '', component: () => import('@/views/shop/Shop.vue') },
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    meta: { title: '商品管理', roles: ['super', 'normal'], icon: 'icon-goods' },
    children: [
      { path: '/goods/list', component: GoodsList, meta: { title: '商品列表', roles: ['super', 'normal'] } },
      { path: '/goods/add', component: GoodsAdd, meta: { title: '商品添加', roles: ['super'] } },
      { path: '/goods/cate', component: GoodsCate, meta: { title: '商品分类', roles: ['super', 'normal'] } },
    ]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/list',
    meta: { title: '账号管理', roles: ['super', 'normal'], icon: 'icon-account' },
    children: [
      { path: '/account/list', component: AccountList, meta: { title: '账号列表', roles: ['super', 'normal'] } },
      { path: '/account/add', component: AccountAdd, meta: { title: '账号添加', roles: ['super'] } },
      { path: '/account/personal', component: Personal, meta: { title: '个人中心', roles: ['super', 'normal'] } },
      { path: '/account/modify', component: AccountModify, meta: { title: '修改密码', roles: ['super'] } },
    ]
  },
  {
    path: '/order',
    component: Layout,
    meta: { title: '订单管理', roles: ['super'], icon: 'icon-order' },
    children: [
      { path: '/order', component: Order },
    ]
  },
  {
    path: '/sales',
    component: Layout,
    redirect: '/sales/goods-total',
    meta: { title: '销售统计', roles: ['super'], icon: 'icon-sales' },
    children: [
      { path: '/sales/goods-total', component: GoodsTotal, meta: { title: '商品统计', roles: ['super'] } },
      { path: '/sales/order-total', component: OrderTotal, meta: { title: '订单统计', roles: ['super'] } },
    ]
  },
]

const router = new VueRouter({
  routes
})

// 路由前置守卫(只要路由发生了改变,就会被劫持)
router.beforeEach((to, from, next) => {
  // to: 去往的组件
  // from: 从哪个组件来的
  // next: 是否放行到对应的组件
  // console.log('from', from);
  // console.log('to', to);
  // next()
  // 需求: 如果用户没有登录,不能直接进入内页
  if (local.get('token')) {
    next();
  } else {
    if (to.path == '/login') {
      next();
    } else {
      next({ path: '/login' })
    }
  }
})

// 动态路由: 登录成功后, 获取用户的角色关键词, 根据这个关键词去需要权限的路由中验证是否有对应路由的权限
const hasPermisson = (routes, role) => {
  if (routes.meta && routes.meta.roles) {
    return routes.meta.roles.includes(role);
  } else {
    return true;
  }
}

const calcRoutes = (dynamicRoutes, role) => {
  let r = dynamicRoutes.filter(routes => {
    if (hasPermisson(routes, role)) {
      // 对二级的权限做判断
      if (routes.children) {
        routes.children = calcRoutes(routes.children, role);
      }
      return true;
    } else {
      return false;
    }
  })
  return r;
}

const getMenus = (accessRoutes) => {
  return [
    {
      path: '/home',
      component: Layout,
      children: [
        { path: '', component: Home }, // 当没有三级路由的时候,path留空即可
      ]
    },
    ...accessRoutes
  ];
}

export const createRoutes = () => {
  // 1. 获取用户角色
  if (!local.get('role')) {
    return;
  }
  let role = local.get('role');
  // 2. 筛选不同角色的路由权限
  let accessRoutes = calcRoutes(dynamicRoutes, role);
  // 3. 将满足的路由添加到router对象中
  router.addRoutes(accessRoutes);
  // 4. 获取动态菜单
  let menus = getMenus(accessRoutes);
  // 5. 本地存储动态菜单
  local.set('menus', menus);
}
createRoutes()

export default router
