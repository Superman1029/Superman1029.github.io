<template>
	<view>
		<view class="navBar" :style="{paddingTop: navHeight + 'px', background: bgGradient}">
			<view class="iconfont icon-left" @click="back"></view>
			歌单 
		</view> 
		<view class="main" :style="{marginTop: navHeight + 50 + 'px', backgroundColor: bgColor}">
			<view class="info" v-if="playList">
				<view class="left">
					<image :src="playList.coverImgUrl" mode=""></image>
					<text class="iconfont icon-play1"> {{(playList && playList.playCount ) | countFilter}}</text>
				</view>
				<view class="right">
					<view class="title"> {{playList.name}} </view>
					<image :src="playList.creator.avatarUrl" mode=""></image>			 		
					<text class="name">{{playList.creator.nickname}}</text>
					<view class="des" @click="goToCreatorPage">
						{{playList.description}}
						<text class="iconfont icon-rightarrow"></text>
					</view>
				</view>
			</view>
			
			<!-- #ifdef APP-PLUS -->
			<button class="share iconfont icon-tubiaozhizuomoban-" @click="shareAppMessage">分享给微信好友</button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<button class="share iconfont icon-tubiaozhizuomoban-" open-type="share">分享给微信好友</button>
			<!-- #endif -->
			
			
			<view class="list" v-if="playList">
				<view class="playAll iconfont icon-play" @click="playAll">
					播放全部 
					<text>(共{{playList.tracks.length}}首)</text>
				</view>
				<song-item v-for="item,i in playList.tracks" :key="i" :song="item" :index="i">{{i+1}}</song-item>
			</view>
		</view>
	</view>
</template>

<script>
	// 数据请求函数
	import {getPlayList} from "@/tools/ajax.js"
	// 子组件
	import songItem from "./song-item.vue"
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				playList: null,   // 数据列表
				bgGradient: null, // 背景渐变
				bgColor:null,    // 背景颜色
				// navHeight : 0    // 顶部状态条高度
			}
		},
		components:{
			songItem
		},
		computed:{
			...mapState(["navHeight"])
		},
		onLoad(option){
			// console.log(option) 
			// 获取顶部状态条高度(已移至状态管理)
			// uni.getSystemInfo({
			// 	success:res=>{
			// 		// console.log(res.statusBarHeight)
			// 		this.navHeight = res.statusBarHeight
			// 	}
			// })
			
			if(!option.id) option.id = 2884035
			// 设置自定义导航条颜色
			if(option.id == 19723756){
				this.bgGradient = "linear-gradient(#93a7c5, #477ab3)";
				this.bgColor = "#477ab3";
			}else if(option.id == 3779629){
				this.bgGradient = "linear-gradient(#8bb9bc, #449fa2)";
				this.bgColor = "#449fa2";
			}
			else if(option.id == 2884035){
				this.bgGradient = "linear-gradient(#c18797, #ab4260)";
				this.bgColor = "#ab4260";
			}
			else if(option.id == 3778678){
				this.bgGradient = "linear-gradient(#b38a84, #95463b)";
				this.bgColor = "#95463b";
			}
			
			// 请求歌单数据
			getPlayList({
				id: option.id
			}).then(res=>{
				// console.log(res.playlist)
				this.playList = res.playlist
				// 全局记录歌单
				this.$store.commit("setPlayList", this.playList.tracks)
			})
			
			
		},  
		
		methods: {
			back(){
				uni.navigateBack()
				// uni.navigateTo({
				// 	url:"../index/index"
				// })
			},
			playAll(){
				// 记录播放列表并播放第一首
				this.$store.commit("setCurrentIndex", 0)
				uni.navigateTo({
					url:"../play/play?id="+this.playList.tracks[0].id
				})
			},
			// 分享
			shareAppMessage: function () {
				// console.log("share")
				uni.share({
					provider: "weixin",
			  	    scene: "WXSceneSession",
			  	    type: 0,
			  	    href: "http://www.baidu.com",
			  	    title: "来自彬哥的分享",
			  	    summary: "快跟我一起听: 网易云音乐 ",
			  	    imageUrl: "https://vi1.xiu123.cn/live/2020/07/31/01/1010v1596131911782053633_s.jpg", 
			  	    success: function (res) {
			  	        console.log("success:" + JSON.stringify(res));
			  	    },
			  	    fail: function (err) {
			  	        console.log("fail:" + JSON.stringify(err));
			  	    } 
				})
			},
			goToCreatorPage(){
				console.log(this.$data.playList.coverImgUrl)
				uni.setStorage({
					key:"creator",
					data:{
						name: this.$data.playList.name,
						url: this.$data.playList.coverImgUrl,
						des: this.$data.playList.description
					}
				})
				uni.navigateTo({
					// url: '../creator/creator?name='+this.$data.playList.name+"&url="+this.$data.playList.coverImgUrl+"&des="+this.$data.playList.description
					url: '../creator/creator'
				})
			}
		}
	}
</script>

<style scoped>
	.navBar{
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		color: white;
		position: fixed;
		top: 0;
		z-index: 100;
		width: 100vw;
		font-size: 30rpx;
	}
	.navBar .iconfont{
		position: absolute;
		font-size: 40rpx;
		left: 40rpx;
	}
	.main{
		padding-top: 450rpx;
		position: relative;
	}
	.list{
		height: 2000rpx;
		background-color: white;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
	}
	.info{
		display: flex;
		justify-content: space-evenly;
		position: absolute;
		top: 0;
		width: 100vw;
		margin-top: 20rpx;
	}
	.left{
		width: 240rpx;
		height: 240rpx;
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
	}
	.left image{
		width: 100%;
		height: 100%;
	}
	.left .icon-play1{
		position: absolute;
		top: 6rpx;
		right: 10rpx;
		color: white;
		font-size: 25rpx;
	}
	.left .icon-play1:before {
	  font-size: 20rpx;
	  margin-right: 5rpx;
	}
	.right{
		width: 400rpx;
		height: 220rpx;
	}
	.right image{
		width: 56rpx;
		height: 56rpx;
		border-radius: 50%;
		margin: 20rpx 20rpx 20rpx 0;
		vertical-align: middle;
	}
	.right .title{
		color: white;
		font-size: 34rpx;
	}
	.right .name{
		color: #eee;
		font-size: 27rpx;
	}
	.right .des{
		font-size: 25rpx;
		color: #ccc;
		/* border: 1px solid red;; */
		height: 70rpx;
		/* 控制多行溢出显示省略号 */
		overflow: hidden;
		display: -webkit-box;    
		-webkit-box-orient: vertical;    
		-webkit-line-clamp: 2;    
	}
	.right .icon-rightarrow{
		font-size: 24rpx;
	}
	.share{
		width: 350rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 35rpx;
		background-color: rgba(255,255,255,0.2);
		color: white;
		font-size: 33rpx;
		position: absolute;
		top: 320rpx;
		margin-left: 200rpx;
	}
	.icon-tubiaozhizuomoban-:before {
	  font-size: 45rpx;
	  vertical-align: bottom;
	  margin-right: 4rpx;
	}
	.playAll{
		line-height: 100rpx;
		font-size: 34rpx;
		padding-left: 30rpx;
		margin-bottom: -20rpx;
	}
	.playAll::before{
		font-size: 40rpx;
		margin-right: 30rpx;
	}
	.playAll text{
		margin-left: 10rpx;
		font-size: 27rpx;
		color: #888;
	}
</style>
