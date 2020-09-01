<template>
	<view class="hot">
		<view class="hot-title">热搜榜</view>
		<view class="hot-item" v-for="item,index in hotList" :key="index" @click="getKeyword(item.searchWord)">
			<view class="index" :class="index < 3 ? 'top': '' " >
				{{index+1}}
			</view>
			<view class="main">
				<text>{{item.searchWord}}</text>
				<image :src="item.iconUrl" mode="aspectFit"></image>
				<view>{{item.content}}</view>
			</view>
			<view class="score">
				{{item.score}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "searchHotItem",
		props:["hotList"],
		methods:{
			// 点击确定搜索关键字
			getKeyword(key){
				this.$emit("getkey", key)
			}
		}
	}
</script>

<style scoped>
	.hot{
		padding: 30rpx;
	}
	.hot-title{
		font-size: 34rpx;
	}
	.hot-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 30rpx 0 50rpx;
	}
	.index{
		width: 40rpx;
		text-align: center;
		color: gray;
		font-size: 32rpx;
	}
	.top{
		color: red;
	}
	.main{
		width: 500rpx;
	}
	.main text{
		font-size: 34rpx;
		margin-right: 10rpx;
	}
	.main image{
		height: 30rpx;
		width: 60rpx;
	}
	.main view{
		font-size: 28rpx;
		color: #888;
		margin-top: 6rpx;
	}
	.score{
		font-size: 26rpx;
		color: #bbb;
	}
</style>
