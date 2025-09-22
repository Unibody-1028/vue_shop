<template>
  <div>
    <!--  面包屑  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
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
              <el-row :class="['bottom',i===0?'top':'','rcenter']" v-for="(m,i) in scope.row.menu" :key="m.id">
                <el-col :span="4">
                  <el-tag style="width: 120px; text-align: center " closable @click="removeMenu(scope.row,m.id)">
                    {{ m.name }}
                  </el-tag>
                  <i class="el-icon-caret-right" :span="4" style="margin-left: 50px;"></i>
                </el-col>
                <el-col :span="4">
                  <el-tag v-for="sm in m.children" :key="sm.id" type="success"
                          style="width: 120px;text-align: center" closable @click="removeMenu(scope.row,sm.id)">
                    {{ sm.name }}
                  </el-tag>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <el-table-column type="index"></el-table-column>
          <el-table-column prop="id" label="ID" width="100px"></el-table-column>
          <el-table-column prop="name" label="角色名称" width="150px"></el-table-column>
          <el-table-column prop="desc" label="角色详情" width="500px"></el-table-column>
          <el-table-column prop="level" label="操作">
            <template slot-scope="scope">
              <el-button type="success" @click="showEdit(scope.row)" icon="el-icon-edit">编辑</el-button>
              <el-button type="warning" @click="showMenuDialog(scope.row)" icon="el-icon-delete">分配权限</el-button>
              <el-button type="danger" @click="MenuDialog(scope.row)" icon="el-icon-settings">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <el-dialog title="分配权限" :visible.sync="menudialogVisible" width="30%" :before-close="dialogClose">
      <el-tree :data="menuList" :props="menuProps" show-checkbox default-expand-all
               :default-checked-keys="keyList" node-key="id"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
      keyList: [],
      menudialogVisible: false,
      menuProps: {
        children: 'children',
        label: 'name'
      },
      menuList: []
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
    },
    removeMenu(row, mid) {
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // console.log(row.id)
          // console.log(mid)
          const {data: resp} = await this.$axios.get(`/del_menu/${row.id}/${mid}`)
          if (resp.status !== 200) return this.$msg.error(resp.msg)
          // this.getRolelist()
          row.menu = resp.data
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    showMenuDialog(row) {
      // 显示分配权限窗口时,重新获得角色权限列表
      this.getMenulist()
      this.menudialogVisible = true
      this.getKeys(row.menu)
      console.log(this.keyList)
    },
    async getMenulist() {
      const {data: resp} = await this.$axios.get('/menu')
      if (resp.status !== 200) return this.$msg.error(resp.msg)
      this.menuList = resp.data
    },
    getKeys(menu) {
      menu.forEach(item => {
        item.children.forEach(i => {
          this.keyList.push(i.id)
        })
      })
    },
    dialogClose () {
      this.keyList = []
      this.menudialogVisible = false
    }
  }
}

</script>
<style scoped lang="less">
.top {
  border-top: 1px solid #eeeeee;
}

.bottom {
  border-bottom: 1px solid #eeeeee;
}

.el-tag {
  margin: 10px;
}

.rcenter {
  display: flex;
  align-items: center;
}
</style>
