<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>增加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-steps :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品静态参数"></el-step>
        <el-step title="商品动态参数"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-tabs :tab-position="'left'" style="height: 200px;margin-top: 20px;margin-left: -10px">
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="商品静态参数">商品静态参数</el-tab-pane>
        <el-tab-pane label="商品动态参数">商品动态参数</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>

    </el-card>

  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>
<style>

</style>
