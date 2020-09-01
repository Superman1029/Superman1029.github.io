<template>
	<view class="item" @click="goToSongList">
		<view class="left">
			<image :src="itemData.coverImgUrl" mode=""></image>
			<view class="tip">{{itemData.updateFrequency}}</view>
		</view>
		<view class="right">
			<view v-for="(item,index) in itemData.tracks" :key="index">
				{{index+1}}.{{item.first}}-{{item.second}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: "index-item",
		props:["itemData"],
		methods:{
			goToSongList(){
				// console.log(this)
				uni.navigateTo({
					url:"../songList/songList?id=" + this.itemData.id
				})
			}
		}
	}
</script>

<style scoped>
	.item{
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		margin: 15rpx 0;
	}
	.left{
		position: relative;
		width: 220rpx;
		color: white;
		margin-right: 30rpx;
	}
		
	.right{
		width: 440rpx;
		line-height: 70rpx;
		color: #555555;
	}
	.right view{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.tip{
		position: absolute;
		bottom: 10rpx;
		left: 10rpx;
		font-size: 22rpx;
	}
	image{
		width: 220rpx;
		height: 220rpx;
		border-radius: 10rpx;
	}
</style>
