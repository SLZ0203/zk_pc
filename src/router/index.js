import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/Home'
import Banner from '../pages/Banner/Banner'
import One from '../pages/Banner/One'
import Two from '../pages/Banner/Two'
import Three from '../pages/Banner/Three'
import Four from '../pages/Banner/Four'
import Five from '../pages/Banner/Five'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{
        keepAlive: false
      }
    },
    {
      path: '/banner',
      name: 'Banner',
      component: Banner,
      meta:{
        keepAlive: true
      },
      children: [
        {path: '/one', component: One},
        {path: '/two', component: Two},
        {path: '/three', component: Three},
        {path: '/four', component: Four},
        {path: '/five', component: Five},
      ]
    }
  ]
})
