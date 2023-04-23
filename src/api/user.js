import request from '@/utils/request'

// 登录接口
export const checkLogin = data => {
    return request({
        method: 'post',
        url: '/users/checkLogin',
        data
    })
}

// 添加账号接口
export const accountAdd = data => {
    return request({
        method: 'post',
        url: '/users/add',
        data
    })
}

// 获取账号信息接口
export const accountList = params => {
    return request({
        method: 'get',
        url: '/users/list',
        params
    })
}

// 删除单条账号信息
export const accountDel = params => {
    return request({
        method: 'get',
        url: '/users/del',
        params
    })
}

// 修改账号信息接口
export const accountEdit = data => {
    return request({
        method: 'post',
        url: '/users/edit',
        data
    })
}

// 批量删除账号信息
export const accountBatchDel = params => {
    return request({
        method: 'get',
        url: '/users/batchdel',
        params
    })
}

// 检查旧密码
export const oldpwdCheck = params => {
    return request({
        method: 'get',
        url: '/users/checkoldpwd',
        params
    })
}

// 修改密码
export const editpwd = data => {
    return request({
        method: 'post',
        url: '/users/editpwd',
        data
    })
}

// 获取个人中心信息
export const getUserInfo = () => {
    return request({
        method: 'get',
        url: '/users/info',
    })
}

// 修改用户头像
export const uploadAvatar = params => {
    return request({
        method: 'get',
        url: '/users/avataredit',
        params
    })
}