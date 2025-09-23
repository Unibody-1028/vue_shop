<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-table :data="menuList" border style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="权限名称"></el-table-column>
          <el-table-column prop="path" label="权限路径"></el-table-column>
          <el-table-column prop="level" label="权限等级">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.level==1">一级菜单</el-tag>
              <el-tag type="success" v-else>二级菜单</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: []
    }
  },
  created() {
    this.getMenulist()
  },
  methods: {
    async getMenulist() {
      const {data: res} = await this.$axios.get('/menu', {params: {type: 'list'}})
      if (res.status !== 200) return this.$msg.error(res.msg)
      this.menuList = res.data
      // return this.$msg.success(res.msg)
    }
  }
}

</script>
<style scoped lang="less">

</style>
