<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-input>
            <el-button slot="append" icon="el-icon-search">搜索</el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" style="margin-left: 10px">增加商品
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table border style="margin-top: 15px">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="商品价格(元)" prop="price"></el-table-column>
          <el-table-column label="商品库存" prop="number"></el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="" >
              <el-button size="mini" type="success" icon="el-icon-edit">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-edit">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>

</script>
<style>

</style>
