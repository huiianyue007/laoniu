// pages/data/data.js
import { UnitConversion, splitK,UnitConversion1 } from '../../utils/index'
const app = getApp()
const {
  $tkAjax
} = app.globalData
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    newsList: [],
    pageForm: {
      pageSize: 4,
      pageNum: 1
    },
    total: 0,
    pageFamForm: {
      pageSize: 4,
      pageNum: 1
    },
    famTotal: 0,
    famList: [],
    cishzzhNum: 0,
    jiazNum: 0,
    leijgyzhc: 0,
    zongzch: 0
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
    this.getTabBar().init();
  },
  onLoad() {
    this.init()
    this.getFamData()
  },
  init() {
    $tkAjax.get('/getData/getNumber').then(({
      data
    }) => {
      const {
        cishzzhNum,
        jiazNum,
        leijgyzhc,
        zongzch,
        juanzshr
      } = data
      this.setData({
        cishzzhNum: cishzzhNum > 10000 ? `${UnitConversion(cishzzhNum, 10000)}W` : cishzzhNum,
        jiazNum: jiazNum > 10000 ? `${UnitConversion(jiazNum, 10000)}W`: jiazNum,
        leijgyzhc: splitK(UnitConversion1(leijgyzhc, 100000000)),
        zongzch: splitK(UnitConversion1(zongzch, 100000000)),
        juanzshr: splitK(UnitConversion1(juanzshr, 100000000))
      })
    })

    this.setData({
      pageForm: {
        ...this.data.pageForm,
        pageNum: 1
      }
    })
    this.getData()
  },
  handleTabChange(e) {
    const val = e.detail.value
    if (val == 1) {
      this.setData({
        famList: [],
        pageFamForm: {
          ...this.data.pageFamForm,
          pageNum: 1
        }
      })
      this.getFamData()
    } else if (val == 2) {
      this.setData({
        newsList: [],
        pageForm: {
          ...this.data.pageForm,
          pageNum: 1
        }
      })
      this.getData()
    }
  },
  getMoreFamData() {
    wx.navigateTo({
      url: '/pages/fundsOrgList/index',
    })
  },
  getFamData() {
    $tkAjax.get('/famData/list', {
      params: this.data.pageFamForm
    }).then(({
      total,
      rows
    }) => {
      rows = rows.map(item => ({
        ...item,
        zongzch: splitK(UnitConversion(item.zongzch, 10000))
      }))
      this.setData({
        famList: [...this.data.famList, ...rows],
        famFotal: total
      })
    })
  },
  handleFamRoute (e) {
    wx.navigateTo({
      url: `/pages/fundsDetail/index?id=${e.currentTarget.id}`
    })
  },
  handleNewsRoute (e) {
    wx.navigateTo({
      url: `/pages/orgDetail/index?id=${e.currentTarget.id}`,
    })
  },
  getMoreFamData() {
    wx.navigateTo({
      url: '/pages/fundsOrgList/index',
    })
  },
  getData() {
    $tkAjax.get('/charitOrg/list', {
      params: this.data.pageForm
    }).then(({
      total,
      rows
    }) => {
      rows = rows.map(item => ({
        ...item,
        zongzch: splitK(UnitConversion(item.zongzch, 10000))
      }))
      rows = rows.map(item => ({
        ...item,
        juanzshr: splitK(UnitConversion(item.juanzshr, 10000))
      }))
      this.setData({
        newsList: [...this.data.newsList, ...rows],
        total: total
      })
    })
  },
  // 点击默认当前标签
  getMoreFamData(e) {
    const {type} = e.target.dataset
    wx.navigateTo({
      url: `/pages/fundsOrgList/index?type=${type}`,
    })
  },
  // 
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