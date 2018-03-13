<style lang="less">
    .playlist-header {
        position: relative;width: 100%;padding: 40/100rem 30/100rem;overflow: hidden;
        &-bg {
            background-repeat: no-repeat;position: absolute;z-index: 1;
            background-size: cover;background-position: 50%;filter: blur(20px);transform: scale(1.5);
            position: absolute;left: 0;top: 0;right: 0;bottom: 0;
            &:after {
                content: " ";background-color: rgba(0,0,0,.25);position: absolute;left: 0;top: 0;right: 0;bottom: 0;
            }
        }
        &-top {
            position: relative;z-index: 2;line-height: 1;text-align: center;margin-bottom: 45/100rem;
            .icon-arrow {color: #fff;font-size: 40/100rem;font-weight: bold;position: absolute;left: 0;top: 0;}
            .title {text-shadow: 1px 0 0 rgba(0,0,0,.15);font-size: 34/100rem;color: #fff;}
        }
        &-info {
            position: relative;z-index: 2;
            .cover {
                width: 280/100rem;height: 280/100rem;float: left;margin-right: 30/100rem;position: relative;
                img {width: 100%;height: 100%;}
                &:after {
                    content: '';position: absolute;height: 40/100rem;width: 100%;top: 0;left: 0;
                    background-image: linear-gradient(0deg,transparent,rgba(0,0,0,.2));
                }
            }
            .playcount {
                position: absolute;right: 5px;top: 3px;z-index: 2;padding-left: 15px;color: #fff;font-size: 12px;
                background-position: 0;background-repeat: no-repeat;background-size: 11px 10px;text-shadow: 1px 0 0 rgba(0,0,0,.15);
            }
            .i-desc {
                position: absolute;right: 5px;bottom: 3px;color: #fff;font-size: 38/100rem;
            }
            .title {
                font-size: 36/100rem;color: #fff;padding-top: 35/100rem;line-height: 1.5;
                display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;
            }
            .userinfo {
                margin-top: 35/100rem;
                img {width: 60/100rem;height: 60/100rem;border-radius: 100px;float: left;margin-right: 15/100rem;}
                span {font-size: 28/100rem;color: #d4d2d3;float: left;line-height: 60/100rem;}
            }
        }
        &-tool {
            position: relative;z-index: 2;width: 100%;display: table;
            p{
                display: table-cell;width: 33.3333%;color: #fff;text-align: center;line-height: 1;
                &.favor {
                    i {font-size: 60/100rem;}
                }
                &.msg {
                    i {font-size: 60/100rem;}
                }
                &.share {
                    i {font-size: 56/100rem;}
                }
            }
            a {color: #fff;}
            span {color: #d4d2d3;display: block;font-size: 30/100rem;margin-top: 20/100rem;}
        }
    }
    .playlist-body {
        font-size: 34/100rem;
        .header {
            color: #313234;background-color: #eeeff0;line-height: 1;padding: 20/100rem;
            span {color: #939395;}
        }
    }
</style>

<template>
    <div v-if="detailInfo.name">
        <header class="playlist-header">
            <p class="playlist-header-bg" :style="{backgroundImage: `url(${detailInfo.coverImgUrl})`}"></p>
            <div class="playlist-header-top">
                <i class="back-arrow iconfont icon-arrow" @click="goBack"></i>
                <p class="title">歌单</p>
            </div>
            <div class="playlist-header-info clearfix">
                <div class="cover">
                    <img :src="detailInfo.coverImgUrl">
                    <i class="playcount i-earphone">{{detailInfo.playCount | formatNum}}</i>
                    <i class="iconfont icon-informationicon i-desc" @click="showDetail"></i>
                </div>
                <div class="title">{{detailInfo.name}}</div>
                <div class="userinfo clearfix">
                    <img :src="detailInfo.creator.avatarUrl">
                    <span>{{detailInfo.creator.nickname}}</span>
                </div>
            </div>
            <div class="playlist-header-tool">
                <p class="favor"><i class="iconfont icon-wodeshoucang_l"></i><span>{{detailInfo.subscribedCount}}</span></p>
                <p class="msg">
                    <router-link :to="`/comment/playlist/${detailInfo.id}`">
                    <i class="iconfont icon-liuyan"></i><span>{{detailInfo.commentCount}}</span>
                    </router-link>
                </p>
                <p class="share"><i class="iconfont icon-fenxiang"></i><span>{{detailInfo.shareCount}}</span></p>
            </div>
        </header>
        <section class="playlist-body">
            <header class="header">歌曲列表<span> (共{{detailInfo.trackCount}}首)</span></header>
            <Song :songList="detailInfo.tracks"></Song>
        </section>
    </div>
    <div class="page-loading" v-else><i class="loading-gif"></i></div>
</template>

<script>
import Song from '@/components/common/Song.vue'
export default {
    components: {
		Song
	},
    data () {
        return {
            id: '',
            detailInfo: {}
        }
    },
    mounted () {
        this.id = this.$route.params.id;
        this.getPlaylistData();
    },
    methods: {
        getPlaylistData () {
            this.$http({
				method:'get',
                url:'/api/playlist/detail',
                params: {
                    id: this.id
                }
			})
			.then(response => {
                const json = response.data;
                if (json.code == 200) {
                    this.detailInfo = json.result;
                } else {
                    alert(json.msg);
                }
			});
        },
        // 显示详情
        showDetail () {
            console.warn(this.detailInfo)
        },
        // 返回上页
        goBack () {
            window.history.back();
        }
    }
}
</script>
