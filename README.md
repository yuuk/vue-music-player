<h1 align="center"><img width="100" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4256601263,817656986&fm=27&gp=0.jpg" /><br> Vue Music player</h1>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" />
  <img src="https://img.shields.io/github/issues/yuuk/vue-music-player.svg?style=flat-square" />
  <a href="http://www.430115.com">
    <img src="https://img.shields.io/badge/author-yuuk-blue.svg?style=flat-square" />
  </a>
</p>

<p align="center">
  <b>一款基于vue-cli的音乐播放器webapp，界面灵感来源网易云音乐ios版，根据实际情况修改过部分样式~</b></br>
  <sub>技术栈：vue、vue router、vuex、axios、ES6、iconfont<sub>
</p>
 
<p align="center">
  <img src="https://raw.githubusercontent.com/yuuk/vue-music-player/master/screenshoot/%E6%92%AD%E6%94%BE%E7%95%8C%E9%9D%A2.jpg"/>
  <br/>
  播放界面
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/yuuk/vue-music-player/master/screenshoot/%E6%92%AD%E6%94%BE%E5%88%97%E8%A1%A8.jpg"/>
  <br/>
  播放列表
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/yuuk/vue-music-player/master/screenshoot/%E6%AD%8C%E5%8D%95%E5%88%97%E8%A1%A8.jpg"/>
  <br/>
  歌单列表
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/yuuk/vue-music-player/master/screenshoot/%E6%AD%8C%E5%8D%95%E4%BB%8B%E7%BB%8D.jpg"/>
  <br/>
  歌单介绍
</p>

## Todo
- [X] 播放功能
- [X] 播放模式（列表循环、单曲轮播、随机播放） 
- [X] 本地存储播放数据
- [X] 歌单
- [X] 评论列表（歌单、歌曲、MV）
- [X] MV播放
- [ ] mini播放器

## 项目接口
基于【NeteaseCloudMusicApi】使用方法请遵循该项目文档
https://github.com/Binaryify/NeteaseCloudMusicApi

## 已知问题
1. 手机端无法自动播放音乐
2. IOS端无法播放视频，不知道是否与.MP4格式有关

## 安装&运行
``` bash
# 下载项目到本地
git clone https://github.com/yuuk/vue-music-player.git

# 进入项目文件夹
cd vue-music-player

# 安装依赖
npm install

# 运行项目 
npm run dev

#访问
localhost:1234
