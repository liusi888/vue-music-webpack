// g_tk=1903152385&uin=80583600&format=json&inCharset=utf-8&outCharset=utf-8
// notice=0&platform=h5&needNewCode=1&_=1501499154367

// comminParams通用参数(共有的)
export const commonParams = {
  g_tk: 5381,
  format: 'jsonp',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0
}

// 引入的jsonp库里面的options的param参数，也就是指定回调
export const options = {
  param: 'jsonpCallback'
}

export const ERR_OK = 0
