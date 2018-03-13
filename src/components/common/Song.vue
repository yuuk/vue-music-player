<style lang="less">
	.songlist {
		font-size: 34/100rem;
		.item {
            padding: 20/100rem 20/100rem 20/100rem 0;
            line-height: 1;width: 100%;position: relative;display: flex;border-top: 1px solid #eee;
            align-items: center;-webkit-box-pack: center;-webkit-justify-content: center;justify-content: center;
			&:first-child {border-top: none;}
			.sort-num {color: #969799;width: 80/100rem;padding: 0 10/100rem;text-align: center;}
            .info {-webkit-box-flex: 1;-webkit-flex: 1 1 auto;margin-right: 15/100rem;}
            .playbtn {font-size: 46/100rem;color: #aaa;}
            .desc {color: #969799;font-size: 24/100rem;margin-top: 15/100rem;}
        }
	}
</style>

<template>
	 <div class="songlist">
		<div class="item" v-for="(song, index) in songList" :key="index" @click="playSong(song)">
			<p class="sort-num">{{index+1}}</p>
			<div class="info text-overflow">
				<p class="name">{{song.name}}</p>
				<p class="desc">{{getSongDesc(song)}}</p>
			</div>
			<i class="playbtn iconfont icon-bofang"></i>
		</div>
	</div>
</template>

<script>
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
			swiperOption: {
				pagination: '.swiper-pagination',
				loop: true,
				autoplay : 3000,
				paginationClickable: true
			}
		}
	},
	methods: {
		 /**
         * 获取歌曲演唱者 + 专辑名
         * param (song) {Object} 歌曲信息
         */
        getSongDesc (song) {
			const artLists = song.artists ? song.artists : song.song.artists;
            const albumName = song.album ? song.album.name: song.song.name;
            const artList = artLists.map(item => {
                return item.name
            }).join('/');
            return `${artList} - ${albumName}`;
		},
		// 播放歌曲
		playSong (song) {
			this.$router.push({ name: 'Song', params: { id: song.id }})
        }
	}
}
</script>
