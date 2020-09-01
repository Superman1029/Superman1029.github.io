<template>
	<view>
		<view class="bg" :style="{backgroundImage : 'url('+song.al.picUrl+')'}"></view>
		<custom-navbar>{{song.name}}</custom-navbar>
		<view class="main" :style="{height: 'calc(100vh - 50px - ' + navHeight + 'px)'}">
			<view class="icon"></view>
			<text class="title">网易云音乐</text>
			<image class="zhen" src="../../static/zhen.png" mode=""></image>
			<view class="CD" :class="playing ? '' : 'pause'">
				<image :src="song.al.picUrl" mode=""></image>
			</view>
			<view v-show="!playing" class="playBtn iconfont icon-play5" @click="play"></view>
			<view v-show="playing" class="playBtn iconfont icon-pause" @click="pause"></view>
			
			<view class="lyric">
				<!-- <view class="last">{{lyricList[line-1].content}}</view>
				<view class="current">{{lyricList[line].content}}</view>
				<view class="next">{{lyricList[line+1].content}}</view> -->
				<!-- {{count}} -->
				<swiper 
					vertical 
					disable-touch
					display-multiple-items="3" 
					:current="line"
				>
					<swiper-item><view></view></swiper-item>
					<swiper-item v-for="item,i in lyricList" :key="i" >
						<view class="line" :class="line==i?'active':''">{{item.content}}</view>
					</swiper-item>
					<swiper-item><view></view></swiper-item>
				</swiper>
			</view>
			
			<!-- #ifdef APP-PLUS -->
			<button class="shareBtn" @click="share">分享给微信好友</button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button class="shareBtn" open-type="share">分享给微信好友</button>
			<!-- #endif -->
			
			<view class="also">
				<view class="also-title">
					<text class="also-left">喜欢这首歌的人也听</text>
					<text class="also-right iconfont icon-play" @click="playSimi">一键收听</text>
				</view>
				<play-simi v-for="item,i in simiSongs" :key="i" :simiSong="item" @playSimi="initial"></play-simi>
			</view>
			
			<view class="comment">
				<view class="comment-title">精彩评论</view>
				<play-comment v-for="item,i in comments" :key="i" :comment="item"></play-comment>
			</view>
			
		</view>
	</view>
</template>

<script>
	import customNavbar from '@/components/custom-navbar.vue'
	import playSimi from "./play-simi.vue"
	import playComment from "./play-comment.vue"
	import {getSongDetail, getSongUrl, getSongLyric, getSimiSong, getComment} from "@/tools/ajax.js"
	import {mapState, mapActions} from "vuex"
	
	export default {
		data() {
			return {
				song: {al:{picUrl:""}},
				songUrl: "",
				lyricList: [],		// 歌词列表
				line: 0  , 			//当前播放时间对应的歌词行数
				timer: null,
				simiSongs:[],
				comments:[]
				// count: 0
			}
		},
		components:{
			customNavbar,
			playSimi,
			playComment
		},
		onLoad(option) {
			
			
			// console.log(option)
			if(!option.id) option.id="1468468466";
			// 初始化
			this.initial(option.id)
		},
		onUnload() {
			clearInterval(this.timer)
		},
		computed:{ 
			...mapState(["audio","playList","playing","currentTime","currentIndex","navHeight"])
		},
		methods: { 
			...mapActions(["audioPlay","audioPause","audioReset"]),
			// 初始化函数
			initial(id){
				// console.log(id)
				// 请求歌曲信息,和歌曲url
				Promise.all([
					getSongDetail({ids: id}), 
					getSongUrl({id})
				]).then(res=>{
					// console.log(res)
					this.song = res[0].songs[0];
					this.songUrl = res[1].data[0].url;
					if(!this.songUrl){
						wx.showModal({
							title: "温馨提醒",
							content:"这首歌为VIP专享,请登陆后重试",
							showCancel: false,
							success:()=>{
								uni.navigateBack()
							}
						}) 
					}
					this.audioReset({
						name: this.song.name,
						url: this.songUrl
					})
					
					// 开启监听计时器 
					this.timer = setInterval(this.timeUpdate, 1000)
				})	
				
				// 请求歌词
				getSongLyric({id}).then(res=>{
					this.lyricList = this.formatLyric(res.lrc.lyric)
				})
				
				// 请求相似音乐
				getSimiSong({id}).then(res=>{
					// console.log(res)
					this.simiSongs = res.songs
				})
				
				// 请求歌曲评论
				getComment({id}).then(res=>{
					// console.log(res)
					this.comments = res.hotComments
				})
			},
				
			play(){
				this.$store.commit("setPlaying", true);
				this.audioPlay();
			},
			pause(){
				this.$store.commit("setPlaying", false);
				this.audioPause();
			},
			// 格式化歌词的函数, 歌词默认是字符串需要格式化成数组
			formatLyric(lrc){
				// 存放歌词数据的临时数组
				let temp = [];
				// 正则匹配
				let reg = /\[(\d{2}):(\d{2})\.(\d{1,3})\](.*)/g;
				let result = reg.exec(lrc);
				while(result != null) {
				  // console.log(result);
				  // 计算这句歌词显示的时刻点(秒数), 跟player播放器的播放秒数对应
				  let time = result[1] * 60 + result[2] * 1 + result[3] * 1 / 1000;
				  // 拿到匹配的歌词
				  let content = result[4]
				  // 把这句歌词的时间和内容转化成对象结构,存入歌词数组
				  temp.push({ time, content });
				  // 继续匹配下一句歌词
				  result = reg.exec(lrc);
				} 
				// console.log(temp)
				// 返回格式化完成的歌词数组
				return temp;
			},
			// 进度更新
			timeUpdate(){ 
				// console.log(this.audio.currentTime)
				// 更新歌词展示, 计算当前显示歌词
				for (let i = this.lyricList.length - 1; i >= 0; i--) {
				  let item = this.lyricList[i];
				  // item.time <=  time 倒着遍历找到了当前正在播放的歌词
				  // 如果这句歌词的起始时间,小于当前歌曲的播放时间,说明已经播放到了这句歌词
				  if (item.time <= this.audio.currentTime + 0.6) {
					  // console.log(i)
					// this.data.line == i 从上一行唱到了下一行
					if (this.line != i) {
					  this.line = i
					}
					break;
				  }
				}
			},
			// 分享
			share(){
				uni.share({
					provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
				    href: this.songUrl,
				    title: "彬哥请你听音乐",
				    summary: this.song.name,
				    imageUrl: this.song.al.picUrl, 
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    } 
				})
			},
			// 一键收听相似歌曲
			playSimi(){
				// 全局记录相似歌单
				this.$store.commit("setPlayList", this.simiSongs)
				if(this.currentIndex == 0){
					this.initial(this.simiSongs[0].id)
				}else{
					this.$store.commit("setCurrentIndex", 0)
				}
				
				
			}
		}, 
		watch:{ 
		// 	// 进度监听
		// 	currentTime(newTime){
		// 		for (let i = this.lyricList.length - 1; i >= 0; i--) {
		// 		  let item = this.lyricList[i];
		// 		  if (item.time <= newTime) {
		// 			if (this.line != i) {
		// 			  this.line = i
		// 			}
		// 			break;
		// 		  }
		// 		}
		// 	}
			// 索引监听
			currentIndex(newIndex){
				// console.log(newIndex)
				clearInterval(this.timer)
				this.$store.commit("setPlaying",false);
				// 初始化
				this.initial(this.playList[newIndex].id)
			} 
				
		}
	}
