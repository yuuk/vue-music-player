import Vue from 'vue'
import App from './App'
import router from './router'

require('./assets/js/flexible')
require('./assets/css/reset.less')

require('swiper/dist/css/swiper.css')
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import axios from 'axios'
Vue.prototype.$http = axios

import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

import qs from 'qs'
Vue.prototype.$qs = qs

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})