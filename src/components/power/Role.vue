<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--    内容显示-->
    <el-card>
      <!--      新增角色按钮-->
      <el-row :gutter="40">
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addDialogVisible=true">新增角色
          </el-button>
        </el-col>
      </el-row>
      <!--表格数据-->
      <el-row style="margin-top: 5px;">
        <el-table :data="roleList" border style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-row v-for="m in scope.row.menu" :key="m.id">
                <el-col :span="10">{{ m.name }}</el-col>
                <el-col :span="14"><span v-for="sm in m.children" :key="sm.id">{{sm.name}}</span></el-col>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column type="index"></el-table-column>
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="name" label="角色名称"></el-table-column>
          <el-table-column prop="desc" label="角色详情"></el-table-column>
          <el-table-column prop="level" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="showEdit(scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="warning"
                @click="showReset(scope.row)">分配权限
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="showDel(scope.row)">删除
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
      roleList: []
    }
  },
  created() {
    this.getRolelist()
  },
  methods: {
    async getRolelist() {
      const {data: res} = await this.$axios.get('/role')
      if (res.status !== 200) return this.$msg.error(res.msg)
      this.roleList = res.data
      return this.$msg.success(res.msg)
    }
  }
}

</script>
<style scoped lang="less">

</style>
