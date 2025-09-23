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
          <el-input v-model="qname" placeholder="请输入商品名称" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList">搜索</el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" style="margin-left: 10px">增加商品
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table border style="margin-top: 15px" :data="goodList">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="商品价格(元)" prop="price" width="150px"></el-table-column>
          <el-table-column label="商品库存" prop="number" width="150px"></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button size="mini" type="success" icon="el-icon-edit">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-edit" @click="removeGoods(scope.row.id)">删除
              </el-button>
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
      goodList: [],
      qname: ''
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const {data: resp} = await this.$axios.get('/goods_list', {
        params: {name: this.qname}
      })
      if (resp.status !== 200) return this.$msg.error(resp.msg)
      this.goodList = resp.data
      return this.$msg.success(resp.msg)
    },
    removeGoods(gid) {
      this.$confirm('此操作将永久删除该商品数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {data: resp} = await this.$axios.delete('/goods', {data: {id: gid}})
        if (resp.status !== 200) return this.$msg.error(resp.msg)
        this.$msg.success(resp.msg)
        this.getGoodsList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}

</script>
<style>

</style>
