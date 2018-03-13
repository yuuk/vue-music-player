<style lang="less">
	.comment-body {
		&-item {
			padding: 20/100rem 0 0 20/100rem;
			header {padding-right: 20/100rem;}
			.avatar {
				width: 60/100rem;height: 60/100rem;position: relative;margin-right: 20/100rem;float: left;
				img {width: 100%;height: 100%;border-radius: 100px;}
			}
			.userinfo {float: left;line-height: 1;}
			.nickname {
				font-size: 26/100rem;color: #5f6061;padding-top: 6/100rem;
			}
			.time {font-size: 18/100rem;color: #979798;display: block;margin-top: 8/100rem;}
			.likedcount {
				font-size: 24/100rem;color: #979798;float: right;
				i {font-size: 36/100rem;font-weight: bold;vertical-align: -1/100rem;margin-left: 5/100rem;}
				&.liked {color: #d33a31;}
			}
			.content {
				border-bottom: 1px solid #e2e3e4;padding-right: 20/100rem;padding-bottom: 20/100rem;
				line-height: 1.8;font-size: 28/100rem;color: #323234;margin-left: 80/100rem;margin-top: 15/100rem;
			}
			&:last-child {
				.content {border-bottom: none;}
			}
		}
	}
</style>

<template>
	<div>
		<div class="comment-body-item" v-for="(comment, index) in data" :key="index">
			<header class="clearfix">
				<p class="avatar"><img :src="comment.user.avatarUrl" alt=""></p>
				<div class="userinfo">
					<p class="nickname">{{comment.user.nickname}}<time class="time">{{comment.time | formatTime}}</time></p>
				</div>
				
				<p class="likedcount" :class="{'liked': comment.liked}" @click="like(comment)">{{comment.likedCount | formatCommentNum}}<i class="iconfont icon-iclikenormal"></i></p>
			</header>
			<div class="content" v-html="formatContent(comment.content)"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CommentList',
	data () {
		return {

		}
	},
	filters: {
		formatCommentNum (num) {
			if (num > 100000) {
				return `${(num/10000).toFixed(0)}万`
			}
			return num;
		}
	},
	props: {
		data: {
			type: Array,
			required: true,
			default: []
		}
	},
	methods: {
		// 格式化评论内容
		formatContent (content) {
			return content.replace(/\n/g, "<br/>");
		},
		// 评论点赞
		like (comment) {
			comment.likedCount = (comment.liked) ? comment.likedCount - 1 : comment.likedCount + 1;
			comment.liked = !comment.liked;
		}
	}
}
</script>
