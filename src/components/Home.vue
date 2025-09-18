<script >
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    test () {
      const { data: res } = this.$axios.get('/user/get_user_info')
      console.log(res)
    }
  }
}
</script>

<template>
  <el-container class="home-container">
  <el-header>
    <div>
      <img src="../assets/Python_logo.png">
      <span>电子商城后台管理系统</span>
    </div>
<!--    <el-button type="primary" plain @click="test">测试</el-button>-->
    <el-button type="primary" plain @click="logout">退出</el-button>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
  </el-container>
</template>

<style lang="less" scoped>
  .home-container{
    height: 100%;
  }
.el-header{
  display: flex;
  background-color: cornflowerblue;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 25px;
  img{
    height: 50px;
    width: 90px;
  }
  div{
    display: flex;
    align-items: center;
  }
}
.el-aside{
  background-color: darkgray;
}
.el-main{
  background-color: azure;
}
</style>
