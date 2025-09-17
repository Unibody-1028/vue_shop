<template>
    <div class="login_container">
      <div class="login_box"></div>
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
</style>
