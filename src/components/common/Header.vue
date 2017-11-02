<style lang="css">
	.page-header {
		height: 30px;background-color: #eee;
	}
</style>
<template>
	<header class="page-header">
		<nav>
			<ul>
				<li v-for="item in nav"><router-link :to="item.path">{{item.name}}</router-link></li>
			</ul>
		</nav>
	</header>
</template>

<script>
	export default {
		data () {
			return {
				nav: [{
					'name': '首页',
					'path': '/'
				},{
					'name': '歌单',
					'path': '/list'
				},{
					'name': '排行',
					'path': '/rank'
				},{
					'name': '歌手',
					'path': '/singer'
				}]
			}
		}
	}
</script>