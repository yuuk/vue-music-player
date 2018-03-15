<style lang="less">
	.songlist {
		font-size: 34/100rem;
		.item {
            padding: 20/100rem 20/100rem 20/100rem 0;line-height: 1;width: 100%;position: relative;
            display: flex;align-items: center;border-top: 1px solid #eee;
			&:first-child {border-top: none;}
			.sort-num {color: #969799;width: 80/100rem;padding: 0 10/100rem;text-align: center;}
            .info {margin-right: 15/100rem;max-width: 75%}
            .playbtn {font-size: 46/100rem;color: #aaa;position: absolute;right: 20/100rem;}
            .desc {color: #969799;font-size: 24/100rem;margin-top: 15/100rem;}
        }
	}
</style>

<template>
	 <div class="songlist">
		<div class="item" v-for="(song, index) in songList" :key="index" @click="playSong(song)">
			<p class="sort-num">{{index+1}}</p>
			<div class="info">
				<p class="name text-overflow">{{song.name}}</p>
				<p class="desc text-overflow">{{song.artists | singers}} - {{song.album.name}}</p>
			</div>
			<i class="playbtn iconfont icon-bofang"></i>
		</div>
	</div>
</template>

<script>
import store from '../../store'
export default {
	name: 'Song',
	props: {
		songList: {
			required: true,
			type: Array
		}
	},
	data () {
		return {
		}
	},
	methods: {
		// 播放歌曲
		playSong (song) {
			store.commit('addMusicList', {
				data: [song]
			});
			this.$router.push({ name: 'Player'});
        }
	}
}
</script>
