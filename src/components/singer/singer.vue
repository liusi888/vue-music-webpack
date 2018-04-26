<template>
  <div class="singer">
    <list-view :data="singerList" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import Singer from '../../common/js/singer'
import ListView from '../../base/listview/listview.vue'
import { mapMutations } from 'vuex'
let HOT_NAME = '热门'
let HOT_SINGER_LEN = 10
export default {
  data() {
    return {
      singerList: []
    }
  },
  components: {
    ListView
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singerList = this._normalizeSinger(res.data.list)
        }
      })
    },
    //  整理歌手数据
    _normalizeSinger(list) {
      let map = {
        //  热门
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
            conId: item.Fsinger_id
          }))
        }
        //  右侧的ABC
        const key = item.Findex
        if (!map[key]) {
          map[key] = ({
            title: key,
            items: []
          })
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
          conId: item.Fsinger_id
        }))
      })
      //  为了得到有序列表，我们需要处理 map
      let hot = []
      let res = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          res.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(res)
    },
    //  跳转到歌手详情页
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.conId}`
      })
      //  提交 mutation
      this.setSinger(singer)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
