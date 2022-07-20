<template>
  <div>
    <div slot="header" class="clearfix">
      <!-- 输入筐 -->
      <el-input v-model.trim="input" placeholder="请输入内容" clearable>
        <template #append>
          <el-button
            type="button"
            icon="el-icon-search"
            @click="queryInfo"
          ></el-button>
        </template>
      </el-input>
      <!-- 添加用户按钮 -->
      <el-button type="primary" @click="addUserShow = true">添加用户</el-button>
    </div>

    <!-- 用户列表 -->
    <div class="text item">
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="switchFn(scope.row.mg_state, scope.row.id)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
            >
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
            >
            </el-button>
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="handleRole(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页功能 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加新的用户" :visible.sync="addUserShow">
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserShow = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="editUserShow"
      v-if="editUserShow"
    >
      <el-form :model="form" :rules="rules" ref="editForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserShow = false">取 消</el-button>
        <el-button type="primary" @click="changeUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="rolesUserShow">
      <el-form ref="editForm">
        <p>
          当前的用户:<span>{{ form.name }}</span>
        </p>
        <p>
          当前的角色:<span>{{ form.role_name }}</span>
        </p>
        <el-form-item label="分配新角色:" :label-width="'100'">
          <el-select v-model="roleValue" placeholder="请选择角色">
            <el-option
              :label="item.roleName"
              :value="item.id"
              v-for="item in rolesLIst"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesUserShow = false">取 消</el-button>
        <el-button type="primary" @click="changeUserRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserInfo, changeUserState, addUser, changeUser, deleteUser, changeUserRole } from '@/api/user'
import { getRoles } from '@/api/roles'
export default {
  created () {
    this.getUserInfo()
  },
  data () {
    const checkEmile = (rule, value, callback) => {
      const arr = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (arr.test(value)) {
        return callback()
      } else {
        return callback(new Error('邮箱格式错误'))
      }
    }
    return {
      roleValue: '',
      tableData: [],
      rolesLIst: [],
      currentPage: 1,
      pagenum: 1,
      pagesize: 5,
      input: '',
      total: null,
      addUserShow: false,
      editUserShow: false,
      rolesUserShow: false,
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2到 7 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用密码', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2到 7 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmile, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机格式不正确', trigger: 'blur' }
        ]
      },
      form: {
        id: '',
        name: '',
        password: '',
        email: '',
        mobile: '',
        role_name: ''
      },
      formLabelWidth: '80px'
    }
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      try {
        const res = await getUserInfo({ pagenum: this.pagenum, pagesize: this.pagesize })
        this.tableData = res.data.users
        this.total = res.data.total
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    // 改变页码规格
    async handleSizeChange (val) {
      this.pagesize = val
      this.getUserInfo()
    },

    // 改变页码页数
    async handleCurrentChange (val) {
      this.pagenum = val
      this.getUserInfo()
    },

    // 改变用户状态
    async switchFn (state, id) {
      try {
        await changeUserState({ uId: id, type: state })
      } catch (err) {
        console.log(err)
      }
      console.log(id)
    },

    // 查询用户
    async queryInfo () {
      const res = await getUserInfo({ query: this.input, pagenum: this.pagenum, pagesize: this.pagesize })
      this.tableData = res.data.users
    },

    // 增加用户
    addUser () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const res = await addUser({ username: this.form.name, password: this.form.password, email: this.form.email, mobile: this.form.mobile })
            console.log(res)
            // 判断用户信息是否添加成功
            if (res.data.meta.status === 400) {
              // return new Error(res.data.meta.msg)
              throw Error(res.data.meta.msg)
              // return Promise.reject(new Error(res.data.meta.msg))
            }
            this.$refs.loginForm.resetFields()
            this.addUserShow = false
          } catch (err) {
            this.$message.error(err.message)
          }
        } else {
          this.$message.error('表单数据填写错误')
          return false
        }
      })
    },

    // 点击开启用户编辑
    handleEdit (val) {
      this.form.name = val.username
      this.form.email = val.email
      this.form.mobile = val.mobile
      console.log(val)
      this.form.id = val.id
      this.editUserShow = true
    },

    // 提交编辑用户信息
    changeUser () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          try {
            const res = await changeUser(this.form)
            console.log(res)
            // 判断用户信息是否添加成功
            if (res.data.meta.status === 400) {
              throw Error(res.data.meta.msg)
            }
            this.getUserInfo()
            this.editUserShow = false
          } catch (err) {
            this.$message.error(err.message)
          }
        } else {
          this.$message.error('表单数据填写错误')
          return false
        }
      })
    },

    // 删除用户
    async handleDelete (val) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        try {
          await deleteUser(val.id)
          this.$message.success('删除用户成功')
          // this.getUserInfo()
        } catch (err) {
          this.$message.error(err.message)
        }
      } catch (err) {
        this.$message.info({
          message: '已取消删除'
        })
      }
    },

    // 点击分配角色
    async handleRole (val) {
      this.form = val
      this.rolesUserShow = true
      try {
        // 获取角色列表
        const res = await getRoles()
        console.log(res)
        this.rolesLIst = res.data
      } catch (err) {
        console.log(err)
      }
    },
    // 确认修改用户角色
    async changeUserRole () {
      try {
        await changeUserRole(this.form.id, this.roleValue)
        this.$message.success('修改用户角色成功')
        this.getUserInfo()
      } catch (err) {
        this.$message.error(err.message)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.clearfix {
  margin-bottom: 15px;
}
.el-pagination {
  margin-top: 15px;
}
.el-input-group {
  width: 275px;
  margin-right: 20px;
}
</style>
