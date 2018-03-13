<template>
	<div id="app">
		<keep-alive>
			<router-view/>
		</keep-alive>
	</div>
</template>

<script>
export default {
	name: 'app',
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	}
}
</script>