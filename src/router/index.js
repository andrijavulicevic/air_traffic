import Vue from 'vue'
import Router from 'vue-router'
import AirTraffic from '@/components/AirTraffic'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AirTraffic',
      component: AirTraffic
    }
  ]
})
