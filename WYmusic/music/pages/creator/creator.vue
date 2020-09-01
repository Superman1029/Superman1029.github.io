<template>
	<view class="box" >
		<view class="bg" :style="{backgroundImage: 'url('+imageUrl+')'}"></view>
		<custom-navbar>歌单</custom-navbar>
		<view class="main">
			<view class="img">
				<image :src="imageUrl" mode=""></image>
			</view>
			<view class="name">{{name}}</view>
			<view class="hr"></view>
			<view class="tag">标签: 无</view>
			<view class="des">{{description}}</view>
		</view>
	</view>
</template>

<script>
	import customNavbar from '@/components/custom-navbar.vue'
	export default {
		data() {
			return {
				name: "",
				description: "",
				imageUrl:"",
			}
		},
		components:{
			customNavbar
		},
		onLoad: function(option){
			// console.log("load1")
			// console.log(option)
			// this.$data.name = option.name;
			// this.$data.description = option.description;
			// this.$data.imageUrl = option.url;
			uni.getStorage({
				key:"creator",
				success:res=>{
					// console.log(res)
					this.$data.name = res.data.name;
					this.$data.description = res.data.des;
					this.$data.imageUrl = res.data.url;
				}	
			})
		}
	}
</script>

<style scoped>
	.bg{
		width: 100vw;
		height: 100vh;
		background-size: 260% 150%;
		background-position: center top; 
		filter: blur(40rpx) brightness(95%);
		position: absolute;
		top: 0;
	}
	.main{
		color: white;
		position: relative;
	}
	.img{
		width: 350rpx;
		height: 350rpx;
		overflow: hidden;
		margin: 40rpx auto;
		border-radius: 10rpx;
	}
	.img image{
		width: 100%;
		height: 100%;
		filter: brightness(110%);
	}
	.name{
		text-align: center;
		font-size: 36rpx;
	}
	.hr{
		height: 1rpx;
		margin: 40rpx 0;
		background: linear-gradient(to right, #0000, #fff6, #0000);
	}
	.tag, .des{
		margin: 40rpx;
		font-size: 30rpx;
	}
		
	.des{
		font-size: 27rpx;
		line-height: 50rpx;
	}
	 
</style>
