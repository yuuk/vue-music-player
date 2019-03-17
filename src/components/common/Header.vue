<style lang="less">
.page-header {
  .top {
    height: 85/100rem;
    background-color: #34393b;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user-btn {
    display: block;
    position: absolute;
    width: 40/100rem;
    height: 46/100rem;
    top: 50%;
    left: 30/100rem;
    margin-top: -23/100rem;
    color: #fff;
    font-size: 40/100rem;
  }
  .music-btn {
    display: block;
    position: absolute;
    width: 48/100rem;
    height: 48/100rem;
    top: 50%;
    right: 30/100rem;
    margin-top: -24/100rem;
    i {
      display: block;
      width: 100%;
      height: 100%;
      background: url('../../assets/img/icon-music.png') no-repeat 0 0;
      background-size: 100%;
    }
  }
  .search {
    background-color: #fff;
    width: 535/100rem;
    height: 60/100rem;
    border-radius: 100px;
    position: relative;
    i {
      position: absolute;
      color: #666;
      z-index: 1;
      font-size: 30/100rem;
      left: 50/100rem;
      top: 50%;
      margin-top: -15/100rem;
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      border: 0;
      height: 100%;
      border-radius: 100px;
      padding: 0 90/100rem;
      width: 100%;
      box-sizing: border-box;
      font-size: 24/100rem;
    }
  }
  .nav {
    height: 80/100rem;
    background-color: #f8f8f9;
    ul {
      display: flex;
      flex-flow: nowrap;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    li {
      height: 100%;
      line-height: 80/100rem;
      font-size: 28/100rem;
      padding: 0 40/100rem;
    }
    a {
      color: #444;
      display: block;
      position: relative;
      padding: 0 10/100rem;
      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        display: none;
        background-color: #444;
      }
      &.router-link-exact-active {
        &:after {
          display: block;
        }
      }
    }
  }
}
</style>
<template>
  <header class="page-header">
    <div class="top">
      <i class="iconfont icon-user user-btn" />
      <p class="search">
        <i class="iconfont icon-search" />
        <input type="text" placeholder="搜索音乐" />
      </p>
      <router-link :to="`player/`" class="music-btn">
        <i />
      </router-link>
    </div>
    <nav class="nav">
      <ul class="clearfix">
        <li v-for="(item, key, index) of nav" :key="index">
          <router-link :to="item.path">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        {
          name: '发现音乐',
          path: '/'
        },
        {
          name: '歌单',
          path: '/list'
        },
        {
          name: '排行',
          path: '/rank'
        },
        {
          name: '歌手',
          path: '/singer'
        }
      ]
    };
  }
};
</script>
