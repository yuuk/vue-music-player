<style lang="less">
	.section-header {
		font-size: 32/100rem;border-left: 3px solid #313638;padding-left: 15/100rem;
	}
	.hot-list {
		margin-top: 30/100rem;
		ul {margin-top: 25/100rem;}
		li {
			float: left;font-size: 24/100rem;width: 246/100rem;margin-bottom: 40/100rem;
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
				margin-top: 15/100rem;padding-left: 15/100rem;padding-right: 15/100rem;height: 65/100rem;
				overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;
			}
		}
	}
	.new-song {
		li {margin-top: 25/100rem;box-sizing: border-box;padding: 0 25/100rem;}
		.cover {
			float: left;width: 150/100rem;height: 150/100rem;
			img {width: 100%;height: 100%;}
		}
		.info {float: left;width: (750-150-100)/100rem;margin-left: 25/100rem;}
		.title {font-size: 26/100rem;}
	}
</style>


<template>
	<section class="page-index">
		<Slider :sliderItem="slider"></Slider>
		
		<div class="hot-list" v-if="songList.length">
			<h6 class="section-header">热门歌单</h6>
			<ul class="clearfix">
				<li v-for="(item, index) in songList" :key="index" :data-id="item.id">
					<a href="#">
						<p class="cover">
							<img :src="item.picUrl" :alt="item.songListDesc">
							<span v-if="item.songListAuthor" class="author">{{item.songListAuthor}}</span>
						</p>
						<p class="title">{{item.songListDesc}}</p>
					</a>
				</li>
			</ul>
		</div>

		<div class="new-song" v-if="newSong.length">
			<h6 class="section-header">新歌首发</h6>
			<ul>
				<li class="clearfix" v-for="(item, index) in newSong" :key="index" :data-id="item.id">
					<p class="cover"><img :src="getCover(item.album.mid)"></p>
					<div class="info">
						<p class="title">{{item.title}}{{item.subtitle}}</p>
						<p class="author" v-if="item.songListAuthor">{{item.songListAuthor}}</p>
					</div>					
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import Slider from '@/components/common/Slider.vue';
export default {
	name: 'index',
	components: {
		Slider
	},
	data () {
		return {
			slider: [], // 轮播图数据
			songList: [],  // 热门歌单
			newSong: []
		}
	},
	mounted () {
		this.getIndexData();
		this.getNewSong();
	},
	methods: {
		// 获取首页数据
		getIndexData () {
			this.$http.get('/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
				params: {
					g_tk: '5381',
					uin: '0',
					format: 'json',
					inCharset: 'utf-8',
					outCharset: 'utf-8',
					notice: '0',
					platform: 'h5',
					needNewCode: '1',
					t: Date.now()
				}
			}).then(result => {
				let json = result.data.data;
				this.slider = json.slider;
				this.songList = json.songList
			}, response => {
			    console.error(response)
			});
		},
		// 获取新歌
		getNewSong () {
			let param = {
				g_tk: "5381",
				loginUin: "0",
				hostUin: "0",
				format: "jsonp",
				inCharset: "utf8",
				outCharset: "utf-8",
				notice: "0",
				platform: "yqq",
				needNewCode: "0",
				data: '{"comm":{"ct":24},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":1}}}'
			};

			this.$jsonp('/pcApi/cgi-bin/musicu.fcg', param)
			.then(json => {
				if (json.code == 0) {
					this.newSong = json.new_song.data.song_list.slice(0, 9)
				} else {
					console.error('接口错误')
				}
			}).catch(err => {
				console.error(err)
			})
		},
		getCover (mid) {
			return `//y.gtimg.cn/music/photo_new/T002R150x150M000${mid}.jpg?max_age=2592000`
		}
	}
}
</script>
