import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playMode: localStorage.getItem('playmode') - 0 || 0, // [0循环播放，1单曲播放, 2随机播放]
    currentSong: {}, // 当前播放歌曲
    musicList: JSON.parse(localStorage.getItem('musiclist')) || [] // 音乐列表
  },
  mutations: {
    // 添加音乐列表
    addMusicList(state, param) {
      const musicList = state.musicList;
      const songData = param.data;
      let fnKey = 'unshift'; // 单曲添加到歌曲列表最前面
      // 如果添加的是歌单，则先
      if (param.type == 'list') {
        fnKey = 'push'; // 按顺序添加
        this.commit('clearMusicList'); // 清空列表
      }
      if (Array.isArray(songData)) {
        songData.forEach(song => {
          const id = song.id;
          const name = song.name;
          const album = song.album || song.al;
          const artists = song.artists || song.ar;
          const cover = album.picUrl;
          const singers = artists.map(item => item.name).join(' / ');

          // 重复的就删掉
          musicList.forEach((item, index) => {
            if (item.id == id) {
              musicList.splice(index, 1);
              return;
            }
          });

          // 将歌曲添加到列表
          state.musicList[fnKey]({
            id,
            name,
            cover,
            singers
          });
        });
        this.commit('updateLocalStorage');
      }
    },
    // 删除音乐
    delMusicList(state, index) {
      state.musicList.splice(index, 1);
      this.commit('updateLocalStorage');
    },
    // 清空列表
    clearMusicList(state) {
      state.musicList.splice(0, state.musicList.length);
      this.commit('updateLocalStorage');
    },
    // 更新本地缓存
    updateLocalStorage(state) {
      localStorage.setItem('musiclist', JSON.stringify(state.musicList));
    },
    // 更新播放状态
    updatePlayMode(state, mode) {
      state.playMode = mode;
      localStorage.setItem('playmode', mode);
    },
    // 更新当前播放歌曲
    updateCurrentSong(state, song) {
      state.currentSong = song;
    }
  }
});
