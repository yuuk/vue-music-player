<style lang="less">
    @keyframes circling {
        0%{
			transform: rotate(0)
		}
		50%{
			transform: rotate(180deg)
		}
		100%{
			transform: rotate(360deg)
		}
    }
    .slide-up-enter-active, .slide-up-leave-active {
        transition: all .2s ease;
    }
    .slide-up-enter, .slide-up-leave-to{
        transform: translateY(200px);opacity: 0;
    }
    .player-main {
        min-height: 100%;overflow: hidden;
        &-bg {
            background-color: #eee;transition: opacity .3s linear;
            position: fixed;left: 0;right: 0;top: 0;height: 100%;overflow: hidden;z-index: -1;
            img {transform: scale(2);transform-origin: center top;filter: blur(10px);}
            &:after {content: " ";bottom: 0;top: 0;left: 0;right: 0;background-color: rgba(0,0,0,.5);position: absolute; }
        }
        &-header {
            position: relative;z-index: 4;text-align: center;line-height: 1;padding: 20/100rem 0;border-bottom: .5px solid rgba(255,255,255,.15);
            .icon-arrow {color: #fff;font-size: 44/100rem;position: absolute;left: 20/100rem;top: 50%;margin-top: -20/100rem;}
		    .title {
                text-shadow: 1px 0 0 rgba(0,0,0,.15);font-size: 34/100rem;color: #fff;max-width: 75%;margin: auto;
                .singer {font-size: 24/100rem;display: block;line-height: 1;padding-top: 10/100rem;}
            }
            .share-icon {color: #fff;font-size: 44/100rem;position: absolute;right: 20/100rem;top: 50%;margin-top: -20/100rem;}
        }
        &-disc {
            position: relative;padding-top: 155/100rem;
            .disc-tonearm {
                transform-origin: 10% 10%;transition: all 0.5s ease-in-out;
                width: 330/1.5/100rem;height: 470/1.5/100rem;position: absolute;left: 340/100rem;top: 0;z-index: 3;
                background: url(../../assets/img/needle-plus.png) no-repeat center center;background-size: contain;
            }
            .disc-panel {
                position: relative;width: 1180/2/100rem;height: 1180/2/100rem;margin:auto auto;
                img {
                    position: absolute;left: 0;top: 0;right: 0;bottom: 0;margin: auto;width: 65%;height: 65%;border-radius: 100%;
                }
                &.animate {
                    animation: circling 20s infinite linear;
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
        }
        &-footer {position: fixed;width: 100%;bottom: 30/100rem;left: 0;z-index: 5;}
        &-tools {
            display: flex;justify-content: center;align-items: center;color:#fff;padding: 0 15/100rem;
            p {flex: 1;text-align: center;line-height: 1;}
            a {color: #fff;}
            i {font-size: 50/100rem;}
            .icon-like1 {color: #d33a31;}
        }
        &-ctrl {
            padding: 0 20/100rem;margin-top: 45/100rem;
            time {font-size: 20/100rem;color: #fff;opacity: .7;}
            .timebar {display: flex;justify-content: center;align-items: center;}
            .toolbar {
                width: 114%;margin-left: -7%;
                margin-top: 40/100rem;color: rgba(255,255,255, .8);display: flex;justify-content: center;align-items: center;
                i {
                    flex: 1;font-size: 70/100rem;text-align: center;
                    &:nth-child(3) {font-size: 90/100rem;}
                    &:first-child {font-size: 50/100rem;}
                    &:last-child {font-size: 50/100rem;}
                }
                .icon-loading {animation: circling 2s infinite linear;}
            }
        }
    }
</style>

<template>
    <div class="player-main">
        <p class="player-main-bg">
            <img :src="musicInfo.picUrlLoaded" v-if="musicInfo.picUrlLoaded">
            <img src="../../assets/img/disc_default.png" v-else>
        </p>
        <header class="player-main-header">
            <i class="back-arrow iconfont icon-arrow" @click="goBack"></i>
            <p class="title text-overflow">{{musicInfo.name}} <span class="singer">{{musicInfo.singers}}</span></p>
            <i class="share-icon iconfont icon-fenxiang"></i>
        </header>
        
        <div class="player-main-disc">
            <div class="disc-tonearm"></div>
            <div class="disc-panel-wrap" ref="discWrapRef">
                <div class="disc-panel" :class="{'animate': isPlaying}" ref="discPanelRef">
                    <img :src="musicInfo.picUrlLoaded" v-if="musicInfo.picUrlLoaded">
                    <img src="../../assets/img/disc_default.png" v-else>
                </div>
            </div>
        </div>

        <footer class="player-main-footer">
            <div class="player-main-tools">
                <p><i class="iconfont icon-like" :class="{'icon-like1': isLiked}" @click="like"></i></p>
                <p><a :href="musicInfo.url" :download="musicInfo.name"><i class="iconfont icon-LC_icon_download_line_5"></i></a></p>
                <p><router-link :to="`/comment/music/${musicInfo.id}`"><i class="iconfont icon-liuyan"></i></router-link></p>
            </div>
            <div class="player-main-ctrl">
                <div class="timebar">
                    <time class="played-time">{{musicInfo.currentTime | seconds2Time}}</time>
                    <progress-bar :buffer="musicInfo.buffer" :percent="musicInfo.percent" @percentChange="onProgressChange"></progress-bar>
                    <time class="total-time">{{musicInfo.duration | seconds2Time}}</time>
                </div>
                <div class="toolbar">
                    <i class="iconfont" :class="[playModeInfo.cls]" @click="switchPlayMode"></i>
                    <i class="iconfont icon-shangyiqu101" @click="swichMusic(-1)"></i>
                    <i v-if="isLoading" class="iconfont icon-loading"></i>
                    <i v-else class="iconfont" :class="[isPlaying ? 'icon-zanting' : 'icon-bofang']" @click="togglePlay"></i>
                    <i class="iconfont icon-xiayiqu101" @click="swichMusic(1)"></i>
                    <i class="iconfont icon-liebiao" @click="togglePLaylist(true)"></i>
                </div>
            </div>
        </footer>

        <transition name="slide-up">
            <music-list 
            :playIndex="currentIndex"
            :playModeInfo="playModeInfo" 
            :isShow="isShowList"
            @switchPlayMode="switchPlayMode" 
            @close="togglePLaylist" 
            @playMusic="onPlayMusic"
            @clearSong="onClearSong"
            @delSong="onDelSong"
            v-show="isShowList"></music-list>
        </transition>

        <audio
            ref="audioRef"
            autoplay
            @play="play" 
            @error="error" 
            @timeupdate="timeupdate"
            @progress="progress"
            @ended="ended" 
            :src="musicInfo.url"></audio>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '../../store'
import { shuffle } from '../../assets/js/util'
import MusicList from '@/components/common/MusicList.vue'
import ProgressBar from '@/components/common/ProgressBar.vue'


export default {
    name: 'Player',
	data () {
		return {
            musicInfo: {
                id: '',
                url: '',
                picUrl: '',
                picUrlLoaded: '',
                name: '暂无歌曲',
                singers: '暂无歌手',
                currentTime: '00:00', // 歌曲当前播放时间
                duration: '00:00', // 歌曲总时长
                percent: 0, // 歌曲进度
                buffer: 0 // 缓冲进度
            },
            currentIndex: 0,
            isLoading: false,
            isPlaying: false, // 标记歌曲播放状态
            isLiked: false, // 标记点赞状态
            isShowList: false // 歌曲列表是否显示
		}
    },
    components: {
        MusicList,
        ProgressBar
    },
    filters: {
        // 秒转换成标准时间 12:13
        seconds2Time (time) {
            function _addZero (num) {
                return num < 10 ? '0' + num : num;
            }
            if (isNaN(time)) {
                time = 0;
            }
            time = parseInt(time);
            let minites = _addZero(parseInt(time / 60));
            let seconds = (time % 60) >= 10 ? (time % 60) : '0' + (time % 60);
            return `${minites}:${seconds}`;
        }
    },
    mounted () {
        if (this.musicList.length) {
            this.updateMusicInfo(this.musicList[this.currentIndex]);
        }
    },
    computed: {
        ...mapState([
            'musicList',
            'playMode'
        ]),
        // 播放模式信息 图标样式名 & 文字
        playModeInfo () {
            let cls = '';
            let text = '';
            let mode = this.playMode;
            switch (this.playMode) {
                case 0:
                cls = 'icon-xunhuanbofang'
                text = '循环播放'
                break;

                case 1:
                cls = 'icon-danquxunhuan'
                text = '单曲循环'
                break;

                case 2:
                cls = 'icon-suijibofang'
                text = '随机播放'
                break;

                default:
                cls = 'icon-xunhuanbofang'
                text = '循环播放'
                break;
            }
            return {
                cls,
                text,
                mode
            };
        }
    },
    watch: {
        // 侦听歌曲地址
        'musicInfo.url' (newVal, oldVal) {
           if (newVal === oldVal) {
               return;
           };
           // 地址变化则播放音乐
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                const audioRef = this.$refs.audioRef;
                audioRef.load();  
                audioRef.oncanplay = () => {  
                    audioRef.play();
                }
            }, 0)
        },
        'musicList': {
            deep: true,
            handler: function (newVal, oldVal) {
                // 播放列表为空时跳转到首页
                if (newVal.length < 1) {
                    this.$router.push({ name: 'Index'});
                }
            }
        },
        'isLoading' (newVal) {
            // 正在加载
            if (newVal === true) {
                this.$refs.audioRef.pause();
                this.isPlaying = false
            }
        },
        'musicInfo.picUrl' (val, oldval) {
            // 歌曲图片完全加载完成才显示
            if (val) {
                this.musicInfo.picUrlLoaded = '';
                let img = new Image();
                img.onload = () =>{
                    this.musicInfo.picUrlLoaded = val;
                };
                img.src = val;
            }
        }
    },
    methods: {
        // 获取歌曲地址
        getMusicInfo (id) {
            this.isLoading = true;
            return new Promise((resolve, reject) => {
                this.$http({
                    timeout: 5000,
                    method:'get',
                    url: '/api/music/url',
                    params: {
                        id: id
                    }
                })
                .then(response => {
                    const json = response.data;
                    this.isLoading = false;
                    if (json.code == 200) {
                        resolve(json.data[0]);
                    } else {
                        reject(json.msg);
                    }
                }).catch(e => {
                    reject(e);
                })
            });
        },
        // 歌曲点赞
		like () {
			this.isLiked = !this.isLiked;
        },
        // 返回上页
        goBack () {
            window.history.back();
        },
        // 操作 audio 实例来改变当前歌曲的进度
        onProgressChange (percent) {
            const audioRef = this.$refs.audioRef;
            const currentTime = audioRef.duration * percent;
            this.musicInfo.currentTime = audioRef.currentTime = currentTime;
        },
        // audio API play 歌曲播放时
        play(e) {
            this.isPlaying = true;
            this.musicInfo.duration = e.target.duration;
        },
        // audio API error 当在音频/视频加载期间发生错误时
        error() {
            this.isPlaying = false;
            console.warn('歌曲载入出错');
        },
        // audio API timeupdate  当目前的播放位置已更改时
        timeupdate(e) {
            let currentTime = e.target.currentTime;
            let duration = e.target.duration;
            this.musicInfo.duration = duration;
            this.musicInfo.currentTime = currentTime;
            this.musicInfo.percent = currentTime / duration;
        },
        // audio API progress  缓冲进度条
        progress (e) {
            var range = 0;
            var buffer = e.target.buffered;
            var time = e.target.currentTime;
            if (buffer.length > 0) {
                while (!(buffer.start(range) <= time && time <= buffer.end(range))) {
                    range += 1;
                }
                var loadStartPercentage = buffer.start(range) / e.target.duration;
                var loadEndPercentage = buffer.end(range) / e.target.duration;
                var loadPercentage = (loadEndPercentage - loadStartPercentage) * 100;
                this.musicInfo.buffer = loadPercentage;
            }
        },
        // audio API ended  当前歌曲播放完毕
        ended() {
            const playMode = this.playMode;
            // 循环播放
            if (playMode == 0) {
                this.swichMusic(1);
            }
            // 单曲播放
            if (playMode == 1) {
                this.$refs.audioRef.play();
            }
            // 随机播放
            if (playMode == 2) {
                this.shufflePlay();
            }
        },
        // 暂停 / 播放
        togglePlay () {
            const audioRef = this.$refs.audioRef;
            const discTrans = getComputedStyle(this.$refs.discPanelRef).transform;
            const wrapTrans = getComputedStyle(this.$refs.discWrapRef).transform;
            this.isPlaying ? audioRef.pause() : audioRef.play();
            this.isPlaying = !this.isPlaying;
            this.$refs.discWrapRef.style.transform = (wrapTrans === 'none') ? discTrans : discTrans.concat('', wrapTrans);
        },
        //  切换播放模式
        switchPlayMode () {
            let min = 0;
            let max = 2;
            let mode = this.playMode;
            if (mode === min) {
                mode+=1;
            } else {
                if (mode >= max) {
                    mode = min;
                } else {
                    mode+=1;
                }
            }
            store.commit('updatePlayMode', mode);
        },
        // 显示播放列表
        togglePLaylist (flag) {
            this.isShowList = flag;
        },
        // 随机播放
        shufflePlay () {
            // 打乱播放列表
            let shuffleSong = shuffle(this.musicList);
            this.updateMusicInfo(shuffleSong[0]);
        },
        // 更新歌曲信息
        updateMusicInfo (song) {
            if (!song.id) {
                return;
            }
            // 更新歌曲信息
            this.musicInfo.id = song.id;
            this.musicInfo.percent = 0;
            this.musicInfo.buffer = 0;
            this.updatePlayIndex(); // 更新索引
            this.getMusicInfo(song.id)
            .then(json => {
                this.musicInfo.name = song.name;
                this.musicInfo.singers = song.singers;
                this.musicInfo.picUrl = song.cover;
                this.musicInfo.url = json.url;
            })
            .catch(e => {
                // 请求出错，播放下一曲
                this.swichMusic(1);
            })
        },
        // 更新播放索引值
        updatePlayIndex () {
            this.currentIndex = this.musicList.findIndex((item) => {
                return item.id === this.musicInfo.id;
            });
        },
        // 播放列表播放音乐的时候
        onPlayMusic ({song, index}) {
            this.updateMusicInfo(song);
            this.togglePLaylist(false);
        },
        // 播放列表移除单个歌曲的时候
        onDelSong ({song, index}) {
            store.commit('delMusicList', index); // 更新vuex
            //  删除的是正在播放的音乐，则播放下一曲
            if (this.musicInfo.id === song.id) {
                this.swichMusic(0);
            }
            this.updatePlayIndex(); // 更新索引
        },
        // 播放列表清空歌曲的时候
        onClearSong () {
            if (confirm("确定要清空吗？")) {
                store.commit('clearMusicList');
            }
        },
        // 切换上一曲/下一曲 (-1 => 上一曲  1 => 下一曲)
        swichMusic (type=0) {
            // 随机播放
            if (this.playMode === 2) {
                 this.shufflePlay();
                return;
            }
            let index = this.currentIndex + type;
            // 第一首
            if (index < 0) {
                index = this.musicList.length-1;
            }
            // 最后一首
            if (index >= this.musicList.length) {
                index = 0;
            }
            // 其他播放模式
            this.updateMusicInfo(this.musicList[index]);
        }
    }
}
</script>