</script>

<style scoped>
	.bg{
		background-color: black;
		position: fixed;
		top: -10vh !important;  
		left: -10vw !important;
		z-index: -1;
		width: 120vw !important;
		height: 120vh !important;
		background-size: 100% 100% !important;
		filter: blur(10rpx) brightness(0.5);
	}
	.main{
		width: 100vw;
		box-sizing: border-box;
		color: white;
		padding: 0 30rpx;
		position: relative;
		overflow-y: scroll;
	}
	.main .icon{
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		display: inline-block;
		vertical-align: middle;
		background-image: url(http://p1.music.126.net/KxePid7qTvt6V2iYVy-rYQ==/109951165050882728.jpg);
		background-position: center center;
		background-size: 45rpx 23px;
	}
	.main .title{
		font-size: 26rpx;
		margin-left: 10rpx;
	}
	.main .zhen{
		width: 220rpx;
		height: 530rpx;
		transform: rotate(-20deg);
		position: absolute;
		top: -65rpx;
		left: 340rpx;
		z-index: 1;
	}
	.CD{
		width: 500rpx;
		height: 500rpx;
		border-radius: 50%;
		border: 16rpx solid #ffffff20;
		margin: 160rpx auto 0rpx;
		background: linear-gradient(black 30%, transparent, black 70%), radial-gradient(#000 50%, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555,#000, #555);
		background-clip: content-box;
		display: flex;
		justify-content: center;
		align-items: center;
		animation: rotate linear 18s infinite;
	}
	.CD image{
		width: 360rpx;
		height: 360rpx;
		border-radius: 50%;
	}
	.playBtn{
		width: 80rpx;
		height: 80rpx;
		margin: auto;
		border: 2rpx solid white;
		position: relative;
		top: -300rpx;
		z-index: 2;
		text-align: center;
		line-height: 80rpx;
		border-radius: 50%;
	}
	.pause{
		animation-play-state: paused;
	}
	.lyric{
		text-align: center;
		line-height: 60rpx;
		margin-top: -40rpx;
		color: #bbb;
		font-size: 28rpx;
	}
	.lyric .active{
		color:white;
		font-size: 32rpx;
	}
	.shareBtn{
		width: 350rpx; 
		height: 70rpx; 
		color: white;
		font-size: 28rpx;
		background-color: rgba(0,0,0,0);
		border: 2rpx solid white;
		box-sizing: border-box;
		text-align: center;
		margin: 60rpx auto;
		line-height: 70rpx; 
		border-radius: 40rpx;
	}
	.also-title{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.also-left, .comment-title{
		font-size: 35rpx;
	}
	.also-right{
		font-size: 24rpx;
		border: 1rpx solid gray;
		line-height: 40rpx;
		border-radius: 26rpx;
		padding: 6rpx 20rpx;
	}
	
	
	@keyframes rotate{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}


</style>
