import request from '@/utils/request'

/**
 *获取所有的权限列表
 * @param {*} type
 * @returns
 */
export const getPermission = (type) => {
  return request({
    url: `rights/${type}`
  })
}
