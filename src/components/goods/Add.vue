<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>增加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card >

      <el-alert
        title="增加商品信息"
        type="success"
        center
        show-icon style="margin: 0 auto 10px;width: 600px;">
      </el-alert>

      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品静态参数"></el-step>
        <el-step title="商品动态参数"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-tabs v-model="active" :tab-position="'left'" style="height: 200px;margin-top: 20px;margin-left:-10px">
        <el-tab-pane label="基本信息" name="1">基本信息</el-tab-pane>
        <el-tab-pane label="商品静态参数" name="2">商品静态参数</el-tab-pane>
        <el-tab-pane label="商品动态参数" name="3">商品动态参数</el-tab-pane>
        <el-tab-pane label="商品图片" name="4">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容" name="5">商品内容</el-tab-pane>
      </el-tabs>

    </el-card>

  </div>
</template>
<script>
export default {
  data() {
    return {
      active: '1'
    }
  }
}
</script>
<style>

</style>
