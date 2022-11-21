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
    active: null,
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
    keywords,
    active
  }) {
    this.setData({
      value: keywords || '',
      active: active || '0'
    })
    this.init(this.data.value)
  },
  handleChangeTab(e) {
    this.setData({
      active: e.detail.value
    })
    this.init(this.data.value)
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
        dataList: [],
        pageQuery: {
          pageNum: 1,
          pageSize: 10
        },
        loading: true,
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
  getMoredata() {
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
  async getProjectData() {
    const {
      pageQuery,
      value,
      dataList
    } = this.data
    let {
      rows,
      total
    } = await $tkAjax.get('/project/list', {
      params: {
        ...pageQuery,
        search: value
      }
    })
    rows = rows.map(item => ({
      ...item,
      // guanzhly : item.guanzhly != null && item.guanzhly != '' ? item.guanzhly.split(",") : [] 
      guanzhly: item.guanzhly ? item.guanzhly.split(',') : [],
    }))
    this.setData({
      dataList: [...dataList, ...rows],
      total: total
    })
  },
  async getNewsData() {
    const {
      pageQuery,
      value,
      dataList
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
      dataList: [...dataList, ...rows],
      total: total
    })
  },
  async getCharitOrgData() {
    // https://laoniu.yishan.cloud/charitOrg/list
    const {
      pageQuery,
      value,
      dataList
    } = this.data
    let {
      rows,
      total
    } = await $tkAjax.get('/charitOrg/list', {
      params: {
        ...pageQuery,
        search: value
      }
    })
    rows = rows.map(item => ({
      ...item,
      juanzshr: splitK(UnitConversion(item.juanzshr, 10000))
    }))
    this.setData({
      dataList: [...dataList, ...rows],
      total: total,
    })
  },
  async getFamData() {
    const {
      pageQuery,
      value,
      dataList
    } = this.data
    let {
      rows,
      total
    } = await $tkAjax.get('/famData/list', {
      params: {
        ...pageQuery,
        search: value
      }
    })
    rows = rows.map(item => ({
      ...item,
      juanzshr: splitK(UnitConversion(item.juanzshr, 10000)),
      zongzch: splitK(UnitConversion(item.zongzch, 10000))
    }))
    this.setData({
      dataList: [...dataList, ...rows],
      total: total
    })
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
  handlezixunRoute(e) {
    wx.navigateTo({
      url: `/pages/newsDetail/newsDetail?id=${e.currentTarget.id}`,
    })
  },
  handleProjectRoute(e) {
    wx.navigateTo({
      url: `/pages/projectDetail/index?id=${e.currentTarget.id}`,
    })
  },
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
    this.getMoredata()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})