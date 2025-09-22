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
        数据
      </el-row>

    </el-card>
  </div>
</template>

<style>

</style>

<script setup lang="ts">

</script>
