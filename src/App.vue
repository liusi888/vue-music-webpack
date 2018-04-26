<template>
  <div id="app">
    <my-header></my-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import MyHeader from './components/my-header/MyHeader.vue'
import Tab from './components/tab/tab.vue'
import player from './components/player/player.vue'
export default {
  name: 'App',
  components: {
    MyHeader,
    Tab,
    player
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "common/stylus/variable.styl" ;

</style>
