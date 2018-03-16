<style lang="less">
    @import url('../../assets/css/util.less');
    .mv-detail {
        &-header {
            position: relative;height: 80/100rem;line-height: 80/100rem;text-align: center;background-color: #34393b;
            .icon-arrow {color: #fff;font-size: 38/100rem;position: absolute;left: 20/100rem;top: 0;}
            .title {text-shadow: 1px 0 0 rgba(0,0,0,.15);font-size: 34/100rem;color: #fff;}
        }
        &-video, video {width: 100%;line-height: 1;height: auto;}
        &-info {
            padding: 10/100rem 20/100rem;
            .title {font-size: 36/100rem;color: #323234;line-height: 1.4;}
            .summary {
                font-size: 28/100rem;color: #a3a4a5;margin-top: 15/100rem;line-height: 1;overflow: hidden;
                time  {padding: 0 40/100rem;}
            }
            .content {
                max-height: 300/100rem;overflow-y: auto;
                border-top: .5px solid #eee;font-size: 28/100rem;color: #999;line-height: 1.5;margin-top: 30/100rem;padding-top: 20/100rem;
            }
        }
        &-widget {
            padding: 0 25/100rem;margin-top: 15/100rem;
            width: 100%;display: flex;align-items: baseline;justify-content: space-between;
            p{
                text-align: center;line-height: 1;
                &.active {
                    i, span {color: #d33a31;}
                }
                i {color: #444;display: block;}
                span {color: #7d7e7f;}
                .icon-iclikenormal {font-size: 56/100rem;}
                .icon-wodeshoucang_l {font-size: 56/100rem;}
                .icon-liuyan {font-size: 52/100rem;}
                .icon-fenxiang {font-size: 46/100rem;}
            }
            span {display: block;font-size: 26/100rem;margin-top: 10/100rem;}
        }
        &-similar {
            margin-top: 40/100rem;overflow: hidden;
            .header {padding-left: 20/100rem;font-size: 24/100rem;color: #5f6061;background-color: #eeeff0;height: 50/100rem;line-height: 50/100rem;}
            .body {
                padding: 15/100rem;
                li {
                    position: relative;height: 120/100rem;margin-bottom: 25/100rem;padding-left: 214/100rem;
                    &:last-child {margin-bottom: 0;}
                }
                .img {
                    width: 214/100rem;height: 120/100rem;position: absolute;left: 0;top: 0;
                    span {
                        text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);font-size: 24/100rem;
                        position: absolute;right: 15/100rem;top: 10/100rem;color: #fff;z-index: 2;
                        i {font-size: 28/100rem;margin-right: 5/100rem;vertical-align: middle;}
                    }
                    img {width: 100%;height: auto;}
                }
                .summary {padding-left: 20/100rem;padding-top: 5/100rem;}
                .title {line-height: 1.3;color: #313638;font-size: 30/100rem;.text-overflow-mutil;}
                .creater {color: #7d7e7f;font-size: 24/100rem;padding-top: 5/100rem;}
            }
        }
    }
</style>

<template>
    <section class="mv-detail" v-if="mvInfo.id">
        <header class="mv-detail-header">
			<i class="back-arrow iconfont icon-arrow" @click="goBack"></i>
            <p class="title">{{mvInfo.name}}</p>
		</header>
        <div class="mv-detail-video">
            <video :poster="mvInfo.cover" autoplay preload controls>
                <source :src="mvUrl" type="video/mp4">
            </video>
        </div>

        <div class="mv-detail-info">
            <h5 class="title">{{mvInfo.name}}</h5>
            <p class="summary">
                <em>演唱：{{mvInfo.artistName}}</em>
                <time>发布：{{mvInfo.publishTime}}</time>
                <span>播放：{{mvInfo.playCount | formatNum}}</span>
            </p>
            <p class="content" v-if="mvInfo.desc" v-html="mvInfo.desc"></p>
        </div>

        <div class="mv-detail-widget">
            <p :class="{'active': isLike}" @click="like"><i class="iconfont icon-iclikenormal"></i><span>{{mvInfo.likeCount}}</span></p>
            <p><i class="iconfont icon-wodeshoucang_l"></i><span>{{mvInfo.subCount}}</span></p>
            <p><router-link :to="`/comment/mv/${mvInfo.id}`"><i class="iconfont icon-liuyan"></i><span>{{mvInfo.commentCount}}</span></router-link></p>
            <p><i class="iconfont icon-fenxiang"></i><span>{{mvInfo.shareCount}}</span></p>
        </div>

        <div class="mv-detail-similar" v-if="similarMv.length">
            <h6 class="header">相关推荐</h6>
			<ul class="body clearfix">
				<li v-for="(item, index) in similarMv" :key="index">
					<router-link :to="`/mv/${item.id}`">
					<p class="img">
                        <img :src="item.cover" alt="">
                        <span><i class="iconfont icon-socialyoutubeoutline"></i>{{item.playCount | formatNum}}</span>
                    </p>
					<div class="summary">
                        <p class="title">{{item.name}}</p>
                        <p class="creater">by {{item.artistName}}</p>
                    </div>
					</router-link>
				</li>
			</ul>
        </div>
    </section>
    <pageLoading v-else></pageLoading>
</template>

<script>
import pageLoading from '@/components/common/PageLoading.vue'
export default {
    components: {
        pageLoading
    },
    data () {
        return {
            id: '',
            isLike: false,
            similarMv: [],
            mvInfo: {},
            commentInfo: []
        }
    },
    computed: {
        mvUrl () {
            let prefix = '/api/mv/url?url=';
            let url = this.mvInfo.brs['480'] ? this.mvInfo.brs['480'] : this.mvInfo.brs['240']
            return prefix + url;
        }
    },
    watch: {
        '$route' (newVal, oldVal) {
            window.location.reload();
        }
    },
    mounted () {
        this.request();
	},
    methods: {
        request () {
            this.id = this.$route.params.id;
            this.getDetail();
            this.getSimilarMv();
        },
		// 获取banner数据
		getDetail () {
			this.$http({
				method:'get',
                url:'/api/mv',
                params: {
                    mvid: this.id
                }
			})
			.then(response => {
				const json = response.data;
				if (json.code == 200) {
					this.mvInfo = json.data;
				}
			});
        },
        getSimilarMv () {
            this.$http({
				method:'get',
                url:'/api/simi/mv',
                params: {
                    mvid: this.id
                }
			})
			.then(response => {
				const json = response.data;
				if (json.code == 200) {
					this.similarMv = json.mvs;
				}
			});
        },
        like () {
            this.isLike = !this.isLike;
        },
        // 返回上页
        goBack () {
            window.history.back();
		}
    }
}
</script>
