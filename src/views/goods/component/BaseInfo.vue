<template>
  <div>
    <el-form
      ref="form"
      label-width="80px"
      label-position="top"
      :model="baseInfo"
      :rules="rules"
    >
      <el-form-item label="活动名称" prop="goods_name">
        <el-input v-model="baseInfo.goods_name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="goods_price">
        <el-input v-model="baseInfo.goods_price"></el-input>
      </el-form-item>
      <el-form-item label="商品重量" prop="goods_weight">
        <el-input v-model="baseInfo.goods_weight"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="goods_number">
        <el-input v-model="baseInfo.goods_number"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="goods_cat">
        <template>
          <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"
          ></el-cascader>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCategories } from '@/api/goods'
export default {
  async created () {
    const res = await getCategories()
    console.log(res)
  },
  data () {
    return {
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在2到8个字符', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: ''
      },
      baseInfo: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: ''
      },
      value: '',
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }]
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
