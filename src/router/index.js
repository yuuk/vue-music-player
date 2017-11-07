import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Index',
			component (resolve) {
				return require(['@/components/page/Index.vue'], resolve);
			}
		},
		{
			path: '/singer',
			name: 'Singer',
			component (resolve) {
				return require(['@/components/page/Singer.vue'], resolve);
			}
		}
	]
})
