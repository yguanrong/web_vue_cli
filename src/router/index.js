import Vue from 'vue'
import Router from 'vue-router'
import echartTest from '@/views/echartTest'
import videoView_m from '@/views/mobile/videoView_m'
import videoView_p from '@/views/pc/videoView_p'

Vue.use(Router);

const routes= [
  {
    path: '/',
    name: 'home',
    component: videoView_p
  },
  {
    path: '/pc',
    name: 'video-pc',
    component: videoView_p
  },
  {
    path: '/mobile',
    name: 'video-mobile',
    component: videoView_m
  },
  {
    path: '/chart',
    name: 'echart',
    component: echartTest
  }
]
const router = new Router({
  routes
});
//
// router.beforeEach((to,from,next) => {
//   if (to.path === '/') {
//     if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
//       console.log('is pc');
//       next('/pc')
//     }else{
//       console.log('is phone');
//       next('/mobile')
//     }
//   }
// });

export default router;



