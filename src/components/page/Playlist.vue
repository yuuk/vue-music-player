<style lang="less">
fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.playlist-header {
  position: relative;
  width: 100%;
  padding: 40/100rem 30/100rem;
  overflow: hidden;
  &-bg {
    background-repeat: no-repeat;
    position: absolute;
    z-index: 1;
    background-size: cover;
    background-position: 50%;
    filter: blur(20px);
    transform: scale(1.5);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    &:after {
      content: ' ';
      background-color: rgba(0, 0, 0, 0.25);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }
  &-top {
    position: relative;
    z-index: 2;
    line-height: 1;
    text-align: center;
    margin-bottom: 45/100rem;
    .icon-arrow {
      color: #fff;
      font-size: 40/100rem;
      font-weight: bold;
      position: absolute;
      left: 0;
      top: 0;
    }
    .title {
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
      font-size: 34/100rem;
      color: #fff;
    }
  }
  &-info {
    position: relative;
    z-index: 2;
    .cover {
      width: 280/100rem;
      height: 280/100rem;
      float: left;
      margin-right: 30/100rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      &:after {
        content: '';
        position: absolute;
        height: 40/100rem;
        width: 100%;
        top: 0;
        left: 0;
        background-image: linear-gradient(
          0deg,
          transparent,
          rgba(0, 0, 0, 0.2)
        );
      }
    }
    .playcount {
      position: absolute;
      right: 5px;
      top: 3px;
      z-index: 2;
      padding-left: 15px;
      color: #fff;
      font-size: 12px;
      background-position: 0;
      background-repeat: no-repeat;
      background-size: 11px 10px;
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
    }
    .i-desc {
      position: absolute;
      right: 5px;
      bottom: 3px;
      color: #fff;
      font-size: 38/100rem;
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
    }
    .title {
      font-size: 36/100rem;
      color: #fff;
      padding-top: 35/100rem;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .userinfo {
      margin-top: 35/100rem;
      img {
        width: 60/100rem;
        height: 60/100rem;
        border-radius: 100px;
        float: left;
        margin-right: 15/100rem;
      }
      span {
        font-size: 28/100rem;
        color: #d4d2d3;
        float: left;
        line-height: 60/100rem;
      }
    }
  }
  &-tool {
    position: relative;
    z-index: 2;
    width: 100%;
    display: table;
    p {
      display: table-cell;
      width: 33.3333%;
      color: #fff;
      text-align: center;
      line-height: 1;
      &.favor {
        i {
          font-size: 60/100rem;
        }
      }
      &.msg {
        i {
          font-size: 60/100rem;
        }
      }
      &.share {
        i {
          font-size: 56/100rem;
        }
      }
    }
    a {
      color: #fff;
    }
    span {
      color: #d4d2d3;
      display: block;
      font-size: 30/100rem;
      margin-top: 20/100rem;
    }
  }
}
.playlist-body {
  font-size: 34/100rem;
  .header {
    color: #313234;
    background: #eeeff0;
    line-height: 1;
    padding: 20/100rem;
    i {
      font-size: 40/100rem;
      vertical-align: -1px;
      margin-right: 10/100rem;
    }
    span {
      color: #939395;
      font-size: 30/100rem;
      vertical-align: 1px;
    }
  }
}

.playlist-detail {
  width: 100%;
  height: 100%;
  padding-top: 125/100rem;
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: #fff;
  &-close {
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    font-size: 40/100rem;
    top: 40/100rem;
    right: 40/100rem;
  }
  &-bg {
    background-repeat: no-repeat;
    position: absolute;
    z-index: -1;
    background-size: cover;
    background-position: 50%;
    filter: blur(20px);
    transform: scale(1.5);
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    &:after {
      content: ' ';
      background-color: rgba(0, 0, 0, 0.25);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }
  &-wrap {
    max-height: 90%;
    overflow-y: auto;
    padding: 0 40/100rem 40/100rem;
    position: relative;
    &:after {
      content: '';
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 0;
      height: 3rem;
      background: linear-gradient(
        to bottom,
        rgba(50, 50, 50, 0) 0%,
        rgba(50, 50, 50, 0.9) 50%,
        rgba(50, 50, 50, 1) 80%,
        rgba(50, 50, 50, 1) 100%
      );
    }
  }
  &-cover {
    width: 400/100rem;
    height: 400/100rem;
    margin: auto;
    display: block;
  }
  &-title {
    font-size: 34/100rem;
    color: #fff;
    text-align: center;
    margin-top: 55/100rem;
  }
  &-tags {
    color: #fff;
    line-height: 40/100rem;
    margin-top: 40/100rem;
    border-top: 1px solid rgba(255, 255, 255, 0.6);
    padding-top: 10/100rem;
    em {
      font-size: 26/100rem;
    }
    span {
      font-size: 24/100rem;
      margin-right: 20/100rem;
      display: inline-block;
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 100px;
      height: 40/100rem;
      padding: 0 15/100rem;
    }
  }
  &-content {
    font-size: 28/100rem;
    color: #fff;
    line-height: 1.8;
    margin-top: 40/100rem;
  }
}
</style>

<template>
  <div v-if="detailInfo.name">
    <header class="playlist-header">
      <p
        class="playlist-header-bg"
        :style="{ backgroundImage: `url(${detailInfo.coverImgUrl})` }"
      />
      <div class="playlist-header-top">
        <i
          class="back-arrow iconfont icon-arrow"
          @click="goBack"
        />
        <p class="title">
          歌单
        </p>
      </div>
      <div class="playlist-header-info clearfix">
        <div
          class="cover"
          @click="toggleDetail(true)"
        >
          <img :src="detailInfo.coverImgUrl">
          <i class="playcount i-earphone">{{
            detailInfo.playCount | formatNum
          }}</i>
          <i class="iconfont icon-informationicon i-desc" />
        </div>
        <div class="title">
          {{ detailInfo.name }}
        </div>
        <div class="userinfo clearfix">
          <img :src="detailInfo.creator.avatarUrl">
          <span>{{ detailInfo.creator.nickname }}</span>
        </div>
      </div>
      <div class="playlist-header-tool">
        <p class="favor">
          <i class="iconfont icon-wodeshoucang_l" />
          <span>{{ detailInfo.subscribedCount }}</span>
        </p>
        <p class="msg">
          <router-link :to="`/comment/playlist/${detailInfo.id}`">
            <i class="iconfont icon-liuyan" />
            <span>{{ detailInfo.commentCount }}</span>
          </router-link>
        </p>
        <p class="share">
          <i class="iconfont icon-fenxiang" />
          <span>{{ detailInfo.shareCount }}</span>
        </p>
      </div>
    </header>
    <section class="playlist-body">
      <header
        class="header"
        @click="playAll"
      >
        <i class="iconfont icon-bofang" />播放全部
        <span>(共{{ detailInfo.trackCount }}首)</span>
      </header>
      <Song :song-list="detailInfo.tracks" />
    </section>

    <transition name="fade">
      <div
        class="playlist-detail"
        v-show="showDetail"
        transiton="fade"
      >
        <i
          class="playlist-detail-close iconfont icon-close"
          @click="toggleDetail(false)"
        />
        <div
          class="playlist-detail-bg"
          :style="{ backgroundImage: `url(${detailInfo.coverImgUrl})` }"
        />
        <div class="playlist-detail-wrap">
          <img
            class="playlist-detail-cover"
            :src="detailInfo.coverImgUrl"
          >
          <h6 class="playlist-detail-title">
            {{ detailInfo.name }}
          </h6>
          <div
            class="playlist-detail-tags"
            v-if="detailInfo.tags.length"
          >
            <em>标签：</em>
            <span
              v-for="(tag, index) in detailInfo.tags"
              :key="index"
            >{{
              tag
            }}</span>
          </div>
          <article
            class="playlist-detail-content"
            v-html="formatContent(detailInfo.description)"
          />
        </div>
      </div>
    </transition>
  </div>
  <pageLoading v-else />
</template>

<script>
import store from '../../store';
import Song from '@/components/common/Song.vue';
import pageLoading from '@/components/common/PageLoading.vue';
export default {
  components: {
    Song,
    pageLoading
  },
  data() {
    return {
      id: '',
      showDetail: false,
      detailInfo: {}
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getPlaylistData();
  },
  methods: {
    getPlaylistData() {
      this.$http({
        method: 'get',
        url: '/api/playlist/detail',
        params: {
          id: this.id
        }
      }).then(response => {
        const json = response.data;
        if (json.code == 200) {
          this.detailInfo = json.playlist;
        } else {
          alert(json.msg);
        }
      });
    },
    // 播放全部
    playAll() {
      const tracks = this.detailInfo.tracks;
      store.commit('addMusicList', {
        data: tracks,
        type: 'list'
      });
      this.$router.push({ name: 'Player' });
    },
    // 格式化评论内容
    formatContent(content) {
      return content.replace(/\n/g, '<br/>');
    },
    // 显示详情
    toggleDetail(flag) {
      this.showDetail = flag;
    },
    // 返回上页
    goBack() {
      window.history.back();
    }
  }
};
</script>
