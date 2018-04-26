import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
var axios = require('axios')
/**
 * jsonp 抓取推荐页轮播图数据
 * 接口：https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
 * getRecommend又把jsonp  expotrt出去了，因为jsonp export出来的本来就是一个promise函数，也就是说getRecommend函数export出去了一个promise且能跨域请求的函数
 */
export function getRecommend() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  //  assign是es6的一个方法，用于对象的合并
  let data = Object.assign({}, commonParams, {
    //  这里面是自有的一些参数
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  // 其实return出去的是一个promise函数
  return jsonp(url, data, options)
}

/**
 * axios 抓取推荐页列表数据
 * 接口：https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg
 * 接口提供方使用了 referer:https://y.qq.com/portal/playlist.html
 * axios 结合 node.js 代理后端请求
 */
export function getDiscList() {
  //  这个url请求的是 build-webpack.dev.config.js里面的方法
  const url = '/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
