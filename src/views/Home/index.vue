<template>
  <div>
    <el-container class="container">
      <!-- 头部信息 -->
      <el-header>
        <div class="avatar">
          <el-avatar :size="60">
            <template #default>
              <img src="@/assets/ef9feba9a7949dc2d8f8672d5d52513.jpg" alt="" />
            </template>
          </el-avatar>
          <i>杭州零元购后台管理系统</i>
        </div>
        <el-button size="medlum" @click="logout">退出</el-button>
      </el-header>

      <el-container>
        <!-- 侧边导航内容 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div
            data-v-b751d776=""
            class="toggleMenu"
            @click="isCollapse = !isCollapse"
          >
            |||
          </div>
          <el-menu
            background-color="#373d41"
            text-color="#fff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
          >
            <!-- 用户管理 -->
            <el-submenu index="1">
              <template #title>
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/user">
                <i class="el-icon-menu"></i>用户列表
              </el-menu-item>
            </el-submenu>

            <!-- 权限管理 -->
            <el-submenu index="2">
              <template #title>
                <i class="el-icon-s-tools"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="/roles">
                <i class="el-icon-menu"></i>角色列表
              </el-menu-item>
              <el-menu-item index="/permission">
                <i class="el-icon-menu"></i>权限列表
              </el-menu-item>
            </el-submenu>

            <!-- 商品管理 -->
            <el-submenu index="3">
              <template #title>
                <i class="el-icon-s-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="goods">
                <i class="el-icon-menu"></i>商品列表
              </el-menu-item>
              <el-menu-item index="params">
                <i class="el-icon-menu"></i>分类参数
              </el-menu-item>
              <el-menu-item index="categories">
                <i class="el-icon-menu"></i>商品分类
              </el-menu-item>
            </el-submenu>

            <!-- 订单管理 -->
            <el-submenu index="4">
              <template #title>
                <i class="el-icon-s-order"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>订单列表
              </el-menu-item>
            </el-submenu>

            <!-- 数据统计 -->
            <el-submenu index="5">
              <template #title>
                <i class="el-icon-s-marketing"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="5-1">
                <i class="el-icon-menu"></i>数据列表
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <!-- 内容显示区域 -->
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            v-if="this.$route.path !== '/Welcome'"
          >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{
              this.$route.meta.parentTitle
            }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{
              this.$route.meta.title
            }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 卡片列表  -->
          <el-card class="box-card" v-if="this.$route.path !== '/Welcome'">
            <router-view></router-view>
          </el-card>
          <p v-else>欢迎登陆</p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created () {
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    logout () {
      this.$store.commit('delToken')
      this.$router.push('/login')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/ .el-card {
  margin-top: 16px;
  .el-card__header {
    border-bottom: unset;
  }
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.toggleMenu {
  width: 100%;
  height: 40px;
  background-color: #409eff;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  letter-spacing: 5px;
  color: #fff;
}
.avatar {
  display: flex;
  justify-items: center;
  i {
    font-style: normal;
    line-height: 64px;
    color: #fff;
    font-size: 22px;
    margin-left: 10px;
  }
}
.container {
  height: 100vh;
  .el-header {
    background-color: #373d41;
  }
  .el-aside {
    background-color: #373d41;
  }
  .el-main {
    background-color: #eaedf1;
  }
  .el-menu {
    border-right: none;
  }
}
</style>
