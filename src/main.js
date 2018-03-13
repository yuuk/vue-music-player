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

// 全局过滤器
Vue.filter('formatNum', (num) => {
    if (num > 10000) {
        return `${(num/10000).toFixed(0)}万`
    }
    return num;
});

Vue.filter('formatTime', (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}年${month}月${day}日${hours}点${minutes}分`;     
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})