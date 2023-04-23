import axios from "axios";
import local from './local';
import { Message } from 'element-ui';
import router from '@/router'
// 配置服务器地址
axios.defaults.baseURL = 'http://127.0.0.1:5000';

// 请求拦截器(后端接收到请求前可以做一些事情)
axios.interceptors.request.use(config => {
    if (local.get('token')) {
        config.headers.authorization = local.get('token');
    }
    return config
})

// 响应拦截器(接收到后端返回的数据前可以做一些事情)
// response: 后端正常返回了数据
// err: 后端返回了错误的信息
axios.interceptors.response.use(response => {
    if (response.data.code != undefined && response.data.msg != undefined) {
        if (response.data.code === 0) {
            Message.success(response.data.msg);
        }
    }
    return response
}, err => {
    // 如果用户的token是错误的,就强制跳转登录界面
    if (err.response.status == 401) {
        router.push('/login');
        return Promise.reject(err);
    }
})

export default axios;