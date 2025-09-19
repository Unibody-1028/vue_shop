<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card >
      <div style="margin-top: 5px;">
        <el-row>
          <el-col :span="8">
            <el-input placeholder="请输入内容"  class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-circle-plus-outline">新增用户</el-button>
          </el-col>
        </el-row>
        <el-row >
            <el-table :data="userList" border style="width: 100%">

                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="nick_name" label="昵称"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>

            </el-table>
        </el-row>
        <el-pagination

          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pnum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.nsize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
            style="display: flex; justify-content: center;" > //居中样式
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userList: [],
      queryInfo: {
        pnum: 1,
        nsize: 2
      },
      total: 0
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$axios.get('/user/user_list',
        { params: this.queryInfo })
      if (res.status !== 200) return this.$msg.error(res.msg)
      console.log(res.data)
      this.total = res.data.totalPage
      this.userList = res.data.users
    },
    handleSizeChange (val) {
      this.queryInfo.nsize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.queryInfo.pnum = val
      this.getUserList()
    }
  }
}
</script>

<style scoped lang="less">
.el-table{
  margin-top: 10px
}
</style>
