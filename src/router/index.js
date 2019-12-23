import Vue from 'vue'
import Router from 'vue-router'
import echartTest from '@/views/echartTest'
import videoView from '@/views/videoView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'videoView',
      component: videoView
    },
    {
      path: '/chart',
      name: 'echart',
      component: echartTest
    }
  ]
})
