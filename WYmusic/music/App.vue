<script>
	import {mapState} from 'vuex'
	export default {
		onLaunch: function() {
			console.log(0,this.audio)
			
			// 获取顶部状态条高度
			uni.getSystemInfo({
				success:res=>{
					// console.log(res.statusBarHeight)
					this.$store.commit("setNavHeight", res.statusBarHeight)
				}
			})
			
			 
			// 可播放监听
			this.audio.onCanplay(()=>{ 
				console.log("canplay")
				this.$store.commit("setPlaying", true);
			})
			// 程序启动时开始监听音乐播放进度(小程序环境正常,安卓环境可能检测不到)
			this.audio.onTimeUpdate(()=>{ 
				// console.log(this.audio.currentTime)
				// 更新状态仓库的进度值 
				// this.$store.commit("setTime", this.audio.currentTime)
			})
			
			// 监听播放结束
			this.audio.onEnded(()=>{
				console.log("end")
				this.$store.commit("setPlaying", false);
				// 更新播放索引
				if(this.playList.length > 0 ){
					if(this.currentIndex == this.playList.length-1){
						this.$store.commit("setCurrentIndex", 0)
						console.log(1)
					}else{
						this.$store.commit("setCurrentIndex", this.currentIndex+1)
						console.log(2)
					}
				}else{
					console.log(3)
					this.audio.seek(0)
					this.audio.play()
					this.$store.commit("setPlaying", true);
				}
			})
			
			
			// // #ifndef APP-PLUS
			// var g_wakelock = null;
			// //允许程序后台运行 
			// function wakeLock() {   
			//     //Android  
			//     var main = plus.android.runtimeMainActivity();  
			//     var Context = plus.android.importClass("android.content.Context");  
			//     var PowerManager = plus.android.importClass("android.os.PowerManager");  
			//     var pm = main.getSystemService(Context.POWER_SERVICE);  
			//     g_wakelock = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "ANY_NAME");  
			//     g_wakelock.acquire();  
			// } 
			// // #endif
		},
		onShow: function() {
			// console.log('App Show')
			// console.log(1,this.audio)
		},
		onHide: function() {
			// console.log('App Hide')
		},
		computed:{
			...mapState(['audio',"playList","playing","currentIndex"])
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./utils/iconfont.css");
</style>
