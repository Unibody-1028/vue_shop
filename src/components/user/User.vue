<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card >
      <div style="margin-top: 5px;">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-input placeholder="请输入用户名" v-model="queryInfo.name" >
              <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addDialogVisible=true">新增用户</el-button>
          </el-col>
        </el-row>
        <el-row >
            <el-table :data="userList" border style="width: 100%">
                <el-table-column type="index" label="索引"></el-table-column>
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
    <!--  新增用户窗口  -->
    <el-dialog title="新增用户" :visible.sync="addDialogVisible" width="30% " :before-close="handleClose">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nick_name">
          <el-input v-model="addForm.nick_name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="addForm.pwd" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repwd">
          <el-input v-model="addForm.repwd"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        return callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      // 定义正则表达式验证手机号是否有效
      const phoneReg = /^1[3-9]\d{9}$/
      if (phoneReg.test(value)) {
        return callback()
      }
      return callback(new Error('请输入有效的手机号'))
    }
    const validateEmail = (rule, value, callback) => {
      // 定义正则表达式验证邮箱是否有效
      const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (emailReg.test(value)) {
        return callback()
      }
      return callback(new Error('请输入有效的邮箱'))
    }

    return {
      userList: [],
      queryInfo: {
        name: '',
        pnum: 1,
        nsize: 2
      },
      total: 0,
      addDialogVisible: false,
      addForm: {},
      addFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在2-6个字符之间', trigger: 'blur' }
        ],
        nick_name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在2-6个字符之间', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在6-16个字符之间', trigger: 'blur' }
        ],
        repwd: [
          { required: true, message: '请输入确认', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ]

      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$axios.get('/user/user_list',
        { params: this.queryInfo })
      if (res.status !== 200) return this.$message.error(res.msg)
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
    },
    searchUser () {
      this.queryInfo.pnum = 1
      this.getUserList()
    },
    handleClose () {}
  }
}
</script>

<style scoped lang="less">
.el-table{
  margin-top: 10px
}
</style>
