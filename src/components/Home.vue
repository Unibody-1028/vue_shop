<script >
export default {
  data () {
    return {
      menuList: []
    }
  },
  created () {
    this.getMenulist()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    test () {
      const { data: res } = this.$axios.get('/user/get_user_info')
      console.log(res)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    async getMenulist () {
      const { data: res } = await this.$axios.get('/menu')
      console.log(res)
      this.menuList = res.data
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
    <el-aside width="200px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-submenu index="1" v-for="item in menuList" :key="item.id">
          <!--    一级菜单      -->
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.name }}</span>
          </template>
          <!--    二级菜单      -->
          <el-menu-item index="1-4-1" v-for="subItem in item.children" :key="subItem.id">
            <i class="el-icon-location"></i>
            <span>{{subItem.name}}</span>
          </el-menu-item>

        </el-submenu>
      </el-menu>
    </el-aside>

    <el-main>
      Main
    </el-main>
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
