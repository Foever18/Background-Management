<template>
  <div>
    <div slot="header" class="clearfix">
      <!-- 搜索商品信息 -->
      <el-input
        v-model.trim="paramsData.query"
        placeholder="请输入内容"
        clearable
      >
        <template #append>
          <el-button
            type="button"
            icon="el-icon-search"
            @click="queryGoodsInfo"
          ></el-button>
        </template>
      </el-input>

      <!-- 添加用户按钮 -->
      <el-button type="primary" @click="addGoods">添加商品</el-button>
    </div>

    <!-- 用户列表 -->
    <div class="text item">
      <el-table :data="goodsList" border style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="50"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="400">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量">
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ (scope.row.add_time * 1000) | dateFormate }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              >删除
            </el-button>
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
  </div>
</template>

<script>
import { getGood } from '@/api/goods'
export default {
  created () {
    console.log(new Date().getTime())
    this.getGoods()
  },
  data () {
    return {
      currentPage: 1,
      total: null,
      paramsData: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      goodsList: []
    }
  },
  methods: {
    // 获取商品信息
    async getGoods () {
      try {
        const res = await getGood(this.paramsData)
        this.goodsList = res.data.goods
        this.total = res.data.total
      } catch (err) {
        console.log(err)
      }
    },

    // 查询商品信息
    queryGoodsInfo () {
      this.getGoods()
    },

    // 添加商品
    addGoods () {
      this.$router.push('/addGoods')
    },
    // 改变页码规格
    async handleSizeChange (val) {
      this.paramsData.pagesize = val
      this.getGoods()
    },

    // 改变页码页数
    async handleCurrentChange (val) {
      this.paramsData.pagenum = val
      this.getGoods()
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
  width: 320px;
  margin-right: 20px;
}
</style>
