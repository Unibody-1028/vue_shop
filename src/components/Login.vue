<template>
    <div class="login_container">
      <div class="login_box">
        <div class="logo">
          <img src="../assets/Python_logo.png" alt="">
        </div>
      </div>
    </div>
</template>

<script >
export default {
}
</script>

<style scoped lang="less">
  .login_container{
    background-color: #b9e7e3;
    height: 100%;
  }
  .login_box{
    width: 450px;
    height: 300px;
    border-radius: 30px;
    background-color:#fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .logo{
    height: 120px;
    width: 200px;
    border: 1px solid #ffffff;
    padding: 10px;
    border-radius: 30px;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 20px #fff;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
