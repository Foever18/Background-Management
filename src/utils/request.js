import axios from 'axios'
import store from '@/store'
import _this from '../main.js'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 8000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = store.state.token
  return config
}, function (error) {
  // 对请求错误做些什么
  _this.$message.error(error.message)
  // return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { meta } = response.data
  if (meta.status === 400) {
    // throw Error(meta.msg)
    return Promise.reject(new Error(meta.msg))
  }
  return response.data
}, function (error) {
  // 对响应错误做点什么
  _this.$message.error(error.message)
  // return Promise.reject(error)
})
export default request
