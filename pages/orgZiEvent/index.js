// pages/payment/index.js
import { UnitConversion, splitK } from '../../utils/index'
const app = getApp()
const { $tkAjax } = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    payList: [],
    total: 0,
    pageQuery: {
      pageNum: 1,
      pageSize: 7
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ id }) {
    this.setData({
      id
    })
  },
  getData () {
    const { id, pageQuery, payList, niand, lingy } = this.data
    $tkAjax.get('/charitOrg/accEptEnevtList', {
      params: {
        id,
        ...pageQuery,
        niand,
         lingy
      }
    }).then(({ rows, total }) => {
      rows = rows.map(item => ({
        ...item,
        lingy: item.lingy ? item.lingy.split(' ') : [],
        zizhje: splitK(item.zizhje)
      }))
      this.setData({
        total,
        payList: [...payList, ...rows]
      })
    })
  },
  handleSearchRoute () {
    wx.navigateTo({
      url: '/pages/selectYear/index',
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
    const app = getApp()
    const { niand, lingy } = app.globalData
    this.setData({
      niand,
      lingy,
      payList: [],
      pageQuery: {
        pageNum: 1,
        pageSize: 7
      }
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
    const { pageQuery, total, payList } = this.data
    if (total > payList.length) {
      this.setData({
        pageQuery: {
          ...pageQuery,
          pageNum: pageQuery.pageNum + 1
        }
      })

      this.getData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})