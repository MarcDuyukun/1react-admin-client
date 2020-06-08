import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

//请求拦截
axios.interceptors.request.use(config =>{

    const {method,data} =config;
     if(method.toLowerCase()==='post'&&typeof data ==='object'){
         config.data =qs.stringify(data)
     }
    return config;
},error =>{

})



// 响应拦截器
axios.interceptors.response.use(response =>{
    return response.data;
},error =>{
    // return Promise.reject(error)
    //返回一个的pending 中断promise链 
    message.error('请求出错了————'+error)
    return new Promise(()=>{})
})

export default axios;