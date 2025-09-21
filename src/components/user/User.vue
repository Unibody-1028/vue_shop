<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <div style="margin-top: 5px;">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-input placeholder="请输入用户名" v-model="queryInfo.name">
              <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addDialogVisible=true">新增用户
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-table :data="userList" border fit>
            <el-table-column type="index" label="索引"></el-table-column>
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="nick_name" label="昵称"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="role_name" label="角色名称"></el-table-column>
            <el-table-column label="操作" width="240">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="showEdit(scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click="showReset(scope.row)">重置密码
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
        <el-pagination

          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pnum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.nsize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          style="display: flex; justify-content: center;"> //居中样式
        </el-pagination>
      </div>
    </el-card>
    <!--  新增用户信息窗口  -->
    <el-dialog title="新增用户" :visible.sync="addDialogVisible" width="30% " :before-close="addFormClose">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nick_name">
          <el-input v-model="addForm.nick_name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="addForm.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="real_pwd">
          <el-input v-model="addForm.real_pwd"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="addForm.role_name" placeholder="请选择角色">
            <el-option :label="r.name" :value="r.id" v-for="r in roles" :key="r.id"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormClose">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!--  修改用户信息窗口  -->
    <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="30% ">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editForm.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nick_name">
          <el-input v-model="editForm.nick_name" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editForm.role_name" placeholder="请选择角色">
            <el-option :label="r.name" :value="r.id" v-for="r in roles" :key="r.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="editUser">保 存</el-button>
      </span>
    </el-dialog>
    <!--  删除用户信息  -->
    <el-dialog title="删除用户" :visible.sync="delDialogVisible" width="30%">
      <span>确定要删除 账户:{{ delName }} 昵称:{{ delNickName }} 的用户吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delUser">确 定</el-button>
      </span>
    </el-dialog>
    <!--  重置用户密码  -->
    <el-dialog title="重置用户密码" :visible.sync="resetDialogVisible" width="30%">
      <span>确定要重置 账户:{{ resetName }} 昵称:{{ resetNickName }} 的密码吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetUser">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
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
        nsize: 10
      },
      total: 0,
      addDialogVisible: false,
      editDialogVisible: false,
      delDialogVisible: false,
      resetDialogVisible: false,
      addForm: {},
      editForm: {},
      delName: '',
      delNickName: '',
      delId: 0,
      resetName: '',
      resetNickName: '',
      resetId: 0,
      roles: [],
      addFormRules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 6, message: '长度在2-6个字符之间', trigger: 'blur'}
        ],
        nick_name: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 2, max: 6, message: '长度在2-6个字符之间', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在6-16个字符之间', trigger: 'blur'}
        ],
        real_pwd: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}
        ],
        phone: [
          {validator: validatePhone, trigger: 'blur'}
        ],
        email: [
          {validator: validateEmail, trigger: 'blur'}
        ]

      },
      editFormRules: {
        phone: [
          {validator: validatePhone, trigger: 'blur'}
        ],
        email: [
          {validator: validateEmail, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.getUserList()
    this.getRole()
  },
  methods: {
    async getUserList() {
      const {data: res} = await this.$axios.get('/user/user_list', {params: this.queryInfo})
      if (res.status !== 200) return this.$message.error(res.msg)
      console.log(res.data)
      this.total = res.data.totalPage
      this.userList = res.data.users
    },
    handleSizeChange(val) {
      this.queryInfo.nsize = val // 更新当前页大小
      // 切换页大小时，先计算新的最大合法页码
      const maxPage = Math.ceil(this.total / val) || 1
      // 若当前页码超出新的最大页码，重置为最后一页
      if (this.queryInfo.pnum > maxPage) {
        this.queryInfo.pnum = maxPage
      }
      // 发起请求（此时页码已确保合法）
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.queryInfo.pnum = val
      this.getUserList()
    },
    searchUser() {
      this.queryInfo.pnum = 1
      this.getUserList()
    },
    // 重置增加用户表单
    addFormClose() {
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false
    },
    // 新增用户
    addUser() {
      // 发送请求前验证数据是否规范
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 发送请求
        const {data: res} = await this.$axios.post('/user/user', this.$qs.stringify(this.addForm))
        // 验证结果
        if (res.status !== 200) return this.$msg.error(res.msg)
        this.$msg.success(res.msg)
        // 隐藏窗口
        this.addDialogVisible = false
        // 重置表单
        this.$refs.addFormRef.resetFields()
        // 重新获取用户列表
        this.getUserList()
      })
    },
    // 显示编辑用户窗口
    async showEdit(row) {
      // 发送请求,获取数据库实时数据
      const {data: res} = await this.$axios.get('/user/user', {params: {id: row.id}})
      if (res.status !== 200) return this.$msg.error(res.msg)
      this.editForm = res.data
      // 显示窗口
      this.editDialogVisible = true
    },
    // 修改用户内容
    editUser() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const {data: res} = await this.$axios.put('/user/user', this.$qs.stringify(this.editForm))
        if (res.status !== 200) return this.$msg.error((res.msg))
        this.$msg.success(res.msg)
        this.editDialogVisible = false
        // 重新获取用户列表
        this.getUserList()
      })
    },
    // 显示删除窗口
    showDel(row) {
      this.delId = row.id
      this.delName = row.name
      this.delNickName = row.nick_name
      this.delDialogVisible = true
    },
    // 删除用户
    async delUser() {
      const {data: res} = await this.$axios.delete('/user/user', {
        params: {id: this.delId} // params 专门用于传递 URL 查询参数
      })
      if (res.status !== 200) return this.$msg.error(res.msg)
      this.$msg.success(res.msg)
      this.delDialogVisible = false
      this.getUserList() // 删除后刷新列表
    },
    // 显示重置用户密码窗口
    showReset(row) {
      this.resetId = row.id
      this.resetName = row.name
      this.resetNickName = row.nick_name
      this.resetDialogVisible = true
    },
    async resetUser() {
      const {data: res} = await this.$axios.get('/user/reset', {params: {id: this.resetId}})
      if (res.status !== 200) return this.$msg.error(res.msg)
      this.$msg.success(res.msg)
      this.resetDialogVisible = false
      console.log(res)
    },
    // 获取所有角色
    async getRole() {
      const {data: res} = await this.$axios.get('/role')
      if (res.status !== 200) return this.$msg.error(res.msg)
      this.roles = res.data
      return this.$msg.success(res.msg)
    }
  }
}
</script>

<style scoped lang="less">
.el-table {
  margin-top: 10px
}
</style>
