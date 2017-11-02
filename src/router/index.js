import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/page/Index.vue'
import Singer from '@/components/page/Singer.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index
		},
		{
			path: '/singer',
			name: 'Singer',
			component: Singer
		}
	]
})
