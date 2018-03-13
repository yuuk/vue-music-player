<style lang="less">
    @keyframes circling {
        0% {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(1turn)
        }
    }
    .player-main {
        min-height: 100%;
        &-bg {
            background-position: 50%;background-repeat: no-repeat;
            background-size: auto 100%;transform: scale(1.5);
            transform-origin: center top;transition: opacity .3s linear;
            position: fixed;left: 0;right: 0;top: 0;height: 100%;overflow: hidden;z-index: -1;
            &:after {content: " ";bottom: 0;top: 0;left: 0;right: 0;background-color: rgba(0,0,0,.5);position: absolute; }
        }
        &-header {
            position: relative;z-index: 4;text-align: center;line-height: 1;padding: 20/100rem 0;border-bottom: 1px solid rgba(255,255,255,.15);
            .icon-arrow {color: #fff;font-size: 44/100rem;position: absolute;left: 20/100rem;top: 50%;margin-top: -20/100rem;}
		    .title {
                text-shadow: 1px 0 0 rgba(0,0,0,.15);font-size: 34/100rem;color: #fff;
                .singer {font-size: 24/100rem;display: block;line-height: 1;padding-top: 10/100rem;}
            }
            .share-icon {color: #fff;font-size: 44/100rem;position: absolute;right: 20/100rem;top: 50%;margin-top: -20/100rem;}
        }
        &-disc {
            position: relative;
            .disc-tonearm {
                transform-origin: 10% 10%;transition: all 0.5s ease-in-out;
                width: 330/1.5/100rem;height: 470/1.5/100rem;position: absolute;left: 340/100rem;top: 0;z-index: 3;
                background: url(../../assets/img/needle-plus.png) no-repeat center center;background-size: contain;
            }
            .disc-panel {
                animation: circling 20s infinite linear;
                position: relative;width: 1250/2/100rem;height: 1250/2/100rem;margin: auto;top: 155/100rem;
                img {
                    position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin: auto;width: 65%;height: 65%;border-radius: 100%;
                }
                &:before {
                    content: '';position: absolute;z-index: 2;width: 100%;height: 100%;
                    background: url(../../assets/img/disc_light-plus.png) no-repeat center center;background-size: contain;
                }
                &:after {
                    content: '';position: absolute;width: 100%;height: 100%;left: 0;top: 0;right: 0;bottom: 0;margin: auto;
                    z-index: 1;background: url(../../assets/img/disc-plus.png) no-repeat center center;background-size: contain;
                }
            }
            &.pause {
                // .disc-tonearm {transform: rotate(-25deg);}
                .disc-panel{animation-play-state: paused;}
            }
        }
    }
</style>

<template>
    <div class="player-main" v-if="mp3Info.url && detail.name">
        <p class="player-main-bg" :style="{backgroundImage: `url(${getBlurPic})`}"></p>
        <header class="player-main-header">
            <i class="back-arrow iconfont icon-arrow" @click="goBack"></i>
            <p class="title">{{detail.al.name}} <span class="singer">{{singers}}</span></p>
            <i class="share-icon iconfont icon-fenxiang"></i>
        </header>
        <div class="player-main-disc" :class="{'pause': !isPlaying}">
            <div class="disc-tonearm"></div>
            <div class="disc-panel" @click="togglePlay"><img :src="detail.al.picUrl" alt=""></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Player',
	data () {
		return {
            mp3Info: {},
            detail: {},
            audio: null,
            isPlaying: true
		}
    },
    mounted () {
        this.getSongDetail();
        this.getMusicInfo();
    },
    computed: {
        getBlurPic () {
            return `//music.163.com/api/img/blur/${this.detail.al.pic_str}`;
        },
        singers () {
            const artList = this.detail.ar.map(item => {
                return item.name
            }).join('/');
            return `${artList}`;
        }
    },
    watch: {
        'mp3Info.url' () {
            this.initAudio();
        }
    },
    methods: {
        // 获取歌曲详情
        getSongDetail () {
            this.$http({
				method:'get',
                url: '/api/song/detail',
                params: {
                    ids: this.$route.params.id
                }
			})
			.then(response => {
                const json = response.data;
                if (json.code == 200) {
                    this.detail = json.songs[0];
                } else {
                    alert(json.msg);
                }
			});
        },
        // 获取音乐信息
        getMusicInfo () {
            this.$http({
				method:'get',
                url: '/api/music/url',
                params: {
                    id: this.$route.params.id
                }
			})
			.then(response => {
                const json = response.data;
                if (json.code == 200) {
                    this.mp3Info = json.data[0];
                } else {
                    alert(json.msg);
                }
			});
        },
        // 返回上页
        goBack () {
            window.history.back();
        },
        // 初始化播放器
        initAudio () { 
            if (this.audio == null) {
                const AUDIO = new Audio();
                AUDIO.src = this.mp3Info.url;
                this.audio = AUDIO;
                AUDIO.play();
                console.warn(AUDIO);
            }
        },
        togglePlay () {
            this.isPlaying ? this.audio.pause() : this.audio.play();
            this.isPlaying = !this.isPlaying;
        }
    }
}
</script>
