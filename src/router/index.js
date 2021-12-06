import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Admin from '../views/Admin.vue'

// 页面路由组件
import Index from '../components/admin/Index'
import AddArt from '../components/article/AddArticle'
import ArtList from '../components/article/ArtList'
import CateList from '../components/category/CateList'
import UserList from '../components/user/UserList'


Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: Admin,
    children:[
      {path:'index',component:Index},
      {path:'addart',component:AddArt},
      {path:'artlist',component:ArtList},
      {path:'catelist',component:CateList},
      {path:'userlist',component:UserList}
    ]
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to,form,next)=>{
  const token = window.sessionStorage.getItem('token')
  if(to.path==='/login') return next()
  if(!token &&to.path==='/admin'){
    next('/login')
  }else{
    next()
  }
})
export default router
