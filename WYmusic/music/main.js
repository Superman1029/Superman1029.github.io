import Vue from 'vue'
import store from "./store/index.js"
import App from './App'


 
Vue.config.productionTip = false

// 全局过滤器
Vue.filter('countFilter', function (count = 0) {
  return (count / 100000000).toFixed(1) + "亿"
})
Vue.filter('singerFilter', function (array = {}) {
  array = array.map(item=>{
  	return item.name
  })
  return array.join("/")
})


App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
