<template>
	<view class="content">
		<view class="search iconfont icon-search1187938easyiconnet" @click="goToSearch">
			 <text>搜索歌曲</text>
		</view>
		<index-item v-for="item in topListDetail" :key="item.id" :itemData="item"></index-item>
	</view>
</template>

<script>
	// 数据请求函数
	import {getAllList} from "@/tools/ajax.js"
	// 子组件
	import indexItem from "./index-item.vue"
	// 当前组件配置
	export default {
		data() {
			return {
				// 前4种榜单及摘要数据
				topListDetail: []
			}
		},
		components:{
			indexItem
		},
		onLoad() {
			// 请求所有榜单
			getAllList().then(res=>{
				// console.log(res.list)
				if(res.list.length > 0){
					this.topListDetail = res.list.slice(0,4);
				}
				// console.log(this.topListDetail)
			})

		},
		methods: {
			// 去搜索页
			goToSearch(){
				uni.navigateTo({
					url:"../search/search"
				})
			}
				
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.search {
		border: 1rpx solid #f3f3f3;
		background-color: #f8f8f8;
		border-radius: 35rpx;
		line-height: 70rpx;
		width: 680rpx;
		margin: 35rpx 35rpx 15rpx;
		color: #888;
		padding-left: 25rpx;
		box-sizing: border-box;
		font-size: 30rpx;
	}
	.search::before{
		position: relative;
		left: -3rpx;
		top: 2rpx;
		
	}
	.search text {
		padding-left: 20rpx;
	}
		
</style>
