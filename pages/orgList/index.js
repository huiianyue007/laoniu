// pages/orgList/index.js
const app = getApp()
const { $tkAjax } = app.globalData
import { UnitConversion, splitK } from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    orgList: [],
    pageQuery: {
      pageNum: 1,
      pageSize: 7
    },
    title: '',
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ id, title }) {
    this.setData({
      id,
      title
    })
    this.getData()
  },
  getData () {
    const { id, pageQuery, orgList } = this.data
    $tkAjax.get('/famData/cpList', {
      params: {
        id,
        ...pageQuery
      }
    }).then(({ rows, total }) => {
      rows = rows.map(item => ({
        ...item,
        juanzje: splitK(UnitConversion(item.juanzje))
      }))
      this.setData({
        total,
        orgList: [...orgList, ...rows]
      })
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
    const { pageQuery, total, orgList } = this.data
    if (total > orgList.length) {
      this.setData({
        pageQuery: {
          ...pageQuery,
          pageNum: pageQuery.pageNum + 1
        }
      })

      this.getData()
    }
  },
  handleRoute (e) {
    const app = getApp()
    const {
      token
    } = app.globalData
    if (token) {
      wx.navigateTo({
        url: `/pages/orgDetail/index?id=${e.currentTarget.id}`,
      })
    } else {
      wx.navigateTo({
        url: `/pages/auth/index`
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})