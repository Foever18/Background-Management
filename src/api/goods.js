import request from '@/utils/request'

/**
 * 获取/查询列表数据
 * @param {*} query 查询参数
 * @pagenum  当前页码
 * @pagesize 每页显示条数
 */
export const getGood = (params) => {
  return request({
    url: 'goods',
    params
  })
}

/**
 * type 值：1，2，3 分别表示显示一层二层三层分类列表
 * pagenum 当前页码值
 * pagesize 每页显示多少条数据
 */
export const getCategories = (params) => {
  return request({
    url: 'categories',
    params
  })
}
