import request from '@/utils/request'

// 获取订单列表
export const getOrderList = params => {
    return request({
        method: 'get',
        url: '/order/list',
        params
    })
}

// 获取首页的订单数据
export const getHomeData = () => {
    return request({
        method: 'get',
        url: '/order/totaldata'
    })
}

// 获取销售统计的订单数据
export const getOrderData = params => {
    return request({
        method: 'get',
        url: '/order/ordertotal',
        params
    })
}