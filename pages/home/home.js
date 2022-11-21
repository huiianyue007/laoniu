// pages/home/home.js
import { UnitConversion, splitK ,UnitConversion1} from '../../utils/index'
const app = getApp()
const {
  $tkAjax,
  token,
  yestYear,
} = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    autoplay: true,
    duration: 500,
    interval: 5000,
    loop: true,
    paginationPosition: 'bottom',
    navigation: {
      type: 'dots-bar'
    },
    newsList: [],
    pageForm: {
      pageSize: 4,
      pageNum: 1
    },
    total: 0,
    yestYear,
    famData: [],
    newsData: {},
    cishzzhNum: 0,
    jiazNum: 0,
    leijgyzhc: 0,
    zongzch: 0,
    marquee: {
      speed: 60,
      loop: -1,
      delay: 0,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  onLoad() {
    this.init()
    this.getData()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init();
  },
  handleRoute(e) {
    wx.navigateTo({
      url: `/pages/newsDetail/newsDetail?id=${e.currentTarget.id}`,
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

  },
  init() {
    $tkAjax.get('/getData/getNumber').then(({
      data
    }) => {
      const {
        cishzzhNum,
        jiazNum,
        leijgyzhc,
        zongzch
      } = data
      this.setData({
        cishzzhNum: cishzzhNum > 10000 ? `${UnitConversion(cishzzhNum, 10000)}W` : cishzzhNum,
        jiazNum: jiazNum > 10000 ? `${UnitConversion(jiazNum, 10000)}W`: jiazNum,
        leijgyzhc: splitK(UnitConversion1(leijgyzhc, 100000000)),
        zongzch: splitK(UnitConversion1(zongzch, 100000000))
      })
    })
    $tkAjax.get('/news/list', {
      params: {
        pageNum: 1,
        pageSize: 10
      }
    }).then(({
      rows
    }) => {
      this.setData({
        newsData: rows
      })
    })
    this.getFamData()
  },
  getMoreNewData() {
    wx.switchTab({
      url: `/pages/news/news`,
    });
  },
  getMoreFamData() {
    wx.navigateTo({
      url: '/pages/fundsOrgList/index',
    })
  },
  getFamData() {
    $tkAjax.get('/famData/list', {
      params: {
        pageSize: 3,
        pageNum: 1
      }
    }).then(({
      rows
    }) => {
      this.setData({
        famData: rows
      })
    })
  },
  getData() {
    $tkAjax.get('/news/list', {
      params: this.data.pageForm
    }).then(({
      total,
      rows
    }) => {
      const pageNum = this.data.pageForm.pageNum + 1
      this.setData({
        newsList: [...this.data.newsList, ...rows],
        total: total,
        pageForm: {
          ...this.data.pageForm,
          pageNum
        }
      })
    })
  },
  handleFamRoute(e) {
    const app = getApp()
    const {
      token
    } = app.globalData
    if (token) {
      wx.navigateTo({
        url: `/pages/fundsDetail/index?id=${e.currentTarget.id}`
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