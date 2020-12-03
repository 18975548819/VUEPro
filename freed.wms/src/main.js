// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import store from './store/index';
import echarts from 'echarts';
import JsonExcel from 'vue-json-excel';
import dataV from '@jiaminghi/data-view'

Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.use(dataV)
Vue.config.productionTip = false;
Vue.component('downloadExcel', JsonExcel) //Excel导出

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (store.state.token) {
    config.headers.common['Authorization'] = "Bearer " + store.state.token
  }
  return config
}, function (error) {
  router.push('/')
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  if (error.response) {
    switch (error.response.status) {
      case 401:
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('loginName');
        store.commit('del_token');
        router.push('/');
    }
  }
  return Promise.reject(error)
})

