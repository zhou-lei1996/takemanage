import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';



//引入重置样式
import './assets/css/reset.css'
//引入iconfont.css
import '@/assets/fonts/iconfont.css'

//创建全局bus
Vue.prototype.$bus = new Vue()


Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
