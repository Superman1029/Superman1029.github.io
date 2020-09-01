// 这个文件用于封装所有的ajax请求

const baseUrl = "http://peaces.club:3000"

// 使用promise封装的基础ajax请求
function ajaxAction(path, params={}, type="GET"){
	uni.showLoading({
		title:"正在加载..."
	})
	return new Promise(function(resolve, reject){
		uni.request({
			url: baseUrl + path,
			method: type,
			data: params,
			success: (res)=> {
				resolve(res.data)
				uni.hideLoading()
			}
		})
	})
}

// 请求首页所有榜单内容摘要
function getAllList(params){
	return ajaxAction("/toplist/detail")
}
// 根据榜单id获取歌单列表
function getPlayList(params){
	return ajaxAction("/playlist/detail",params)
}
// 请求热搜列表
function getHotSearchList(params){
	return ajaxAction("/search/hot/detail")
}
// 请求搜索建议
function getSearchSuggest(params){
	return ajaxAction("/search/suggest", params)
}
// 执行搜索
function getSearchResult(params){
	return ajaxAction("/search", params)
}
// 获取歌曲详情
function getSongDetail(params){
	return ajaxAction("/song/detail", params)
}
// 获取歌曲url
function getSongUrl(params){
	return ajaxAction("/song/url", params)
}
// 获取歌词
function getSongLyric(params){
	return ajaxAction("/lyric", params)
}
// 获取相似音乐
function getSimiSong(params){
	return ajaxAction("/simi/song", params)
}
// 获取歌曲评论
function getComment(params){
	return ajaxAction("/comment/music", params)
}
		
//导出ajax请求函数 
export {
	getAllList,
	getPlayList,
	getHotSearchList,
	getSearchSuggest,
	getSearchResult,
	getSongDetail,
	getSongUrl,
	getSongLyric,
	getSimiSong,
	getComment
}