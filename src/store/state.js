import {playMode} from '../common/js/config'
const state = {
  //  歌手的数据列表
  singer: {},
  //  播放器的状态， 停止、播放2中状态
  playing: false,
  //  播放的状态  展开和收起
  fullScreen: false,
  //  播放器的列表 有三种列表状态：顺序播放、随机播放、循环播放
  playlist: [],
  //  顺序播放的列表（如果playList是循环播放的时候，那么playlist 和 sequenceList的数据应该是一致的）
  sequenceList: [],
  //  播放状态 有三种状态：顺序播放、随机播放、循环播放
  mode: playMode.sequence,
  //  当前播放的索引
  currentIndex: -1
}

export default state
