// pages/myAttention/index.js
import { UnitConversion, splitK } from '../../utils/index'
const app = getApp()
const { $tkAjax } = app.globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList: [],
    total: 0,
    pageQuery: {
      pageNum: 1,
      pageSize: 50
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getData()
  },
  getMoreData() {
    const { pageQuery } = this.data
    this.setData({
      pageQuery: {
        ...pageQuery,
        pageNum: pageQuery.pageNum + 1
      }
    })
    this.getData()
  },
  getData() {
    const { pageQuery, newsList } = this.data
    $tkAjax.get('/user/followList', {
      params: pageQuery,
    }).then(({ rows, total }) => {
      rows = rows.map(item => ({
        ...item,
        gongyshyzhch: splitK(UnitConversion(item.gongyshyzhch, 10000))
      }))
      this.setData({
        newsList: [...newsList, ...rows],
        total
      })
    })
  },

  //列表链接
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
  onDelete(e) {
    $tkAjax.post('/user/cancelFollow', {
      jigid: e.currentTarget.id
    }).then(() => {
      let newsList = this.data.newsList
      newsList = newsList.filter(({ id }) => id != e.currentTarget.id)
      this.setData({
        newsList
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      'pageQuery': {
        pageNum: 1,
        pageSize: 50
      },
      newsList: [],
      total: 0
    })
    this.getData()
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
    this.getMoreData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})