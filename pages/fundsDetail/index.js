// pages/fundsDetail/index.js
import {
  UnitConversion,
  splitK
} from '../../utils/index'
import {
  cloneDeep
} from '../../utils/util'
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
    id: '',
    tuanActiveIndex: -1,
    activeTuan: {},
    caiwndList: [],
    ywhdly: []
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
    this.setData({
      id
    })
    this.getFamData(id)
    this.getCpList(id)
    this.getEnevtList(id)
    this.getProjectList(id)
    this.getNewsList(id)
    this.getData(id)
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
  hiddenDescAll() {
    this.setData({
      showAll: false
    })
  },
  getData() {
    const {
      id
    } = this.data
    $tkAjax.get('/famData/finance', {
      params: {
        id
      }
    }).then(({
      data
    }) => {
      const {
        caiwndList,
        ywhdly
      } = data
      this.setData({
        caiwndList,
        ywhdly
      })
    })
  },
  getProjectList(id) {
    $tkAjax.get('/famData/project', {
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
          guanzhly: item.guanzhly ? item.guanzhly.split(',') : [],
          showAll: false,
          xiangmjj: item.xiangmjj.replace(/<img/g, `<img style="max-width:100%;"`)
        }))
      })
    })
  },
  handleProjectRoute(e) {
    wx.navigateTo({
      url: `/pages/projectDetail/index?id=${e.currentTarget.id}`,
    })
  },
  handleSwitchRoute(e) {
    wx.switchTab({
      url: e.currentTarget.id
    })
  },
  handleCpRoute(e) {
    wx.navigateTo({
      url: `/pages/orgDetail/index?id=${e.currentTarget.id}`,
    })
  },
  handleSelect(e) {
    const {
      tuandlist
    } = this.data.baseInfo
    const tuanActiveIndex = e.currentTarget.dataset.index
    this.setData({
      tuanActiveIndex,
      activeTuan: tuandlist[tuanActiveIndex]
    })
  },
  getEnevtList(id) {
    $tkAjax.get('/famData/payEnevtList', {
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
    $tkAjax.get('/famData/cpList', {
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
          juanzje: splitK(UnitConversion(item.juanzje))
        }))
      })
    })
  },
  getFamData(id) {
    $tkAjax.get('/famData/info', {
      params: {
        id
      }
    }).then(({
      data
    }) => {
      let zhuczj = splitK(UnitConversion(data.zhuczj, 1))
      zhuczj = zhuczj ? zhuczj + '元' : ''
      this.setData({
        baseInfo: {
          ...data,
          zhuczj,
          guanzhly: data.guanzhly ? data.guanzhly.split(',') : '',
          // yewfw: data.yewfw ? data.yewfw.split('、') : []
        }
      })
    })
  },
  handleShowTuan(e) {
    const {
      tuandlist
    } = this.data.baseInfo
    const tuanActiveIndex = e.currentTarget.dataset.index
    this.setData({
      tuanActiveIndex,
      visible: true,
      activeTuan: tuandlist[tuanActiveIndex]
    })
  },
  onVisibleChange(e) {
    this.setData({
      tuanActiveIndex: -1,
      visible: e.detail.visible,
      activeTuan: {}
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