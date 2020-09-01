<template>
	<view class="simi-box" @click="goToPlay(simiSong.id)">
		<view class="left">
			<image class="head" :src="simiSong.album.picUrl" mode=""></image>
			<view class="main">
				<view class="title">{{simiSong.name}}</view>
				<view class="info">
					<text class="tip">SQ</text>
					<text class="singer">{{simiSong.artists | singerFilter}} - {{simiSong.album.name}}</text>
				</view>
			</view> 
		</view> 
		<view class="right iconfont icon-play2"></view>
	</view>
</template>

<script>
	export default {
		name: "play-simi",
		props: ["simiSong"],
		methods:{
			// 已使用全局过滤器
			// singerFilter(array){
			// 	array = array.map(item=>{
			// 		return item.name
			// 	})
			// 	return array.join("/")
			// },
			goToPlay(id){
				this.$emit("playSimi", id)
			}
		}
	}
</script>

<style scoped>
	.simi-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 50rpx 0rpx;
		position: relative;
	}
	.head{
		float: left;
		/* margin: 0 40rpx 0 10rpx; */
		width: 80rpx; height: 80rpx;
		margin-right: 26rpx;
		border-radius: 10rpx;
	}
	.main{
		width: 640rpx;
	}
	.title, .info{ 
		font-size: 32rpx;
		line-height: 40rpx;
		width: 520rpx;
		/* border: 1px solid red; */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.tip{
		display: inline-block;
		font-size: 15rpx;
		line-height: 20rpx;
		color: red;
		border: 1rpx solid red;
		margin-right: 6rpx;
		padding: 1rpx 2rpx;
		vertical-align: middle;
	}
	
	.singer{
		font-size: 26rpx;
		color: gray;
		vertical-align: middle;
	}
	.right{
		color: #666;
		font-size: 60rpx;
	}
</style>
