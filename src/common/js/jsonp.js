import originJSONP from 'jsonp'

// jsonp的封装
// url地址  data参数  option是引入的jsonp的option  详情可以从查看引入的jsonp的库的说明
export default function jsonp(url, data, option) {
  url += ((url.indexOf('?') === -1) ? '?' : '&') + param(data)
  // promise成功的调用resolve, 失败调用reject
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

//  拼接url
function param(data) {
  let url = ''
  for (let i in data) {
    let value = (data[i] !== undefined) ? data[i] : ''
    url += `&${i}=${encodeURIComponent(value)}`
  }
  // 删掉第一个 &
  return url ? url.substring(1) : ''
}
