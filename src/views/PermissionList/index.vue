<template>
  <el-table :data="permissionList" border style="width: 100%" stripe>
    <el-table-column prop="date" label="#" width="50" type="index">
    </el-table-column>
    <el-table-column prop="authName" label="权限名称"> </el-table-column>
    <el-table-column prop="path" label="路径"> </el-table-column>
    <el-table-column prop="level" label="权限等级">
      <template slot-scope="scope">
        <el-tag
          :type="
            scope.row.level === '0'
              ? ''
              : scope.row.level === '1'
              ? 'success'
              : 'warning'
          "
          >{{
            scope.row.level === "0"
              ? "等级一"
              : scope.row.level === "1"
              ? "等级二"
              : "等级三"
          }}</el-tag
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getPermission } from '@/api/Permission'
export default {
  async created () {
    try {
      const res = await getPermission('list')
      this.permissionList = res.data
      console.log(res)
    } catch (err) {
      this.$message.error(err.message)
    }
  },
  data () {
    return {
      permissionList: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
</style>
