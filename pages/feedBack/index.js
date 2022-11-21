// pages/feedBack/index.js
const app = getApp()
const {
  $tkAjax
} = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    biaot: '',
    yijlx: '请选择意见类型',
    yijnr: '',
    youxdzh: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({
    feedType
  }) {
    if (feedType) {
      this.setData({
        yijlx: feedType
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
  onInput(e) {
    this.setData({
      [e.target.dataset.id]: e.detail.value
    })
  },
  handleSubmit() {
    const {
      biaot,
      yijlx,
      yijnr,
      youxdzh
    } = this.data
    $tkAjax.post('/user/opinion', {
      biaot,
      yijlx: yijlx === '请选择意见类型' ? '' : yijlx,
      yijnr,
      youxdzh
    }).then(() => {
      wx.navigateBack()
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})