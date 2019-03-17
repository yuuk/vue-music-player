<style lang="less">
.swiper-box {
  width: 100%;
  height: 100%;
  min-height: 100px;
  margin: 0 auto;
  .swiper-pagination {
    bottom: -5px;
    span.swiper-pagination-bullet {
      width: 6px;
      height: 6px;
    }
    span.swiper-pagination-bullet-active {
      background-color: #fff;
    }
  }
}
.swiper-item {
  height: 100%;
  text-align: center;
  background: #fff;
}
</style>

<template>
  <swiper :options="swiperOption" class="swiper-box" v-if="sliderItem.length">
    <swiper-slide
      class="swiper-item"
      v-for="(slide, index) in sliderItem"
      :key="index"
    >
      <a :title="slide.typeTitle"><img :src="slide.imageUrl"/></a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination" />
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'Slider',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    sliderItem: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 3000,
        paginationClickable: true
      }
    };
  }
};
</script>
