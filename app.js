import {
  tkAjax,
  tkAjaxGlobal
} from '/utils/request'
// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const token = wx.getStorageSync('token') || ''
    
    if (token) {
      this.globalData.token = token
      tkAjaxGlobal.headers['Authorization'] = token
      tkAjax.get('/wecom/getNickNamePortrait').then(({ data }) => {
        this.globalData.userInfo = data
      })
    }
    let yestYear = new Date()
    yestYear = yestYear.getFullYear()
    yestYear = yestYear - 1
    this.globalData.yestYear = yestYear
    const timeList = [{
      label: `2019-${yestYear}`,
      value: ''
    }
  ]
  let i = yestYear
  do {
    timeList.push({
      label: `${i}年`,
      value: i
    })
    i--
  } while (i >= 2019)
    this.globalData.timeList = timeList
  },
  globalData: {
    userInfo: null,
    $tkAjax: tkAjax,
    token: '',
    timeList: [],
    niand: '',
    lingy: '',
    yestYear: '',
    $tkAjaxGlobal: tkAjaxGlobal,
  }
})