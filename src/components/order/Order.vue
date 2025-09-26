<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-input v-model="qid" placeholder="请输入订单名称" clearable @clear="getOrderList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList">搜索</el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" style="margin-left: 10px" @click="addGoodsPage">增加商品
          </el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-table border style="margin-top: 15px" :data="orderList">
          <el-table-column type="index"></el-table-column>
          <el-table-column label="id" prop="id" width="150px"></el-table-column>
          <el-table-column label="订单用户" prop="uname" width="150px"></el-table-column>
          <el-table-column label="价格" prop="price" width="150px"></el-table-column>
          <el-table-column label="是否支付" prop="pay_status" width="150px">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.pay_status===0" type="danger">未支付</el-tag>
              <el-tag v-else type="success">已支付</el-tag>
            </template>

          </el-table-column>
          <el-table-column label="是否发货" prop="is_send" width="150px">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.is_send===0" type="danger">未发货</el-tag>
              <el-tag v-else type="success">已发货</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button size="mini" type="success" icon="el-icon-edit">编辑</el-button>
              <el-button size="mini" type="danger" icon="el-icon-edit" @click="removeOrders(scope.row.id)">删除
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
      qid: '',
      orderList: []
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      const {data: resp} = await this.$axios.get('/order_list')
      if (resp.status !== 200) return this.$msg.error(resp.msg)
      this.$msg.success(resp.msg)
      this.orderList = resp.data
    }
  }
}
</script>
<style>

</style>
