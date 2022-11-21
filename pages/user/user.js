// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: 'https://laoniu.yishan.cloud/static/1091665842119_.pic@2x.png',
    title: '未登录'

  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    const {
      userInfo
    } = app.globalData
    console.log(userInfo)
    if (userInfo) {
      this.setData({
        imgurl: userInfo.imgurl,
        title: userInfo.nickname
      })
    } else {
      this.setData({
        imgurl: 'https://laoniu.yishan.cloud/static/1091665842119_.pic@2x.png',
        title: '未登录'
      })
    }

    this.getTabBar().init();
  },
  login() {
    const app = getApp()
    const {
      token
    } = app.globalData
    if (!token) {
      wx.navigateTo({
        url: `/pages/auth/index`
      })
    }
  },
  handleRoute(e) {
    const app = getApp()
    const {
      token
    } = app.globalData
    if (token) {
      wx.navigateTo({
        url: e.currentTarget.id
      })
    } else {
      wx.navigateTo({
        url: `/pages/auth/index`
      })
    }
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