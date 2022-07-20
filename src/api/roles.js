import request from '@/utils/request'

export const getRoles = () => {
  return request({
    url: 'roles'
  })
}

/**
 *删除角色权限
 * @param {*} roleId 角色id
 * @param {*} rightId 权限id
 * @returns
 */
export const delRolesPermission = (roleId, rightId) => {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'DELETE'
  })
}

/**
 *修改角色权限
 * @param {*} roleId 角色 ID
 * @param {*} rids 权限 ID 列表（字符串）
 * @returns
 */
export const changeRolesPermission = (roleId, rids) => {
  return request({
    url: `roles/${roleId}/rights`,
    method: 'POST',
    data: {
      rids
    }
  })
}
