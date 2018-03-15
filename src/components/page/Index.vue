<style lang="less">
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
				.author {
					position: absolute;left: 0;bottom: 0;color: #fff;font-size: 12px;line-height: 1;
					padding: 5/100rem 10/100rem;display: none;
					background: #000;
					background: -moz-linear-gradient(left,  rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 100%);
					background: -webkit-linear-gradient(left,  rgba(0,0,0,1) 0%,rgba(0,0,0,0.55) 100%);
					background: linear-gradient(to right,  rgba(0,0,0,1) 0%,rgba(0,0,0,0.55) 100%);
					filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#8c000000',GradientType=1 );

					&:before {
						content: '';width: 40/100rem;height: 40/100rem;display: inline-block;vertical-align: -3px;
						background: url('../../assets/img/icon-user.png') no-repeat 0 0;background-size: 100% auto;
					}
				}
				&:before {
					content: '';position: absolute;right: 10/100rem;bottom: 10/100rem;width: 40/100rem;height: 40/100rem;
					background: url('../../assets/img/icon-list-play.png') no-repeat 0 0;background-size: 100% auto;
				}
			}
			.title {
				margin-top: 15/100rem;padding-left: 15/100rem;padding-right: 15/100rem;max-height: 65/100rem;
				overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;
			}
		}
	}
	.new-song {
		margin-top: 10/100rem;
		.songlist {margin-top: 15/100rem;}
	}
</style>


<template>
	<section class="page-index">
		<myHeader></myHeader>
		<Slider :sliderItem="banners"></Slider>
		<div class="hot-list" v-if="songList.length">
			<h6 class="section-header">推荐歌单</h6>
			<ul class="clearfix">
				<li v-for="(item, index) in songList" :key="index" :data-id="item.id">
					<router-link :to="`/playlist/${item.id}`">
						<p class="cover">
							<img :src="item.picUrl" :alt="item.name">
							<span v-if="item.playCount" class="author">{{item.playCount}}</span>
						</p>
						<p class="title">{{item.name}}</p>
					</router-link>
				</li>
			</ul>
		</div>

		<div class="new-song" v-if="newSong.length">
			<h6 class="section-header">最新音乐</h6>
			<Song :songList="newSong"></Song>
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
			newSong: [] // 新歌
		}
	},
	mounted () {
		this.getBanner();
		this.getSongList();
		this.getNewSong();
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
					this.newSong = this.formatNewsong(json.result);
				}
			});
		},
		formatNewsong (newSong) {
			return newSong.map(item => {
				return item.song
			});
		}
	}
}
</script>
