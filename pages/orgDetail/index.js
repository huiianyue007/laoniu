// pages/fundsDetail/index.js
import { UnitConversion, splitK } from '../../utils/index'
const app = getApp()
const {
  $tkAjax
} = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseInfo: {},
    cpList: [],
    enevtList: [],
    projectList: [],
    newsList: [],
    showAll: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({
    id
  }) {
    const app = getApp()
    app.globalData.lingy = ''
    app.globalData.niand = ''
    this.getFamData(id)
    this.getCpList(id)
    this.getEnevtList(id)
    this.getProjectList(id)
    this.getNewsList(id)
  },
  getNewsList(id) {
    $tkAjax.get('/famData/news', {
      params: {
        id,
        pageNum: 1,
        pageSize: 2
      }
    }).then(({
      rows
    }) => {
      this.setData({
        newsList: rows
      })
    })
  },
  showDescAll() {
    this.setData({
      showAll: true
    })
  },
  hiddenDescAll () {
    this.setData({
      showAll: false
    })
  },
  getProjectList(id) {
    $tkAjax.get('/charitOrg/project', {
      params: {
        id,
        pageNum: 1,
        pageSize: 2
      }
    }).then(({
      rows
    }) => {
      this.setData({
        projectList: rows.map((item) => ({
          ...item,
          guanzhly: item.guanzhly ? item.guanzhly.split(','): [],
          showAll: false,
          xiangmjj: item.xiangmjj && item.xiangmjj.replace(/<img/g, `<img style="max-width:100%;"`)
        }))
      })
    })
  },
  handleCpRoute(e) {
    wx.navigateTo({
      url: `/pages/fundsDetail/index?id=${e.currentTarget.id}`,
    })
  },
  handleProjectRoute(e) {
    wx.navigateTo({
      url: `/pages/projectDetail/index?id=${e.currentTarget.id}`,
    })
  },
  getEnevtList(id) {
    $tkAjax.get('/charitOrg/accEptEnevtList', {
      params: {
        id,
        pageNum: 1,
        pageSize: 2
      }
    }).then(({
      rows
    }) => {
      this.setData({
        enevtList: rows.map(item => ({
          ...item,
          zizhje: splitK(UnitConversion(item.zizhje))
        }))
      })
    })
  },
  getCpList(id) {
    $tkAjax.get('/charitOrg/cpList', {
      params: {
        id,
        pageNum: 1,
        pageSize: 2
      }
    }).then(({
      rows
    }) => {
      this.setData({
        cpList: rows.map(item => ({
          ...item,
          juanzje: splitK(item.juanzje)
        }))
      })
    })
  },
  getFamData(id) {
    $tkAjax.get('/charitOrg/info', {
      params: {
        id
      }
    }).then(({
      data
    }) => {
      this.setData({
        baseInfo: {
          ...data,
          guanzhly: data.guanzhly ? data.guanzhly.split(',') : '',
          // yewfw: data.yewfw ? data.yewfw.split(',') : ''
        }
      })
    })
  },
  handleRoute(e) {
    wx.navigateTo({
      url: e.currentTarget.id,
    })
  },
  handleSubmit() {
    $tkAjax.post('/user/addFollow', {
      jigid: this.data.baseInfo.id
    }).then(() => {
      return this.getFamData(this.data.baseInfo.id)
    })
  },
  handleNoSubmit() {
    $tkAjax.post('/user/cancelFollow', {
      jigid: this.data.baseInfo.id
    }).then(() => {
      return this.getFamData(this.data.baseInfo.id)
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})