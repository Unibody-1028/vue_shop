<template>
    <div class="login_container">
      <div class="login_box">
        <div class="logo">
          <img src="../assets/Python_logo.png" alt="Python标志">
        </div>
        <el-form ref="userRef" :rules="userRules" :model="userForm" class="login_form_style" label-width="0px">
            <el-form-item prop="name">
                <el-input v-model="userForm.name" prefix-icon="el-icon-user-solid" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
                <el-input show-password v-model="userForm.pwd" prefix-icon="el-icon-lock" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login" class="login_btn" style="width: 45%;">登录</el-button>
                <el-button @click="restForm" type="primary" class="reset_btn" style="width: 45%;">重置</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        name: 'jack',
        pwd: '123456'
      },
      userRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    restForm () {
      // console.log(this)
      this.$refs.userRef.resetFields()
    },
    login () {
      this.$refs.userRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        // 登录操作
        const { data: res } = await this.$axios.post('/user/login', this.$qs.stringify(this.userForm))
        if (res.status === 200) {
          // 1.登录成功后,获取token并保存到sessionStorage
          window.sessionStorage.setItem('token', res.data.token)
          // 登录成功提示
          this.$msg.success(res.msg)
          // 页面跳转
          await this.$router.push('/home')
        } else {
          this.$msg.error(res.msg)
        }
      }
      )
    }
  }
}
</script>

<style scoped lang="less">
  .login_container{
    background-color: #b9e7e3;
    height: 100vh; /* 使用视口高度确保占满屏幕 */
    overflow: hidden; /* 防止滚动条 */
  }
  .login_box{
    width: 450px;
    height: 300px;
    border-radius: 30px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1); /* 更柔和的阴影 */
    padding-top: 70px; /* 给logo腾出位置 */
  }
  .logo{
    height: 120px;
    width: 200px;
    padding: 10px;
    border-radius: 30px;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
    background-color: #fff; /* 添加背景色让logo更突出 */
    img{
      width: 100%;
      height: 100%;
      object-fit: contain; /* 保持图片比例 */
    }
  }
  .login_form_style{
    width: 80%;
    margin: 50px auto;
    .el-form-item {
      margin-bottom: 20px; /* 增加表单项间距 */
    }
    .login_btn, .reset_btn {
      margin-right: 10px;
    }
  }
</style>
