<template>
	<view class="comment">
		<view class="head">
			<image class="headImg" :src="comment.user.avatarUrl" mode=""></image>
			<image class="headTip2" v-if="comment.user.userType==2" src="../../static/vip.png" mode=""></image>
			<image class="headTip4" v-if="comment.user.userType==4" src="http://p1.music.126.net/KxePid7qTvt6V2iYVy-rYQ==/109951165050882728.jpg" mode=""></image>
		</view>
		<view class="top">
			<view class="left">  
				<view class="name">{{comment.user.nickname}}</view>
				<view class="time">{{timeFilter(comment.time)}}</view>
			</view> 
			<view class="right">
				{{countFilter(comment.likedCount)}} 
				<text class=" iconfont icon-zan"></text>
			</view>
		</view> 
		<view class="bottom">
			<text v-if="comment.beReplied.length>0">回复@{{comment.beReplied[0].user.nickname}}: </text>
			<text> {{comment.content}}</text>
			<view class="replied" v-if="comment.beReplied.length>0">
				@{{comment.beReplied[0].user.nickname}}: {{comment.beReplied[0].content}}
			</view>
			<view class="hr"></view>
		</view>
	</view>
</template>

<script>
	export default{
		name: "play-comment",
		props: ["comment"],
		methods:{
			countFilter(count){
				if(count > 10000){
					count =(count / 10000).toFixed(1) + "万"
				}
				return count
			},
			timeFilter(str){
				let date = new Date(str)
				return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
			}
		}
	}
</script>

<style scoped>
	.main{
		width: 500rpx;
	}
	.top{
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin: 20rpx 0rpx;
		position: relative;
	}
	.head{
		float: left;
		width: 80rpx; height: 80rpx;
		margin-right: 26rpx;
		position: relative;
	}
	.headImg{
		width: 80rpx; height: 80rpx;
		border-radius: 40rpx;
	}
	.headTip2{
		position: absolute;
		bottom: 0;
		right: 0;
		width: 40rpx;
		height: 22rpx;
		background-color: red;
		border: 50%;
		opacity: 0.8;
		border-radius: 8rpx;
	}
	.headTip4{
		position: absolute;
		bottom: 0;
		right: 0;
		width: 32rpx;
		height: 32rpx;
		background-color: red;
		border: 50%;
		opacity: 0.7;
		border-radius: 50%
	}
	.name { 
		font-size: 27rpx;
		line-height: 40rpx;
		color: #bbb;
	}
	.time{
		font-size: 22rpx;
		line-height: 40rpx;
		color: #888;
		vertical-align: middle;
	}
	.right{
		width: 200rpx;
		white-space: nowrap;
		text-align: right;
		color: #999;
		line-height: 40rpx;
		font-size: 28rpx;
	}
	.icon-zan{
		margin-left: 10rpx;
	}
	.bottom{
		padding-left: 110rpx;
		font-size: 32rpx;
	}
	.replied{
		font-size: 30rpx;
		color: #aaa;
		margin: 10rpx 0;
		border: 1rpx solid #888;
		padding: 15rpx;
		border-radius: 6rpx;
		background-color: rgba(255,255,255,0.1);
	}
	.hr{
		height: 1rpx;
		background-color: gray;
		margin: 30rpx 0 15rpx;
	}
	
	
</style>
