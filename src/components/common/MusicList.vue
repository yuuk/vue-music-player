<style lang="less">
	.music-list {
		position: fixed;width: 100%;left: 0;bottom: 0;z-index: 10;overflow: hidden;
		&:after {
			content: '';background:#fff;opacity: .95;
			position: absolute;z-index: -1;left: 0;top: 0;right: 0;bottom: 0;margin: auto;
		}
		&-header {
			height: 100/100rem;line-height: 100/100rem;padding: 0 20/100rem;font-size: 30/100rem;border-bottom: .5px solid #cfc5c0;
			.iconfont {color: #999;}
			.icon-delete {font-size: 50/100rem;}
			.play-mode {
				color: #2c2b2c;
				i {margin-right: 10/100rem;vertical-align: -2px;font-size: 36/100rem;}
			}
		}
		&-body {
			font-size: 32/100rem;color: #2c2b2c;width: 100%;max-height: 300px;overflow-y: auto;
			ul {padding-left: 25/100rem;width: 100%;}
			li {
				width: 100%;line-height: 88/100rem;height: 88/100rem;border-bottom: .5px solid #cfc5c0;
				display: flex;align-items: center;justify-content: space-between;
				&.active {
					p {color: #d33a31;}
				}
				p {width: 85%;}
				span {font-size: 24/100rem;}
				.icon-shengyin {margin-right: 10/100rem;}
				.icon-close {color: #999;padding-right: 25/100rem;}
				&:last-child {border-bottom: none;}
			}
			.empty {text-align: center;padding: 50/100rem 0;color: #999;}
		}
		&-footer {
			border-top: .5px solid #cfc5c0;text-align: center;font-size: 34/100rem;height: 100/100rem;line-height: 100/100rem;
			a {color: #2c2b2c;display: block;}
		}
	}
</style>

<template>
	<section class="music-list">
		<header class="music-list-header clearfix">
			<i class="iconfont icon-delete fr" @click="clearSong"></i>
			<p class="play-mode fl" @click="switchPlayMode"><i class="iconfont" :class="[playModeInfo.cls]"></i>{{playModeInfo.text}} <em v-if="playModeInfo.mode!=1">({{musicList.length}}首)</em></p>
		</header>
		<div class="music-list-body" ref="musicListRef">
			<ul v-if="musicList.length">
				<li v-for="(song, index) in musicList" :key="index" :class="{'active': playIndex == index}">
					<p class="text-overflow" @click="playSong(song, index)"><i class="iconfont icon-shengyin" v-if="playIndex == index"></i>{{song.name}} - <span>{{song.singers}}</span></p>
					<i class="iconfont icon-close" @click="delSong(song, index)"></i> 
				</li>
			</ul>
			<p class="empty" v-else>播放列表暂无歌曲！</p>
		</div>
		<footer class="music-list-footer"><a href="javascript:;" @click="closeList">关闭</a></footer>
	</section>
</template>

<script>
import store from '../../store'
export default {
	name: 'MusicList',
	data () {
		return {
		}
	},
	props: {
		playModeInfo: {
			type: Object,
			required: true
		},
		playIndex: {
			type: Number,
			default: 0
		},
		isShow: {
			type: Boolean
		}
	},
	mounted () {

	},
	computed: {
		musicList () {
            return this.$store.state.musicList;
        }
	},
	watch: {
		'isShow' (newVal) {
			// 打开列表自动定位到当前播放的歌曲
			if (newVal) {
				const musicListRef = this.$refs.musicListRef;
				const activeLi = musicListRef.querySelector('li.active');
				const diff = activeLi ? activeLi.clientHeight * 3 : 0;
				musicListRef.scrollTop = activeLi.offsetTop - diff;
			}
		}
	},
	methods: {
		delSong (song, index) {
			this.$emit('delSong', {song, index});
		},
		// 清空播放列表
		clearSong () {
			this.$emit('clearSong');
		},
		playSong (song, index) {
			this.$emit('playMusic', {song, index});
		},
		// 关闭列表
		closeList () {
			this.$emit('close', false);
		},
		switchPlayMode () {
			this.$emit('switchPlayMode');
		}
	}
}
</script>
