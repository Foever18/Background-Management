<template>
  <div>
    <!--  头部提示框  -->
    <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>

    <!-- 步骤栏 -->
    <el-steps
      :active="currentStep"
      finish-status="success"
      process-status="wait    "
      simple
      style="margin: 20px 0"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>

    <!-- 左侧标签栏 -->
    <el-tabs tab-position="left" @tab-click="handleClick">
      <el-tab-pane label="基本信息"><BaseInfo></BaseInfo></el-tab-pane>
      <el-tab-pane label="商品参数"><GoodsParam></GoodsParam></el-tab-pane>
      <el-tab-pane label="商品属性"><GoodsProp></GoodsProp></el-tab-pane>
      <el-tab-pane label="商品图片"><GoodsPic></GoodsPic></el-tab-pane>
      <el-tab-pane label="商品内容"
        ><RichText></RichText>
        <el-button type="primary" style="margin-top: 10px"
          >添加商品</el-button
        ></el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script>
import BaseInfo from './component/BaseInfo.vue'
import GoodsParam from './component/GoodsParam.vue'
import GoodsProp from './component/GoodsProp.vue'
import GoodsPic from './component/GoodsPic.vue'
import RichText from '@/components/RichText.vue'
export default {
  created () { },
  data () {
    return {
      currentStep: 1
    }
  },
  methods: {
    handleClick (tab, event) {
      this.currentStep = Number(tab.index) + 1
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { BaseInfo, GoodsParam, GoodsProp, GoodsPic, RichText }
}
</script>

<style scoped lang='less'>
/deep/.el-step__title {
  font-size: 14px !important;
}
</style>
