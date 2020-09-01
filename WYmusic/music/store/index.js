// 导入模块
import Vue from 'vue'
import Vuex from 'vuex'

// 挂载到vue上即可使用
Vue.use(Vuex)

// 新建数据仓库对象并导出
export default new Vuex.Store({
  state: {
    audio: uni.getBackgroundAudioManager(),
	playList: [],
	playing: false,
	// currentTime: 0,
	currentIndex: 0,
	navHeight: 0
	
  }, 
  mutations:{
	//  更新音乐播放进度
	// setTime(state, value){
	// 	state.currentTime = value;
	// },
	// 更新当前播放列表
	setPlayList(state, value){
		state.playList = value;
	},
	// 更新播放状态  
	setPlaying(state, value){
		state.playing = value
	},
	// 更新当前播索引
	setCurrentIndex(state, value){
		state.currentIndex = value;
	},
	// 初始化顶部状态条高度
	setNavHeight(state, value){
		state.navHeight = value;
	}
  },
  actions: {
    audioPlay(store,params){
      console.log("继续")
	  store.state.audio.play();
    },
	audioPause(store,params){
	  console.log("暂停")
	  store.state.audio.pause();
	},
	audioReset(store,params){
	  console.log("重置",params.name,params.url)
	  if(store.state.audio.title == params.name) return;
	  store.state.audio.stop();
	  store.state.audio.title = params.name;
	  store.state.audio.src = params.url;
	}
	
  }
})