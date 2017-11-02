<style lang="less">
	.page-header {
		.top {
			height: 85/100rem;background-color: #34393b;position: relative;
			display: flex; justify-content: center;align-items: center;
		}
		.user-btn {
			display: block;position: absolute;width: 48/100rem;height: 48/100rem;
			top: 50%;left: 30/100rem;margin-top: -24/100rem;
			i {
				display: block;width: 100%;height: 100%;
				background: url('../../assets/img/icon-user.png') no-repeat 0 0;
				background-size: 100%; 
			}
		}
		.music-btn {
			display: block;position: absolute;width: 48/100rem;height: 48/100rem;
			top: 50%;right: 30/100rem;margin-top: -24/100rem;
			i {
				display: block;width: 100%;height: 100%;
				background: url('../../assets/img/icon-music.png') no-repeat 0 0;
				background-size: 100%; 
			}
		}
		.search {
			background-color: #fff;width: 535/100rem;height: 60/100rem;border-radius: 100px;position: relative;
			&:after {
				content: '';position: absolute;z-index: 2;left: 48/100rem;top: 18/100rem;
				width: 25/100rem;height: 25/100rem;display: block;
				background: url('../../assets/img/icon-search.png') no-repeat 0 0;
				background-size: 100%; 
			}
			input {
				position: absolute;top: 0;left: 0;border: 0;height: 100%;border-radius: 100px;
				padding: 0 90/100rem;width: 100%;box-sizing: border-box;font-size: 24/100rem;
			}
		}
		.nav {
			height: 80/100rem;background-color: #f8f8f9;
			ul {
				display: flex;flex-flow: nowrap;flex-direction: row; justify-content: center;align-items: center;
				width: 100%;height: 100%;
				}
			li {height: 100%;line-height: 80/100rem;font-size: 28/100rem;padding: 0 40/100rem;}
			a {
				color: #444;display: block;position: relative;padding: 0 10/100rem;
				&:after {
					content: '';position: absolute;bottom: 0;left: 0;width: 100%;height: 3px;
					display: none;background-color: #444;
				}
				&.router-link-exact-active {
					&:after {display: block;}
				}
			}
		}
	}
</style>
<template>
	<header class="page-header">
		<div class="top">
			<a href="#" class="user-btn"><i></i></a>
			<p class="search"><input type="text" placeholder="搜索音乐"></p>
			<a href="#" class="music-btn"><i></i></a>
		</div>
		<nav class="nav">
			<ul class="clearfix">
				<li v-for="(item, key, index) of nav" :key="index"><router-link :to="item.path">{{item.name}}</router-link></li>
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