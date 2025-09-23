<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>增加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert title="增加商品信息" type="success" center show-icon
                style="margin: 0 auto 10px;width: 600px;"></el-alert>

      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="商品静态参数"></el-step>
        <el-step title="商品动态参数"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form :model="addForm" ref="addRef" :rules="addRules" label-position="top">
        <el-tabs v-model="active" :tab-position="'left'" style="margin-top: 20px;margin-left:-10px">
          <el-tab-pane label="基本信息" name="1">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
              <el-input v-model="addForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="number">
              <el-input v-model="addForm.number"></el-input>
            </el-form-item>
            <el-form-item label="商品权重" prop="weight">
              <el-input v-model="addForm.weight"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="cid">
              <el-cascader
                v-model="selectKeys"
                :options="cateIdList"
                :props="{ expandTrigger: 'hover',label: 'name',value: 'id'}"
                clearable separator=">"
                @change="changeSeletor"
                style="margin-left: 20px;width:20%">
              </el-cascader>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="商品静态参数" name="2">商品静态参数</el-tab-pane>
          <el-tab-pane label="商品动态参数" name="3">商品动态参数</el-tab-pane>
          <el-tab-pane label="商品图片" name="4">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="5">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

  </div>
</template>
<script>
export default {
  data() {
    return {
      active: '1',
      addForm: {
        name: '',
        price: 0,
        number: 0,
        weight: 0
      },
      addRules: {
        name: [{required: true, message: '请填写商品名称', tirgger: 'blur'}],
        price: [{required: true, message: '请填写商品价格', tirgger: 'blur'}],
        number: [{required: true, message: '请填写商品数量', tirgger: 'blur'}],
        weight: [{required: true, message: '请填写商品权重', tirgger: 'blur'}]
      },
      cateIdList: [],
      selectKeys: []
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
    },
    changeSeletor() {

    }
  }
}
</script>
<style>
</style>
