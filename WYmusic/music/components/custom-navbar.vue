<template>
	<view class="nev-box">
		<view class="navBar" :style="{paddingTop: navHeight + 'px'}">
			<view class="iconfont icon-left" @click="back"></view>
			<view class="title"><slot></slot></view>
		</view>
		<view class="nav-bg" :style="{height: navHeight + 50 + 'px'}"></view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data(){
			return{
				// navHeight : 0    // 顶部状态条高度
			}
		},
		// uniapp组件生命周期与vue的生命周期相同
		created() {
			// 获取顶部状态条高度(已移入状态管理)
			// uni.getSystemInfo({
			// 	success:res=>{
			// 		// console.log(res.statusBarHeight)
			// 		this.navHeight = res.statusBarHeight
			// 	}
			// })
		},
		computed:{
			...mapState(["navHeight"])
		},
		methods: {
			back(){
				uni.navigateBack()
			},
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
	.iconfont{
		position: absolute;
		font-size: 40rpx;
		left: 40rpx;
	}
	.title{
		display: inline-block;
		width: 500rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
