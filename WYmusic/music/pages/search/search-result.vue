<template>
	<view class="songs">
		<view class="song" v-for="song,i in formatList" :key="i" @click="goToPlay(song.id)">
			<view class="left">
				<view class="main">
					<view class="title">
						<text v-for="text,j in song.name" :key="j" :class="text == keyword ? 'searchHigh' : '' ">{{text}}</text>
					</view>
					<view class="info">
						<text class="tip" v-if="song.copyrightId">独家</text>
						<text class="tip">SQ</text>
						<text class="singer">
							<text v-for="text,j in song.info" :key="j" :class="text == keyword ? 'searchHigh' : '' ">{{text}}</text>
						</text>
					</view>
				</view>
			</view>
			<view class="right iconfont icon-play2"></view>
			<view class="hr"></view>
		</view>
	</view>
</template>

<script>
	export default{
		name:"song-item",
		props: ["searchList", "keyword"],
		computed:{
			formatList(){
				if(!this.searchList) return []

				return this.searchList.map(song=>{
					let info = this.singerFilter(song.artists) + "-" + song.album.name;
					return {
						id: song.id,
						name: this.getInf(song.name, this.keyword),
						copyrightId: song.copyrightId,
						info: this.getInf(info, this.keyword)
					}
				})
			}
		},
		methods:{
			// 拼接不同的演唱者
			singerFilter(array){
				array = array.map(item=>{
					return item.name
				})
				return array.join("/")
			},
			// 正则匹配并格式化字符串  
			// 如  '吃了么你' 匹配 '了' ===> ['吃','了','么你']
			getInf(str, key){
				return str.replace(new RegExp(key, 'gi'), `%%${key}%%`).split('%%');
			},
			// 跳转页面
			goToPlay(id){
				// console.log("play")
				this.$store.commit("setPlayList", [])
				// 先清空播放列表,再进入播放(此时是单曲循环模式)
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
	.hr{
		position: absolute;
		bottom: -20rpx;
		width: 100%;
		height:1rpx;
		background-color: #ddd;
	}
	.searchHigh{
		color: #0099FF;
	}
</style>
