<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 新增分类按钮-->
      <el-row :gutter="40">
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-circle-plus-outline">
            新增商品分类
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <tree-table :data="cateList" :columns="columns" :selection-type="false"
                    :expand-type="false" class="tree-table" border="true"
                    show-index="true">
          <template slot="level" slot-scope="scope">
            <el-tag v-if="scope.row.level===1">一级分类</el-tag>
            <el-tag v-else-if="scope.row.level===2" type="success">二级分类</el-tag>
            <el-tag v-else type="warning">三级分类</el-tag>
          </template>
          <template slot="opt" slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit" type="primary">编辑</el-button>
            <el-button size="mini" icon="el-icon-delete" type="danger">删除</el-button>
          </template>
        </tree-table>
      </el-row>

    </el-card>
  </div>
</template>

<style>
.tree-table {
  margin-top: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      cateList: [],
      columns: [
        {label: '分类名称', prop: 'name'},
        {label: '分类等级', type: 'template', template: 'level'},
        {label: '操作', type: 'template', template: 'opt'}
      ]
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const {data: res} = await this.$axios.get('/category_list')
      // console.log(res.data)
      if (res.status !== 200) return this.$msg.error(res.msg)
      this.cateList = res.data.data
      // this.$msg.success(res.msg)
    }
  }
}
</script>
