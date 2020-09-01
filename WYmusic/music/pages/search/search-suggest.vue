<template>
	<view class="suggest">
		<view class="title" @click="getKeyword(keyword)">
			搜索"{{keyword}}"
		</view>
		<view class="suggeat-item " v-for="item,index in suggestList" :key="index" @click="getKeyword(item.keyword)">
			<text class="iconfont icon-search1187938easyiconnet"></text>
			{{item.keyword}}
		</view>
	</view>
</template>

<script>
	export default{
		name: "search-suggest",
		props:["suggestList", "keyword"],
		methods:{
			// 点击确定搜索关键字
			getKeyword(key){
				this.$emit("getkey", key)
			}
		}
	}
</script>

<style scoped>
	.suggest{
		margin:  0 50rpx;
		line-height: 100rpx;
	}
	.title{
		color: #007AFF;
		font-size: 33rpx;
	}
	.iconfont{
		color: gray;
		margin-right: 20rpx;
	}
	.suggeat-item{
		font-size: 33rpx;
		color: #555;
	}
</style>
