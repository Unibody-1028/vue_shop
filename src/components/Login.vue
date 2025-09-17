<template>
    <div class="login_container">
      <div class="login_box">
        <div class="logo">
          <img src="../assets/Python_logo.png" alt="Python标志">
        </div>
        <el-form class="login_form_style" label-width="0px">
            <el-form-item >
                <el-input prefix-icon="el-icon-user-solid" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item >
                <el-input prefix-icon="el-icon-lock" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login_btn" style="width: 45%;">登录</el-button>
                <el-button type="primary" class="reset_btn" style="width: 45%;">重置</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {

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
