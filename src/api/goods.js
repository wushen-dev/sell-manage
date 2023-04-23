import request from '@/utils/request'

// 获取商品分类信息
export const getGoodsCate = params => {
    return request({
        method: 'get',
        url: '/goods/catelist',
        params
    })
}

// 修改分类
export const cateEdit = data => {
    return request({
        method: 'post',
        url: '/goods/editcate',
        data
    })
}

// 添加分类
export const cateAdd = data => {
    return request({
        method: 'post',
        url: '/goods/addcate',
        data
    })
}