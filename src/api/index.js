import ajax from './ajax'
import jsonp from 'jsonp'
import {
    message
} from 'antd'


//请求登录接口
export const reqLogin = (username, password) => {
    return ajax({
        method: 'post',
        url: '/login',
        data: {
            username,
            password
        },
    })
}
//获取分类列表
export const reqCategorys = () => {
    return ajax('/manage/category/list')
}
// 添加分类
export const reqAddCategorys = (categoryName) => {
    return ajax.post('/manage/category/add', {
        categoryName
    })
}
// 修改分类
export const reqUpadateCategorys = ({
    categoryId,
    categoryName
}) => {
    return ajax.post('/manage/category/update', {
        categoryId,
        categoryName
    })
}

//获取商品列表

export const reqProducts = (pageNum, pageSize) => {
    return ajax('/manage/product/list', {
        params: {
            pageNum,
            pageSize
        }
    })
}

// 根据name和desc搜索商品
export const reqSearchProducts = ({
    pageNum,
    pageSize,
    searchName,
    searchType //他的值只能是productName或者parductDesc
}) => {
    return ajax('/manage/product/search', {
        params: {
            pageNum,
            pageSize,
            [searchType]: searchName
        }
    })

}

//商品上架下架处理
export const reqUpdateStatus = (productId, status) => {
    return ajax('/manage/product/updateStatus', {
        method: "post",
        data: {
            productId,
            status
        }
    })
}

//根据id获取分类商品
export const reqCategory = (categoryId) => {
    return ajax('/manage/category/info', {
        params: {
            categoryId
        }
    })
}
//删除图片文件
export const reqDeletImg = (name) => {
    return ajax.post('/manage/img/delete', {
        name
    })
}

//添加商品//修改更新商品

export const reqAddUpdateProduct = (product) => {
    return ajax.post('/manage/product/' + (product._id ? 'update' : 'add'), product)
}

// 添加角色
export const reqAddRole = (roleName) => ajax.post('/manage/role/add', {roleName})
// 获取角色列表
export const reqRoles = () => ajax('/manage/role/list')
// 更新角色 ( 给角色设置权限 )
export const reqUpdateRole = (role) => ajax.post('/manage/role/update', role)

// 添加 / 更新用户
export const reqAddOrUpdateUser = (user) => ajax.post('/manage/user/'+(user._id ? 'update' :
'add'), user)
// 获取用户列表
export const reqUsers = () => ajax('/manage/user/list')
// 删除用户
export const reqDeleteUser = (userId) => ajax.post('/manage/user/delete', {userId})


//jsonp请求
export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {

        const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=ac3719686cace5e07863df64d9ddf421`
        jsonp(url, {}, (err, data) => {
            if (!err) {
                //成功
                const {
                    city,
                    weather,
                    temperature
                } = data.lives[0];
                resolve({
                    city,
                    weather,
                    temperature
                })
            } else {
                message.error("获取天气信息失败")
            }
        })
    })
}