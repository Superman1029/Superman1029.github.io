<template>
	<view class="song" @click="goToPlay(song.id)">
		<view class="left">
			<view class="slot"> <slot ></slot> </view>
			<view class="main">
				<view class="title">{{song.name}}</view>
				<view class="info">
					<text class="tip" v-if="!song.copyright">独家</text>
					<text class="tip">SQ</text>
					<text class="singer">{{song.ar | singerFilter}} - {{song.al.name}}</text>
				</view>
			</view>
		</view>
		<view class="right iconfont icon-play2"></view>
	</view>
</template>

<script>
	export default{
		name:"song-item",
		props: ["song","index"],
		methods:{
			// singerFilter(array){
			// 	array = array.map(item=>{
			// 		return item.name
			// 	})
			// 	return array.join("/")
			// },
			goToPlay(id){
				this.$store.commit("setCurrentIndex", this.index)
				uni.navigateTo({
					url:"../play/play?id="+id
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
</style>
