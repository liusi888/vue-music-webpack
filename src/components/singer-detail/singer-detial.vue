<!--作者 : 刘丝
    负责 : 歌手详情页（因为歌手详情页基本类似，所以又抽象成了一个music-list的组件）
    时间 : 2018.04.11-->
<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-images="bgImages"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { ERR_OK } from '../../api/config'
import { getSingerDetail } from '../../api/singer'
import { createdSong } from '../../common/js/song'
import MusicList from '../music_list/music_list.vue'
export default {
  data() {
    return {
      songs: []
    }
  },
  components: {MusicList},
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title() {
      return this.singer.name
    },
    bgImages() {
      return this.singer.avartar
    }
  },
  methods: {
    //  歌手详情获取
    _getDetail() {
      //  判断是否在本页面刷新了，如果刷新了没有conId,让他返回歌手页面
      if (!this.singer.conId) {
        this.$router.push({
          path: '/singer'
        })
      }
      getSingerDetail(this.singer.conId).then((res) => {
        if (res.code === ERR_OK) {
          //  我们只要list里面的musicData，所以用了_normalizeSongs这个方法去处理
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    //  处理list里面的musicData
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        //  musicDate.songid 和 musicDate.albummid 是必要参数，所以先判断一下
        if (musicData.songid && musicData.albummid) {
          ret.push(createdSong(musicData))
        }
      })
      return ret
    }
  },
  created() {
    this._getDetail()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .slide-enter-active,.slide-leave-active
    transition :0.3s all
  .slide-enter,.slide-leave-to
    transform :translate3d(100%,0,0)
</style>
