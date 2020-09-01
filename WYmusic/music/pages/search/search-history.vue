<template>
	<view class="history" >
		<view class="history-title">历史记录</view>
		<text class="iconfont icon-delete_rubbish" @click="clearHistory"></text>
		<view class="history-item" v-for="item,i in history" :key="i" @click="getKeyword(item)">{{item}}</view>
	</view>
</template>

<script>
	export default{
		name: "search-history",
		props:["history"],
		methods:{
			// 清空历史
			clearHistory(){
				this.$emit("clear")
				uni.setStorage({
					key:"history",
					data:this.history
				})
			},
			// 点击确定搜索关键字
			getKeyword(key){
				this.$emit("getkey", key)
			}
		}
	}
</script>

<style scoped>
	.history{
		margin: 30rpx;
	}
	.history-title{
		font-size: 34rpx;
		margin-bottom: 20rpx;
	}
	.icon-delete_rubbish{
		color: #666;
		font-size: 40rpx;
		float: right;
		margin-top: -60rpx;
	}
	.history-item{
		font-size: 30rpx;
		background-color: #f6f6f6;
		display: inline-block;
		padding: 10rpx 25rpx;
		border-radius: 35rpx;
		margin: 12rpx;
	}
	
</style>
