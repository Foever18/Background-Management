<template>
  <div class="login-container">
    <div class="form_box">
      <el-form :model="loginForm" :rules="rules" ref="loginForeRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录998</el-button>
          <el-button type="info" @click="reset">重置</el-button>
          <el-button>66</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8位之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8位之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      console.log(1)
      this.$refs.loginForeRef.resetFields()
    },
    async login () {
      // if (this.$store.state.token) { this.$router.push('home') }
      try {
        await this.$refs.loginForeRef.validate()
        try {
          const res = await login(this.loginForm)
          console.log(res)
          if (res.meta.status === 400) {
            this.$message.error('用户名或者密码不正确')
          } else {
            this.$store.commit('setToken', res.data.token)
          }
        } catch (err) {
          this.$message.error(err.message)
        }
      } catch (err) {
        this.$message.error('校验失败')
      }
      this.$router.push('/Welcome')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/1.jpg") no-repeat center;
  background-size: cover;
  background-color: #367ada;
  display: flex;
  justify-content: center;
  align-items: center;
  .form_box {
    width: 450px;
    height: 240px;
    background-color: #fff;
    padding: 30px 15px;
    box-sizing: border-box;
    .btn-item {
      text-align: right;
    }
  }
}
</style>
