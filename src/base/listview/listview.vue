<!--作者 : 刘丝
    负责 :
    时间 : 2018.04.08-->
<template>
  <Scroll class="listview"
          :data="data"
          ref="listview"
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll="scroll"
  >
    <ul>
      <!--左侧列表-->
      <li class="list-group" v-for="(group, index) in data" :key="index" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(i)" class="list-group-item" v-for="(i, key) in group.items" :key="key">
            <img class="avatar" v-lazy="i.avartar" />
            <span class="name">{{i.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!--这个地方的touchstart不是vue内部封装的，而是自己手写的方法；prevent是阻止事件冒泡-->
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <!--右侧列表-->
        <li v-for="(item, index) in shortcutList"
            :data-index="index"
            :key="index"
            :class="{'current':currentIndex === index}"
            class="item"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <div v-show="!data.length" class="loading-container">
      <Loading></Loading>
    </div>
  </Scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from '../scroll/scroll.vue'
import Loading from '../../base/loading/loading.vue'
import {getDate} from '../../common/js/dom'
//  这个高度是右侧每个字母的高度
const ANCHOR_HEIGHT = 18
//  这个高度是每个标题的高度
const TITLE_HEIGHT = 30
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      //  diff，右侧本来的标题 和 固定在顶部的标题 的距离
      diff: -1
    }
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    onShortcutTouchStart(element) {
      let anchorIndex = getDate(element.target, 'index')
      //  console.log(anchorIndex) 下标
      //  得到开始的Y的位置
      let firstTouch = element.touches[0]
      this.touch.y1 = firstTouch.pageY
      //  得到开始下标
      this.touch.anchorIndex = anchorIndex
      //  scrollToElement(el, time, offsetX, offsetY, easing)
      this._scrollTo(anchorIndex, 0)
    },
    //  触摸右侧的字母的时候，也能滑动到指定位置
    onShortcutTouchMove(element) {
      //  得到结束的Y的位置
      let firstTouch = element.touches[0]
      this.touch.y2 = firstTouch.pageY
      // delDa是走了几个字母
      let delDa = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      //  得到结束下标
      let anchorIndex = parseInt(this.touch.anchorIndex) + delDa
      this._scrollTo(anchorIndex, 0)
    },
    //  查看左侧滚动的位置
    scroll(pos) {
      this.scrollY = pos.y
    },
    //  封装滚动到哪了 方法
    _scrollTo(index) {
      //  判断点击右侧的最上面和最下面的边界值值
      if (!index && index !== 0) {
        return
      }
      //  判断触摸右侧的最上面和最下面的边界值值
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    //  计算左侧每个group的高度
    _calculateHeight() {
      // this.listHeight放的是左侧每个group的高度
      this.listHeight = []
      let list = this.$refs.listGroup
      let height = 0
      //  this.listHeight放的内容都是正值
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    //  跳转歌手详情页
    selectItem(item) {
      this.$emit('select', item)
    }
  },
  watch: {
    //  观测传给listview data的变化（也就是props里面的data数据）
    data() {
      //  数据的变化再渲染到dom上，有延迟。所以我们用了定时器
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      //  当newY滚动到顶部的时候
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      //  当newY滚动到中间部分的时候
      const height = this.listHeight
      //  height [0,10,20,30,40]
      //           热 A B C D
      for (let i = 0; i < height.length - 1; i++) {
        let height1 = height[i] // 高度10
        let height2 = height[i + 1] // 高度20
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = height.length - 2
    },
    diff(newVal) {
      let fixTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixTop === fixTop) {
        return
      }
      this.fixTop = fixTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixTop}px,0)`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
