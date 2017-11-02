<template>
	<div id="app">
		<Header></Header>
		<router-view/>
	</div>
</template>

<script>
import Header from '@/components/common/Header.vue';
export default {
	name: 'app',
	components: {
		Header
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>