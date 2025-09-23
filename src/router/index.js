import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/User.vue'
import Menu from '../components/power/Menu.vue'
import Role from '../components/power/Role.vue'
import Cate from '../components/goods/Cate.vue'
import Attr from '../components/goods/Attribute.vue'
Vue.use(VueRouter)

const routes = [
  // 登录页路由
  {
    path: '/login',
    component: Login
  },
  // 首页路由
  {
    path: '/home', // 父路由路径:URL匹配/home时触发
    component: Home, // 父路由组件:渲染Home组件(顶部导航、侧边栏、首页公共框架)
    redirect: '/welcome', // 访问home时,重定向到子路由
    children: [
      // 欢迎页子路由
      {
        path: '/welcome', // 子路由路径:URL匹配/welcome时触发
        component: Welcome // 渲染Welcome组件
      },
      // 用户管理子路由
      {
        path: '/user_list', // 子路由路径:URL匹配/user_list时触发
        component: User // 子路由组件:渲染User组件
      },
      {
        path: '/menu_list', // 子路由路径:URL匹配/menu_list时触发
        component: Menu // 子路由组件:渲染Menu组件
      },
      {
        path: '/role_list', // 子路由路径:URL匹配/role_list时触发
        component: Role // 子路由组件:渲染Role组件
      },
      {
        path: '/cate_list', // 子路由路径:URL匹配/role_list时触发
        component: Cate // 子路由组件:渲染Role组件
      },
      {
        path: '/attr_list',
        component: Attr
      }
    ]

  }

]

const router = new VueRouter({
  routes
})

export default router

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  // 无token情况下不允许访问login以外的地址
  if (!tokenStr) return next('/login')
  next()
})
