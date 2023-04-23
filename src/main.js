import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入重置浏览器样式的文件
import '@/assets/css/normalize.css'
import '@/assets/css/reset.css'
// 导入element-ui框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入本地存储的角色
import local from '@/utils/local'

// 导入echarts可视化图表工具
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

Vue.config.productionTip = false

// 绑定中央事件总线
Vue.prototype.$bus = new Vue();

// 自定义指令: v-permisson: 按钮级的权限验证
Vue.directive('permisson', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, roles) {
    console.log(el, roles.expression);
    if (!roles.expression.includes(local.get('role'))) {
      el.remove();
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
