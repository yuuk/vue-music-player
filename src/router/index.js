import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component(resolve) {
        return require(['@/components/page/Index.vue'], resolve);
      }
    },
    {
      path: '/list',
      name: 'List',
      component(resolve) {
        return require(['@/components/page/List.vue'], resolve);
      }
    },
    {
      path: '/playlist/:id',
      name: 'Playlist',
      component(resolve) {
        return require(['@/components/page/Playlist.vue'], resolve);
      }
    },
    {
      path: '/mv/:id',
      name: 'Mv',
      component(resolve) {
        return require(['@/components/page/Mv.vue'], resolve);
      }
    },
    {
      path: '/comment/:type/:id',
      name: 'Comment',
      component(resolve) {
        return require(['@/components/page/Comment.vue'], resolve);
      }
    },
    {
      path: '/player/',
      name: 'Player',
      component(resolve) {
        return require(['@/components/page/Player.vue'], resolve);
      }
    }
  ]
});
