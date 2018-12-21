import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/Home'
import Banner from '../pages/Banner/Banner'
import One from '../pages/Banner/One/One'
import Two from '../pages/Banner/Two/Two'
import Three from '../pages/Banner/Three/Three'
import Four from '../pages/Banner/Four/Four'
import Five from '../pages/Banner/Five/Five'

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
    },
    {
      path: '/banner',
      name: 'Banner',
      component: Banner,
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: '/one',
          name: 'One',
          component: One,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/two',
          name: 'Two',
          component: Two,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/three',
          name: 'Three',
          component: Three,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/four',
          name: 'Four',
          component: Four,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/five',
          name: 'Five',
          component: Five,
          meta: {
            keepAlive: false
          }
        },
      ]
    }
  ]
})
