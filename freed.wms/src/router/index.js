import Vue from 'vue'
import Router from 'vue-router'
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
import Index from '../components/WMS/Index.vue'
import less from 'less'
import Login from '../components/WMS/LoginPage.vue'
import store from '../store/index'
import Error from '../components/WMS/error404.vue'
import Home from '../components/WMS/Home.vue'
import Kanban from '../components/WMS/Page/KanbanPage.vue'
import Test from '../components/WMS/Page/TestPage.vue'
import WarehouseInAndOut from '../components/WMS/Page/WarehouseInOutDetailsPage.vue'
import WmsStockPage from '../components/WMS/Page/WmsStockPage.vue'

Vue.use(less)
Vue.use(Router)
Vue.use(dataV)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

//保存最新的token
if (window.localStorage.getItem("token")){
    store.commit("set_token", window.localStorage.getItem("token"))
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index
    },
    // {
    //   path: '/Error',
    //   name: 'Error',
    //   component: Error
    // },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta:{
        requireAuth:true,
      },
      children:[
        { path: '/Kanban', component: Kanban, name: '看板' },
        { path: '/WarehouseInAndOut', component: WarehouseInAndOut, name: '出入库明细' },
        { path: '/WmsStockPage', component: WmsStockPage, name: '库存查询' },
      ]
    },
  ],
  mode:'hash' //去除#号
})
