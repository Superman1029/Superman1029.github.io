<template>
	<view class="search-box">
		<!-- 搜索框 -->
		<view class="search-input iconfont icon-search1187938easyiconnet" >
			<input type="text" placeholder="搜索歌曲" @confirm="search" v-model="keyword" @input="searchInput" @focus="searchInput" confirm-type="search" />
			<text class="iconfont icon-close" v-if="keyword" @click.stop="keyword='' ,searchResult=null"></text>
		</view>
		
		<!-- 历史记录 -->
		<search-history v-if="history.length>0 && !keyword" :history="history" @getkey="getKey" @clear="history=[]"></search-history>
		
		<!-- 热搜榜 -->
		<search-hot v-if="!keyword" :hotList="hotList" @getkey="getKey"></search-hot>
		
		<!-- 搜索建议列表 -->
		<search-suggest v-if="keyword && !searchList" :keyword="keyword" :suggestList="suggestList" @getkey="getKey"></search-suggest>
		
		<!-- 搜索结果列表 -->
		<search-result :searchList="searchList" :keyword="keyword"></search-result>
		
	</view>
</template>

<script>
	import {getHotSearchList, getSearchSuggest, getSearchResult} from "@/tools/ajax.js"
	import searchHistory from "./search-history.vue"
	import searchHot from "./search-hot.vue"
	import searchSuggest from "./search-suggest.vue"
	import searchResult from "./search-result.vue"
	export default {
		data() {
			return {
				keyword: "",   	//搜索关键字
				history: [],	//搜索历史
				hotList: [],	//热搜列表
				suggestList:[],	//搜索建议列表
				searchList:null	//搜索结果列表
			}
		},
		onLoad() {
			// 读取搜索记录
			uni.getStorage({
				key:"history",
				success:res=>{
					// console.log(res.data)
					this.history = res.data
				}
			})
			// 请求热搜榜
			getHotSearchList().then(res=>{
				// console.log(res)
				this.hotList = res.data
			})
		},
		components:{
			searchHistory,
			searchHot,
			searchSuggest,
			searchResult
		},
		// 触底
		onReachBottom(){
			console.log("触底")
			if(this.searchList){
				// 如果有搜索内容,就加载更多
				getSearchResult({
					keywords: this.keyword,
					offset: this.searchList.length
				}).then(res=>{
					// console.log(res.result)
					if(res.result.songs){
						this.searchList = this.searchList.concat(res.result.songs) 
						
					}else{
						uni.showToast({
							title:"没有更多了",
							icon:"none"
						})
					}
					
					
				})
			}
		},
		methods: {
			// 输入搜索关键字, 获取搜索建议
			searchInput(){
				if(!this.keyword) return;
				this.searchList = null;
				getSearchSuggest({
					keywords: this.keyword,
					type: "mobile"
				}).then(res=>{
					// console.log(res)
					this.suggestList = res.result.allMatch
				})
			},
			// 获取搜索关键字
			getKey(key){
				this.keyword = key
				this.search()
			},
			// 开始搜索
			search(){
				if(this.keyword.length <= 0) return;
				// 执行搜索
				getSearchResult({
					keywords: this.keyword
				}).then(res=>{
					// console.log(res.result.songs)
					this.searchList = res.result.songs
				})
				
				// 添加历史记录
				let index = this.history.indexOf(this.keyword)
				if(index >= 0){ 
					this.history.splice(index,1)
				}
				this.history.unshift(this.keyword)
				if(this.history.length > 8){
					this.history = this.history.slice(0,8)
				}
				uni.setStorage({
					key:"history",
					data:this.history
				})
			}
		}
	}
</script>

<style scoped>
	.search-input {
		border: 1rpx solid #f3f3f3;
		background-color: #f8f8f8;
		border-radius: 35rpx;
		line-height: 70rpx;
		height: 70rpx;
		width: 680rpx;
		margin: 35rpx 35rpx 15rpx;
		color: #888;
		padding-left: 25rpx;
		box-sizing: border-box;
	}
	.search-input::before{
		font-size: 30rpx;
	}
	.search-input input{
		width: 560rpx;
		display: inline-block;
		vertical-align: middle;
		height: 70rpx;
		line-height: 70rpx;
		padding-left: 20rpx;
		font-size: 30rpx;
		color: black;
		box-sizing: border-box;
		padding-bottom: 5rpx;
	}

</style>
