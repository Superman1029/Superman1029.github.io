<!-- 此公共组件已弃用 -->
<template>
	<view class="song" @click="goToPlay">
		<view class="left">
			<view class="slot"> <slot ></slot> </view>
			<view class="main">
				<view class="title">{{song.name}}</view>
				<view class="info">
					<text class="tip" v-if="song.copyright || song.copyrightId">独家</text>
					<text class="tip">SQ</text>
					<text v-if="song.ar" class="singer">{{singerFilter(song.ar)}} - {{song.al.name}}</text>
					<text v-else class="singer">{{singerFilter(song.artists)}} - {{song.album.name}}</text>
				</view>
			</view>
		</view>
		<view class="right iconfont icon-play2"></view>
		<view v-if="song.artists" class="hr"></view>
	</view>
</template>

<script>
	export default{
		name:"song-item",
		props: ["song"],
		onLoad(){
			console.log(this.song)
		},
		methods:{
			singerFilter(array){
				if(!array) return "---"
				// console.log(1,array)
				array = array.map(item=>{
					return item.name
				})
				return array.join("/")
			},
			goToPlay(){
				console.log("play")
				uni.navigateTo({
					url:"../play/play"
				})
			}
		}
	}
</script>

<style scoped>
	.song{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 50rpx 30rpx;
		position: relative;
	}
	.slot{
		font-size: 34rpx;
		float: left;
		/* background-color: red; */
		line-height: 50rpx;
		/* margin: 0 40rpx 0 10rpx; */
		width: 44rpx;
		text-align: center;
		margin-right: 26rpx;
		color: gray;
	}
	.main{
		width: 640rpx;
	}
	.title, .info{
		font-size: 34rpx;
		line-height: 40rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.tip{
		display: inline-block;
		font-size: 16rpx;
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
		color: #bbb;
		font-size: 50rpx;
	}
	.hr{
		position: absolute;
		bottom: -20rpx;
		width: 100%;
		height:1rpx;
		background-color: #ddd;
	}
</style>
