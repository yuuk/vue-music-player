<style lang="less">
	.comment-top {
		position: relative;height: 80/100rem;line-height: 80/100rem;text-align: center;background-color: #34393b;
		.icon-arrow {color: #fff;font-size: 40/100rem;position: absolute;left: 20/100rem;top: 0;}
		.title {text-shadow: 1px 0 0 rgba(0,0,0,.15);font-size: 34/100rem;color: #fff;}
	}
	.comment-header {
		padding: 20/100rem 80/100rem 20/100rem 20/100rem;position: relative;
		.cover {width: 160/100rem;height: 160/100rem;float: left;margin-right: 20/100rem;}
		.name {font-size: 30/100rem;color: #373738;padding-top: 15/100rem;line-height: 1.5;}
		.typetag {border: 1px solid #373738;font-size: 16/100rem;padding: 1px 3px;vertical-align: 3/100rem;margin-right: 10/100rem;}
		.desc {
			font-size: 28/100rem;margin-top: 10/100rem;
			b {color: #507daf;font-weight: normal;}
		}
		.go-arrow {
			font-weight: bold;position: absolute;right: 20/100rem;top: 50%;
			transform: rotate(-180deg);color: #e1e2e3;font-size: 36/100rem;margin-top: -18/100rem;
		}
	}
	.comment-body {
		&-header {padding-left: 20/100rem;font-size: 24/100rem;color: #5f6061;background-color: #eeeff0;height: 50/100rem;line-height: 50/100rem;}
	}
</style>

<template>
	<div v-if="info.name && commentInfo.total">
		<div class="comment-top">
			<i class="back-arrow iconfont icon-arrow" @click="goBack"></i>
            <p class="title">评论 ({{commentInfo.total}})</p>
		</div>

		<header class="comment-header clearfix" @click="goDetail">
			<img class="cover" :src="formatInfo.cover" alt="">
			<p class="name"><span class="typetag">{{formatInfo.type}}</span>{{formatInfo.name}}</p>
			<p class="desc">by <b>{{formatInfo.user}}</b></p>
			<i class="go-arrow iconfont icon-arrow"></i>
		</header>
		
		<section class="comment-body" v-if="commentInfo.hotComments.length">
			<header class="comment-body-header">精彩评论</header>
			<div class="comment-body-list">
				<commentList :data="commentInfo.hotComments"></commentList>
			</div>
		</section>

		<section class="comment-body" v-if="commentInfo.comments.length">
			<header class="comment-body-header">最新评论</header>
			<div class="comment-body-list">
				<commentList :data="commentInfo.comments"></commentList>
			</div>
		</section>
	</div>
	<div class="page-loading" v-else><i class="loading-gif"></i></div>
</template>

<script>
import commentList from '@/components/common/Comment.vue'
export default {
	name: 'Comment',
	data () {
		return {
			info: {},
			commentInfo: {}
		}
	},
	components: {
		commentList
	},
	computed: {
		commentType () {
			return this.$route.params.type
		},
		commentId () {
			return this.$route.params.id
		},
		commentUrl () {
			return `/api/comment/${this.commentType}?id=${this.commentId}`;
		},
		infoUrl () {
			let url = '';
			if (this.commentType == 'playlist') {
				url = `/api/playlist/detail?id=${this.commentId}`
			} else {
				url = `/api/song/detail?ids=${this.commentId}`
			}
			return url;
		},
		// 头部信息格式化（兼容歌单和歌曲）
		formatInfo () {
			let cover, type, name, user;
			if (this.commentType == 'playlist') {
				cover = this.info.coverImgUrl;
				type = '歌单';
				name = this.info.name;
				user = this.info.creator.nickname;
			} else {
				cover = this.info.al.picUrl;
				type = '歌曲';
				name = this.info.name;
				user = this.singerArr2singerStr(this.info.ar);
			}
			return {
				cover,
				type,
				name,
				user
			}
		}
	},
	mounted () {
		this.getComment();
		this.getInfo();
	},
	methods: {
		// 获取评论数据
		getComment () {
            this.$http({
				method:'get',
                url: this.commentUrl
			})
			.then(response => {
                const json = response.data;
                if (json.code == 200) {
                    this.commentInfo = json;
                } else {
                    alert(json.msg);
                }
			});
		},
		// 获取顶部信息
		getInfo () {
			this.$http({
				method:'get',
                url: this.infoUrl
			})
			.then(response => {
                const json = response.data;
                if (json.code == 200) {
                    this.info = json.result || json.songs[0];
                } else {
                    alert(json.msg);
                }
			});
		},
		singerArr2singerStr (arr) {
            const str = arr.map(item => {
                return item.name
            }).join('/');
            return `${str}`;
		},
		// 返回上页
        goBack () {
            window.history.back();
		},
		// 回到详情页
		goDetail () {
			let name = this.commentType == 'playlist' ? 'Playlist' : 'Player';
			this.$router.push({ name: name, params: {id: this.commentId} })
		}
	}
}
</script>
