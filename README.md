# vue-music

> 音乐播放器

### vue开发移动端音乐WebApp
支撑层<br>
&emsp;&emsp;基础组件库<br>
&emsp;&emsp;状态管理vuex<br>
&emsp;&emsp;路由vue-router<br>
&emsp;&emsp;服务端通讯 axios&jsonp<br>
&emsp;&emsp;第三方插件<br>

工具支持<br>
&emsp;&emsp;脚手架工具vue-cli<br>
&emsp;&emsp;自动化构建工具webpack<br>
&emsp;&emsp;代码检查工具eslint<br>

### 基础知识
***
- vue-devtools的使用
- vue的生命周期
&emsp;&emsp;[https://segmentfault.com/a/1190000008010666](https://note.youdao.com/)
- promise函数
- slot插槽(把recommend的东西插入到slider里面，用到了具名插槽)

```
组件recommend（引入slider组件，并注册）
	<div v-if="recommend.length" class="slide-wrapper">
  		<slider>
			<div v-for="(item,index) in recommend" :key="index" slot="slider"></div>
        </slider>
	</div>
组件slider
	<div class="slider-group" ref="sliderGroup">
  		<slot name="slider">
  		</slot>
	</div>
```
- 监听视口大小

```
    window.addEventListener(‘resize', () => {
        //监听视口大小
    })
```
- <keep-alive>的使用

```
    // keep-alive 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。
    //组件缓存以后不会再destroyed,也不会再mounted了
    //可以使用dev-tools工具查看
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
```
- v-html和直接{{item.creator.name}}区别

```
    <h2 class="name" v-html=“item.creator.name"></h2>
    {{}} 是v-text的缩写，输出的是纯文本
    v-html 是当html标签解析后输出
```
- 如果组件A引入了组件B，组件A想要使用组件B的方法。

```
ref获取到的是这个scroll标签所指向的组件
	组件A：
		<scroll ref="scroll" class="recommend-content" :data=“discList">
		</scroll>
		this.$refs.scroll.refresh()
	组件B：
		有方法refresh
```
- 在created和在data里面去初始化一个值的区别

```
    在data里面或者是props里面初始的值，vue都会默认添加上getter和setter（添加了getter和setter的东西都会被观测，主要是跟dom做数据绑定来用的）
    而在created这个钩子函数里面，我们只是声明，
    	created() {
    		this.touch={}
    	}
```
- watch的用法

```
    data() {
    	return {
      		scrollY: -1,
      		currentIndex: 0
    	}
    },
    watch:{
        scrollY(newY) {
        	// 这个newY是scrollY的值
            console.log(newY)
        }
    }
```
- computed的用法

```
    <h1 class=“fixed-title">{{fixedTitle}}</h1>
    computed: {
       fixedTitle() {
          return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        }
    },
```
- 路由动画跳转

```
    <transition name="slide">
        <div class="singer-detail"></div>
    </transition>
```
- this.$refs.list.style.top  和 this.$refs.list.$el.style.top 有什么区别吗

```
    this.$refs.list.style.top是自己定义 自己选的
    this.$refs.list.$el.style.top是程序根据dom树找的
```
- this.$emit可以传多个值

```
    this.$emit(‘事件名字’，要传的东西)
	// this.$emit('select', item, index)
```
- vue中@select 和 :songs的区别

```
    v-bind 指令用于响应地更新 HTML 特性 形式如：v-bind:href    缩写为    :href;
	v-on 指令用于监听DOM事件 形式如：v-on:click  缩写为 @click;
	@select 是v-bind 缩写：
		<!-- 完整语法 —>
			<a v-bind:href=“url"></a>
		<!-- 缩写 —>
			<a :href=“url"></a>
	:songs 是v-on 缩写：
		<!— 完整语法 —>
			<a v-on:click=“doSomething"></a>
		<!-- 缩写 —>
			<a @click=“doSomething"></a>
```
- vue中@import 和impot的区别(好像还涉及到了es6的语法，有待考证)

```
    在js中引入直接import
		<script>
			import ‘common/stylus/index.styl’
		</script>
	在css中引入要@import
		<style>
			@import ‘common/stylus/index.styl’
		</style>
```
- vue中./components/Hello 和 @/components/Hello 的区别

```
    参考：https://segmentfault.com/q/1010000009800289
	这个跟vue没有关系
		./  是相对路径
		@/  是这是webpack设置的路径别名
```
### 新知识
***
- **router**

```
    当在入口文件main.js里面引入router以后，并且挂载在#app的实例上以后，App.vue的文件上就可以直接使用了。<router-view></router-view>
	<router-link tag="div" class="tab-item" :to="{ name: 'rank' }">
    </router-link>
	router-link  默认被渲染成a标签，tag可以更改为 什么渲染的标签
```
- **VUEX**

```
    1.把所有组件的所有状态和所有数据放在一个统一的内存空间去管理（state）；
	2.然后state的数据方便映射到组件（vue components）上，达到渲染组件；
	3.当组件的数据发生变化的时候可以dispatch一个action，然后action可以做一些异步操作（比如与后端的交互）
	4.然后commit一个mutations（mutations可以直接通过components直接修改），不过mutations是唯一一个可以修改state的途径
```
- **axios**

```
    我们可以直接get或者post，但是参数要qs一下
```
- **对象的遍历是无序的**

```
    json的结构是这样
		var a={
			"3":'第一',
			"1":'第二',
			"5":'第三',
		}
	遍历后需要按原顺序输出，但使用for in会自动排序，输出结果变成了第二 第一 第三

```
- **公共的样式**

```
    stylus里面的index.styl引入所有的公共样式，其中variable.styl是提取的字体大小和颜色的文件，然后把index.styl引入到入口文件main.js里面。我们就可以使用了
```
- **组件**

```
    引入组件使用 驼峰法 (因为被当做一个class引入)
		import MyHeader from ‘./components/my-header/MyHeader.vue'
	使用组件的时候要拆开(这也是一个书写规范)
		<my-header></my-header>
```
- **vue-devtools**

```
    vue-devtools是一款基于chrome游览器的插件,用于调试vue应用
```
- **jsonp**

```
    jsonp的原理以及实现。手写jsonp
	jsonp并不是发送的ajax请求，他是动态创建<script>标签，因为<script>标签没有同源策略的限制。当需要通讯时，本站脚本创建一个<script>元素，地址指向第三方的API网址，形如：
<script src="http://www.example.net/api?param1=1&param2=2"></script>
并提供一个callback的回调函数来接收数据（函数名可约定，或通过地址参数传递）。
第三方产生的响应为json数据的包装（故称之为jsonp，即json padding），形如：
callback({"name":"hax","gender":"Male"})
这样浏览器会调用callback函数，并传递解析后json对象作为参数。本站脚本可在callback函数里处理所传入的数据
```
#### 项目的安装和使用的技术点
***
- 安装了vue-router
- 使用了ESLint (standard)	? Vue build (Use arrow keys)

```
        选项一：Runtime + Compiler: recommended for most users
    √	选项二：Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML)are ONLY allowed in .vue files - render functions are required elsewhere
	解释：选项一：编译出来是有Runtime+Complier的编译器（在运行时编译）
    选项二：比选项一小6KB（要依赖.vue的文件开发）
```

- 单独安装了stylus模块
- 安装了vuex
- 安装了bable-runtime  用于对es的语法做转义
- 安装了fastclick  解决移动端点击延迟300毫秒的问题
- 安装了babel-polyfill 是es6的一些补丁
- 安装了一个jsonp的库，用于跨域请求数据 https://github.com/webmodules/jsonp
- 轮播图使用了better-scroll的库，重点解决移动端（已支持 PC）各种滚动场景需求的插件<br>
https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/installation.html#npm
- 安装了axios来请求接口
- 安装了vue-lazyload 用于在应用程序中加载图像的Vue模块

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
