import jsonp from '../common/js/jsonp'
import { commonParams, options } from './config'
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  //  Object.assign这个方法是合并2个参数  也就是commonParams和后面{}里面的内容，但是如果{}里面的参数和commonParams的参数有一样，那么{}里面的参数会覆盖掉commonParams里面的参数
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 5381
  })

  return jsonp(url, data, options)
}
export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    singerid: singerId,
    uin: 0,
    platform: 'h5page',
    needNewCode: 1,
    order: 'listen',
    from: 'h5',
    num: 100,
    begin: 0,
    _: 1523804629541
  })
  return jsonp(url, data, options)
}
