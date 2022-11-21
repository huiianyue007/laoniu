import axios from 'axios'
import settle from './settle'
import buildURL from './helpers/buildURL'
const tkAjax = axios.create({
  baseURL: 'https://laoniu.yishan.cloud',
})
const tkAjaxGlobal = tkAjax.defaults
tkAjaxGlobal.adapter = function (config) {
  return new Promise((resolve, reject) => {
    config.baseURL = (/^http|https:\\/).test(config.url) ? '' : config.baseURL
    wx.request({
      method: config.method.toUpperCase(),
      url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
      header: config.headers,
      data: config.data,
      dataType: config.dataType,
      responseType: config.responseType,
      sslVerify: false,
      complete(response) {
        response = {
          data: response.data,
          status: response.statusCode,
          errMsg: response.errMsg,
          header: response.header,
          config: config
        };
        settle(resolve, reject, response);
      }
    })
  })
}

tkAjax.interceptors.response.use(function (res) {
  if (res.data.code == 200) {
    return res.data
  } else {
    return Promise.reject(res)
  }
})
export {
  tkAjax,
  tkAjaxGlobal
}