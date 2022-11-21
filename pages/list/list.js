// pages/list/list.js
import {
  UnitConversion,
  splitK
} from '../../utils/index'
const app = getApp()
const {
  yestYear,
  $tkAjax,
  timeList
} = app.globalData
import ActionSheet, {
  ActionSheetTheme
} from 'tdesign-miniprogram/action-sheet/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filedValue: '教育',
    accessValue: '总资产',
    filedData: [],
    filedTotal: 0,
    accessData: [],
    accessTotal: 0,
    niand: '',
    niandLabel: `2019-${yestYear}`,
    handler: null,
    accessTopPageParams: {
      pageSize: 5,
      pageNum: 1
    },
    fieldTopPageParams: {
      pageSize: 5,
      pageNum: 1
    },
    loading: false,
    topLoading: false,
    areaLi: [
      // '教育',
      // '医疗卫生',
      // '文化艺术',
      // '体育',
      // '扶贫济困',
      // '生态环境',
      // '灾害救助',
      // '志愿服务',
      // '乡村振兴'
    ]
  },
  onLoad() {
    this.init()
  },
  async init() {
    try {
      this.setData({
        accessTopPageParams: {
          pageSize: 5,
          pageNum: 1
        },
        loading: true,
        topLoading: true,
        fieldTopPageParams: {
          pageSize: 5,
          pageNum: 1
        }
      })
      await Promise.all([this.getAssetsTopData(), this.getRankCategorys()])
    } finally {
      this.setData({
        loading: false,
        topLoading: false,
      })
    }
  },
  async getRankCategorys(){
    const { rows } = await $tkAjax.get('/top/getAlllingy', {
      params: {}
    })
    if(rows && rows.length){
      this.setData({
        filedValue:rows[0].lingy,
        areaLi:rows.map(v=>v.lingy)
      })
      await this.getFieldTopData()
    }
  },
  async getFieldTopData() {
    const {
      niand,
      filedValue,
      fieldTopPageParams,
      filedData
    } = this.data
    let {
      total,
      rows
    } = await $tkAjax.get('/top/fieldTop', {
      params: {
        niand,
        lingy: filedValue,
        ...fieldTopPageParams
      }
    })
    rows = rows.map(item => ({
      ...item,
      jine: splitK(UnitConversion(item.jine, 10000))
    }))
    this.setData({
      filedData: this.setIndex([...filedData, ...rows]),
      filedTotal: total
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
  async handleFiledChange(e) {
    try {
      this.setData({
        filedValue: e.detail.value,
        topLoading: true,
        filedData: [],
        fieldTopPageParams: {
          pageSize: 5,
          pageNum: 1
        }
      })
      await this.getFieldTopData()
    } finally {
      this.setData({
        topLoading: false
      })
    }
  },
  async handleAccessChange(e) {
    try {
      this.setData({
        accessValue: e.detail.value,
        accessData: [],
        loading: true,
        accessTopPageParams: {
          pageSize: 5,
          pageNum: 1
        }
      })
      await this.getAssetsTopData()
    } finally {
      this.setData({
        loading: false
      })
    }
  },
  getMoreFiledData() {
    const {
      filedValue
    } = this.data
    wx.navigateTo({
      url: `/pages/rankDetail/index?type=filed&lingy=${filedValue}`,
    })
  },
  getMoreAccessData() {
    const {
      accessValue
    } = this.data
    wx.navigateTo({
      url: `/pages/rankDetail/index?type=access&lingy=${accessValue}`,
    })
  },

  async getAssetsTopData() {
    const {
      niand,
      accessValue,
      accessTopPageParams,
      accessData
    } = this.data
    let { total,
      rows } = await $tkAjax.get('/top/assetsTop', {
      params: {
        niand,
        fl: accessValue,
        ...accessTopPageParams
      }
    })
    rows = rows.map(item => ({
      ...item,
      jine: splitK(UnitConversion(item.jine, 10000))
    }))
    this.setData({
      accessData: this.setIndex([...accessData, ...rows]),
      accessTotal: total
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
  async handleSelected(e) {
    try {
      const {
        value,
        label
      } = e.detail.selected
      this.setData({
        loading: true,
        topLoading: true,
        accessTopPageParams: {
          pageSize: 5,
          pageNum: 1
        },
        fieldTopPageParams: {
          pageSize: 5,
          pageNum: 1
        },
        filedData: [],
        filedTotal: 0,
        accessData: [],
        accessTotal: 0,
        niandLabel: label,
        niand: value
      })
      await this.getAssetsTopData()
      await this.getFieldTopData()
    } finally {
      this.setData({
        loading: false,
        topLoading: false
      })
    }
  },
  handlecancel() {
    this.data.handler.close()
  },
  handleAction() {
    const handler = ActionSheet.show({
      theme: ActionSheetTheme.List,
      selector: '#t-action-sheet',
      context: this,
      items: timeList,
    });
    this.setData({
      handler
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})