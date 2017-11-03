<template>
	<div id="app">
		<myHeader></myHeader>
		<keep-alive>
		<router-view/>
		</keep-alive>
	</div>
</template>

<script>
import myHeader from '@/components/common/Header.vue';
export default {
	name: 'app',
	components: {
		myHeader
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>