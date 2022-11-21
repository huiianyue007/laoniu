import {
  UnitConversion,
  splitK
} from '../../utils/index'
const app = getApp()
const {
  $tkAjax
} = app.globalData
// pages/searchResult/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    dataList: [],
    search: '',
    active: '0',
    total: 0,
    pageQuery: {
      pageNum: 1,
      pageSize: 10
    },
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({
    lingy,
    sheng
  }) {
    this.setData({
      lingy,
      sheng
    })
    this.init()
  },
  handleChangeTab(e) {
    const val = e.detail.value
    if (val == 3) {
      const {
        lingy,
        sheng
      } = this.data
      if (lingy && sheng) {
        wx.redirectTo({
          url: `/pages/screenFunds/index?lingy=${lingy}&sheng=${sheng}`,
        })
      } else if (lingy) {
        wx.redirectTo({
          url: `/pages/screenFunds/index?lingy=${lingy}`,
        })
      } else if (sheng) {
        wx.redirectTo({
          url: `/pages/screenFunds/index?sheng=${sheng}`,
        })
      } else {
        wx.redirectTo({
          url: `/pages/screenFunds/index`,
        })
      }

    } else {
      this.setData({
        active: val,
        dataList: []
      })
      this.init(this.data.value)
    }

  },
  handleRoute(e) {
    const {
      url,
      id
    } = e.currentTarget.dataset
    const app = getApp()
    const {
      token
    } = app.globalData
    if (token) {
      wx.navigateTo({
        url: `/pages/${url}/index?id=${id}`
      })
    } else {
      wx.navigateTo({
        url: `/pages/auth/index`
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  handleSubmit(e) {
    this.setData({
      value: e.detail.value
    })
    this.init(this.data.value)
  },
  async init(value = '') {
    try {
      this.setData({
        loading: true
      })
      this.setData({
        dataList: [],
        pageQuery: {
          pageNum: 1,
          pageSize: 10
        },
        value
      })
      await this.getData()
    } finally {
      this.setData({
        loading: false
      })
    }
  },

  async getData() {
    const {
      active
    } = this.data
    if (active == '0') {
      await this.getFamData()
    } else if (active == '1') {
      await this.getCharitOrgData()
    } else if (active == '2') {
      await this.getNewsData()
    } else if (active == '3') {
      await this.getProjectData()
    }
  },
  async getProjectData() {
    const {
      pageQuery,
      value,
      dataList
    } = this.data
    const {
      rows,
      total
    } = await $tkAjax.get('/project/list', {
      params: {
        ...pageQuery,
        search: value
      }
    })
    this.setData({
      dataList: [...dataList, ...rows],
      total: total
    })
  },
  async getNewsData() {
    const {
      pageQuery,
      value
    } = this.data
    const {
      rows,
      total
    } = await $tkAjax.get('/news/list', {
      params: {
        ...pageQuery,
        search: value
      }
    })
    this.setData({
      dataList: rows,
      total: total
    })
  },
  async getCharitOrgData() {
    // https://laoniu.yishan.cloud/charitOrg/list
    const {
      pageQuery,
      value,
      lingy,
      sheng,
      dataList
    } = this.data
    let {
      rows,
      total
    } = await $tkAjax.get('/charitOrg/searchList', {
      params: {
        ...pageQuery,
        search: value,
        lingy,
        sheng
      }
    })
    rows = rows.map(item => ({
      ...item,
      juanzshr: splitK(UnitConversion(item.juanzshr, 10000))
    }))
    this.setData({
      dataList: [...dataList, ...rows],
      total: total
    })
  },
  async getFamData() {
    const {
      pageQuery,
      value,
      lingy,
      sheng,
      dataList
    } = this.data
    let {
      rows,
      total
    } = await $tkAjax.get('/famData/searchList', {
      params: {
        ...pageQuery,
        lingy,
        sheng,
        search: value
      }
    })
    rows = rows.map(item => ({
      ...item,
      gongyshyzhch: splitK(UnitConversion(item.gongyshyzhch, 10000))
    }))
    this.setData({
      dataList: [...dataList, ...rows],
      total: total
    })
  },
  // 点击默认当前标签
  onLoad({
    type,
    lingy,
    sheng
  }) {
    this.setData({
      active: type || '0',
      lingy,
      sheng
    })
    this.init()
  },
  // 结束
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    const {
      pageQuery
    } = this.data
    this.setData({
      pageQuery: {
        ...pageQuery,
        pageNum: pageQuery.pageNum + 1,
      }
    })
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})