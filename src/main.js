import Vue from 'vue';
import axios from 'axios';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import App from './App';
import router from './router';
import store from './store';

require('./assets/js/flexible');
require('./assets/css/reset.less');
require('swiper/dist/css/swiper.css');

Vue.use(VueAwesomeSwiper);

Vue.prototype.$http = axios;
Vue.config.productionTip = true;

// 全局过滤器
Vue.filter('formatNum', num => {
  if (num > 10000) {
    return `${(num / 10000).toFixed(0)}万`;
  }
  return num;
});

// 歌手格式化
Vue.filter('artist', song => {
  const artists = song.artists || song.ar || [];
  return artists.map(item => item.name).join(' / ');
});

Vue.filter('album', song => {
  const album = song.album || song.al || {};
  return album.name;
});

Vue.filter('formatTime', time => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}年${month}月${day}日${hours}点${minutes}分`;
});

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
