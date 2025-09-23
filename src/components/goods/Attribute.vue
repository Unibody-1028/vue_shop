<template>
  <div>    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <span>选择商品分类</span>
          <el-cascader
            :options="cateIdList"
            :props="{ expandTrigger: 'hover',label: 'name',value: 'id'}"
            clearable separator=">"
            style="margin-left: 20px;width: 300px">
          </el-cascader>
        </el-col>
      </el-row>
      <el-row >
        <el-col>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="静态参数" name="first">静态参数</el-tab-pane>
            <el-tab-pane label="动态参数" name="second">动态参数</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>

  </div>

</template>

<script>
export default {
  data() {
    return {
      cateIdList: []
    }
  },
  created() {
    this.getCateIdList()
  },
  methods: {
    async getCateIdList() {
      const {data: resp} = await this.$axios.get('/category_list')
      console.log(resp)
      this.cateIdList = resp.data.data
    }
  }
}
</script>

<style>
.el-tabs{
  margin-top: 5px;
}
</style>
