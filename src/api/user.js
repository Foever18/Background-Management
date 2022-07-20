import request from '@/utils/request'

export const login = ({ username, password }) => {
  return request({
    url: 'login',
    method: 'POST',
    data: {
      username, password
    }
  })
}

/** 获取用户信息
 * @query 查询参数
 * @pagenum  当前页码
 * @pagesize 每页显示条数
 */
export const getUserInfo = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

/**
 * 修改用户状态
 * @uId 用户 ID
 * @type  用户状态
 */
export const changeUserState = ({ uId, type }) => {
  return request({
    url: `users/${uId}/state/${type}`,
    method: 'PUT'
  })
}

// 添加用户信息
export const addUser = ({ username, password, email, mobile }) => {
  return request({
    url: 'users',
    method: 'POST',
    data: {
      username, password, email, mobile
    }

  })
}

// 添加用户信息
export const changeUser = ({ id, email, mobile }) => {
  return request({
    url: `users/${id}`,
    method: 'PUT',
    data: {
      email, mobile
    }

  })
}

// 删除用户信息
export const deleteUser = (id) => {
  return request({
    url: `users/${id}`,
    method: 'DELETE'
  })
}

// 修改用户角色
export const changeUserRole = (id, rid) => {
  return request({
    url: `users/${id}/role`,
    method: 'PUT',
    data: { rid }
  })
}
