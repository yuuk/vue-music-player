import Vue from 'vue'
import App from './App'
import router from './router'

require('./assets/js/flexible')

require('./assets/css/reset.less')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})