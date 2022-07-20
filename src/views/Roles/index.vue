<template>
  <div>
    <!-- 添加用户按钮 -->
    <el-button type="primary" style="margin-bottom: 15px">添加角色</el-button>

    <!-- 角色列表 -->
    <el-table :data="rolesList" border style="width: 100%" stripe>
      <el-table-column prop="date" label="#" width="50" type="expand">
        <!-- 下拉展开框 -->
        <template slot-scope="scope">
          <el-row
            v-for="(item, index) in scope.row.children"
            :key="item.id"
            :class="['bdBottom', index === 0 ? 'bdTop' : '']"
          >
            <!-- 一级管理权限 -->
            <el-col :span="6">
              <el-tag> {{ item.authName }} </el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>

            <!-- 右侧添加分配权限 -->
            <el-col :span="18">
              <el-row
                v-for="(item1, index) in item.children"
                :key="item1.id"
                :class="[index === 0 ? '' : 'bdTop']"
              >
                <!-- 二级权限 -->
                <el-col :span="6">
                  <el-tag type="success"> {{ item1.authName }} </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>

                <el-col :span="18">
                  <!-- 三级权限修改 -->
                  <el-tag
                    v-for="item2 in item1.children"
                    :key="item2.id"
                    type="warning"
                    closable
                    @close="
                      delPermission(
                        scope.row.id,
                        item2.id,
                        item2,
                        item1.children
                      )
                    "
                  >
                    {{ item2.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="#" width="50" type="index">
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称"> </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
      <el-table-column prop="level" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit">
            编辑
          </el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete">
            删除
          </el-button>
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-setting"
            @click="getPermission(scope.row)"
          >
            分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分配权限弹出框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-tree
        :data="permissionList"
        show-checkbox
        node-key="id"
        ref="tree"
        default-expand-all
        :props="{ label: 'authName' }"
        :default-checked-keys="roleCurrentRes"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCommit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, delRolesPermission, changeRolesPermission } from '@/api/roles'
import { getPermission } from '@/api/Permission'
export default {
  async created () {
    this.getRoles()
  },
  data () {
    return {
      data: {
        roleId: '',
        rids: ''
      },
      permissionList: [],
      dialogFormVisible: false,
      rolesList: [],
      roleCurrentRes: []
    }
  },
  methods: {
    // 获取用户权限信息
    async getRoles () {
      const res = await getRoles()
      this.rolesList = res.data
      console.log(res)
    },

    // 删除用户权限
    async delPermission (roleId, rightId, tag, dynamicTags) {
      try {
        await this.$confirm('此操作将删除该用户的权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 确定后发送删除请求
        await delRolesPermission(roleId, rightId)
        // 找到渲染的数据,并把其删除就可以实现动态减少标签
        dynamicTags.splice(dynamicTags.indexOf(tag), 1)
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
        this.$message.info('已取消删除')
      }
    },

    // 获取权限列表/分配用户权限
    async getPermission (val) {
      this.data.roleId = val.id

      this.dialogFormVisible = true
      this.roleCurrentRes = []
      this.recursion(val.children)
      console.log(this.roleCurrentRes)
      try {
        const res = await getPermission('tree')
        this.permissionList = res.data
        console.log(res)
      } catch (err) {
        this.$message.error(err.message)
      }
    },

    // 确认修改用户权限
    async handleCommit () {
      this.dialogFormVisible = false
      try {
        // 获取当前半选中的id和当前选中的id并组合
        const res = [...this.$refs.tree.getHalfCheckedKeys(), ...this.$refs.tree.getCheckedKeys()]
        // 参数需要传的是字符串,将数组转化成字符串
        await changeRolesPermission(this.data.roleId, res.join(','))
        // 成功后刷新用户权限数据
        this.getRoles()
        this.$message.success('修改成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 递归函数
    recursion (list) {
      list.forEach(item => {
        if (item.children) {
          this.recursion(item.children)
        } else {
          this.roleCurrentRes.push(item.id)
        }
      }
      )
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.bdBottom {
  border-bottom: 1px solid rgb(228, 228, 228);
}
.bdTop {
  border-top: 1px solid rgb(228, 228, 228);
}
.el-tag {
  margin: 8px;
}
.el-row {
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
/deep/.el-table__expanded-cell {
  padding: 20px 50px !important;
}
</style>
