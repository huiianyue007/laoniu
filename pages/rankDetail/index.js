// pages/rankDetail/index.js
const app = getApp()
const { $tkAjax } = app.globalData
import { UnitConversion, splitK } from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filedData: [],
    payLabel:'',
    pageParams: {
      pageSize: 7,
      pageNum: 1
    },
    total: 0,
    lingy: '',
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ type, lingy }) {
    const { pageParams } = this.data
    this.setData({
      type,
      lingy,
      pageParams: {
        ...pageParams,
        pageNum: 1
      },
    })
    if (type === 'access') {
      wx.setNavigationBarTitle({
        title: lingy,
      })
      this.setData({
        payLabel:`${lingy}`
      })
    } else if (type === 'filed') {
       wx.setNavigationBarTitle({
        title: `${lingy}排名`,
      })
      this.setData({
        payLabel:`领域支出`
      })
    }
   
    this.getData()
  },
  getData () {
    const { type } = this.data
    if (type === 'access') {
      this.getAssetsTopData()
    
    } else if (type === 'filed') {
      this.getFieldTopData()
    }
  },
  getFieldTopData () {
    const { pageParams, filedData, lingy } = this.data
    $tkAjax.get('/top/fieldTop', {
      params: {
        lingy,
        ...pageParams
      }
    }).then(({ total, rows }) => {
      rows = rows.map(item => ({
        ...item,
        jine: splitK(UnitConversion(item.jine, 10000))
      }))
      this.setData({
        filedData: this.setIndex([...filedData, ...rows]),
        total
      })
    })
  },
  getAssetsTopData () {

    const { pageParams, filedData, lingy } = this.data
    $tkAjax.get('/top/assetsTop', {
      params: {
        fl: lingy,
        ...pageParams
      }
    }).then(({ total, rows }) => {
      rows = rows.map(item => ({
        ...item,
        jine: splitK(UnitConversion(item.jine, 10000))
      }))
      this.setData({
        filedData: this.setIndex([...filedData, ...rows]),
        total
      })
    })
  },
  setIndex(arr) {
    return arr.map((item, index) => {
      let num = index + 1
      if (num < 10) {
        num = `0${num}`
      } else {
        num = num
      }
      return {
        ...item,
        index: num
      }
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
    const { pageParams } = this.data
    this.setData({
      pageParams: {
        ...pageParams,
        pageNum: pageParams.pageNum + 1
      },
    })
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})