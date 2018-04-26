//  通常我们会用getter来取state里面的数据,state里面所有的数据都是基础数据。但凡要修改都要在getter里面进行获取
export const singer = state => state.singer
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
// 当前的歌曲
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
