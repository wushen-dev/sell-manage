import request from '@/utils/request'

// 获取店铺信息的接口
export const getShopInfo = () => {
    return request({
        method: 'get',
        url: '/shop/info'
    })
}

// 保存店铺信息的修改
export const saveShopInfo = data => {
    return request({
        method: 'post',
        url: '/shop/edit',
        data
    })
}