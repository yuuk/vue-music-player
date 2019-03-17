<style lang="less">
	@import url('../../assets/css/util.less');
	.section-header {
		font-size: 36/100rem;border-left: 3px solid #313638;padding-left: 15/100rem;
	}
	.hot-list {
		margin-top: 35/100rem;
		ul {margin-top: 30/100rem;}
		li {
			float: left;font-size: 24/100rem;width: 246/100rem;margin-bottom: 30/100rem;
			&:nth-child(3n-1) {margin-left: 6/100rem;margin-right: 6/100rem;}
			a {color: #313638;}
			.cover {
				position: relative;
				img {width: 100%;height: 100%;}
				&:before {
					content: '';position: absolute;right: 10/100rem;bottom: 10/100rem;width: 40/100rem;height: 40/100rem;
					background: url('../../assets/img/icon-list-play.png') no-repeat 0 0;background-size: 100% auto;
				}
			}
			.title {
				.text-overflow-mutil;
				margin-top: 15/100rem;padding-left: 15/100rem;padding-right: 15/100rem;height: 70/100rem;
				
			}
		}
	}
	.new-song {
		margin-top: 10/100rem;
		.songlist {margin-top: 15/100rem;}
	}
	.recommend-mv {
		margin-top: 35/100rem;overflow: hidden;
		li {
			width: 50%;float: left;padding-top: 35/100rem;
			&:nth-child(odd) {
				padding-right: 5/100rem;;
			}
			&:nth-child(even) {
				padding-left: 5/100rem;;
			}
		}
		.img {
			width: 100%;height: auto;position: relative;overflow: hidden;
			.iconfont {
				text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
				position: absolute;left: 15/100rem;top: 15/100rem;color: #fff;z-index: 2;font-size: 40/100rem;
			}
			img {width: 100%;height: auto;}
		}
		.title {
			line-height: 1.5;color: #313638;
			font-size: 28/100rem;margin-top: 15/100rem;padding: 0 10/100rem;height: 78/100rem;
			.text-overflow-mutil;
		}
	}
</style>


<template>
	<section class="page-index">
		<myHeader />
		<Slider :sliderItem="banners" />
		<div class="hot-list" v-if="songList.length">
			<h6 class="section-header">推荐歌单</h6>
			<ul class="clearfix">
				<li v-for="(item, index) in songList" :key="index" :data-id="item.id">
					<router-link :to="`/playlist/${item.id}`">
						<p class="cover">
							<img :src="item.picUrl" :alt="item.name">
						</p>
						<p class="title">{{item.name}}</p>
					</router-link>
				</li>
			</ul>
		</div>

		<div class="new-song" v-if="newSong.length">
			<h6 class="section-header">最新音乐</h6>
			<Song :songList="newSong" />
		</div>
		
		<div class="recommend-mv" v-if="mvList.length">
			<h6 class="section-header">热门MV</h6>
			<ul class="clearfix">
				<li v-for="(item, index) in mvList" :key="index">
					<router-link :to="`/mv/${item.id}`">
					<p class="img"><img :src="item.cover" alt=""><i class="iconfont icon-socialyoutubeoutline"></i></p>
					<p class="title">{{item.name}}</p>
					</router-link>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import myHeader from '@/components/common/Header.vue'
import Slider from '@/components/common/Slider.vue'
import Song from '@/components/common/Song.vue'
export default {
	name: 'index',
	components: {
		myHeader,
		Slider,
		Song
	},
	data () {
		return {
			banners: [], // 轮播图数据
			songList: [],  // 热门歌单
			mvList: [], // 推荐mv
			newSong: [] // 新歌
		}
	},
	mounted () {
		this.getBanner();
		this.getSongList();
		this.getNewSong();
		this.getMvList();
	},
	methods: {
		// 获取banner数据
		getBanner () {
			this.$http({
				method:'get',
				url:'/api/banner'
			})
			.then(response => {
				const json = response.data;
				if (json.code == 200) {
					this.banners = json.banners;
				}
			});
		},
		// 获取推荐歌单
		getSongList () {
			this.$http({
				method:'get',
				url:'/api/personalized'
			})
			.then(response => {
				const json = response.data;
				if (json.code == 200) {
					this.songList = json.result.slice(0, 6);
				}
			});
		},
		// 获取新歌
		getNewSong () {
			this.$http({
				method:'get',
				url:'/api/personalized/newsong'
			})
			.then(response => {
				const json = response.data;
				if (json.code == 200) {
					this.newSong = json.result.map(item => item.song);
				}
			});
		},
		// 获取热门mv
		getMvList () {
			this.$http({
				method:'get',
				url:'/api/top/mv',
				params: {
					limit: 6
				}
			})
			.then(response => {
				const json = response.data;
				if (json.code == 200) {
					this.mvList = json.data;
				}
			});
		}
	}
}
</script>
