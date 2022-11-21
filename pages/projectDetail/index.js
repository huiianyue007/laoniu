import {
  UnitConversion,
  splitK
} from '../../utils/index'
// pages/projectDetail/index.js
const app = getApp()
const {
  $tkAjax
} = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({
    id
  }) {
    $tkAjax.get('https://laoniu.yishan.cloud/project/info', {
      params: {
        xmid: id
      }
    }).then(({
      data
    }) => {
      this.setData({
        baseInfo: {
          ...data,
          guanzhly: data.guanzhly ? data.guanzhly.split(',') : [],
          niandzhch: data.niandzhch ? splitK(UnitConversion(data.niandzhch, 2)) : '',
          niandshr: data.niandshr ? splitK(UnitConversion(data.niandshr, 2)) : '',
          xiangmjj: data.xiangmjj && data.xiangmjj.replace(/<img/g, `<img style="max-width:100%;"`)
        }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})