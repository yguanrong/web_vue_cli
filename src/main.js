// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import {interceptor} from './utils/ajax'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;

Vue.use(ElementUI);

Axios.defaults.timeout = 18000; // 延迟时间改为5分钟
interceptor(Axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    // 空的实例放到根组件下，所有的子组件都能调用
    eventBus: new Vue()
  }
});
