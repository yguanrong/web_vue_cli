import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import echartTest from '@/views/echartTest'
import test from '@/views/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/chart',
      name: 'echart',
      component: echartTest
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
