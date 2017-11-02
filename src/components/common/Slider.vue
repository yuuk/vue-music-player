<style lang="less">
	.swiper-box {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		.swiper-pagination {
			bottom: -5px;
			span.swiper-pagination-bullet {width: 6px;height: 6px;}
			span.swiper-pagination-bullet-active {background-color: #fff;}
		}
	}
	.swiper-item {height: 100%;text-align: center;background: #fff;}
</style>

<template>
	<swiper :options="swiperOption" class="swiper-box">
		<swiper-slide class="swiper-item"><a href="javascript:;"><img src="https://y.gtimg.cn/music/photo_new/T003R720x288M000003u5Edy3aOeE4.jpg?max_age=2592000&max_age=2592000"></a></swiper-slide>		
		<swiper-slide class="swiper-item"><a href="javascript:;"><img src="https://y.gtimg.cn/music/photo_new/T003R720x288M000003p9s0f1PEmXL.jpg?max_age=2592000&max_age=2592000"></a></swiper-slide>
		<swiper-slide class="swiper-item"><a href="javascript:;"><img src="https://y.gtimg.cn/music/photo_new/T003R720x288M000004JPXQz1yALn4.jpg?max_age=2592000&max_age=2592000"></a></swiper-slide>
		<div class="swiper-pagination" slot="pagination"></div>
	</swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	name: 'slider',
	components: {
		swiper,
		swiperSlide
	},
	data () {
		return {
			swiperOption: {
				pagination: '.swiper-pagination',
				loop: true,
				paginationClickable: true
			}
		}
	}
}
</script>
