// pages/financialData/index.js
const app = getApp()
const {
  $tkAjax
} = app.globalData
import ActionSheet, { ActionSheetTheme } from 'tdesign-miniprogram/action-sheet/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    niand: '',
    niandLabel: '全部时间',
    id: '',
    financeData: {},
    caiwndList: [],
    ywhdly: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({
    id
  }) {
    this.setData({
      id
    })
    this.getData()

  },
  getData() {
    const {
      id,
      niand
    } = this.data
    $tkAjax.get('/famData/finance', {
      params: {
        id,
        niand
      }
    }).then(({
      data
    }) => {
      const {
        zongzch,
        jingzch,
        shourhj,
        zhichhj,
        juanzshr,
        guanly,
        gongyshyzhch,
        touzshy,
        caiwndList,
        ywhdly
      } = data
      this.setData({
        financeData: {
          zongzch: this.splitK((zongzch || 0)/ 10000),
          jingzch: this.splitK((jingzch || 0)/ 10000),
          shourhj: this.splitK((shourhj || 0)/ 10000),
          zhichhj: this.splitK((zhichhj || 0)/ 10000),
          juanzshr: this.splitK((juanzshr || 0)/ 10000),
          guanly: this.splitK((guanly || 0)/ 10000),
          gongyshyzhch: this.splitK((gongyshyzhch || 0)/ 10000),
          touzshy: this.splitK((touzshy || 0)/ 10000),
        },
        caiwndList,
        ywhdly
      })
    })
  },
  splitK (num) {
    return num
  },
  handlecancel () {
    this.data.handler.close()
  },
  handleSelected(e) {
    const { value, label } = e.detail.selected
    this.setData({
      niandLabel: label,
      niand: value
    })
    this.getData()
  },
  handleAction() {
    const handler = ActionSheet.show({
      theme: ActionSheetTheme.List,
      selector: '#t-action-sheet',
      context: this,
      items: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '2021年',
          value: '2021'
        },
        {
          label: '2020年',
          value: '2020'
        },
        {
          label: '2019年',
          value: '2019'
        },
      ],
    });
    this.setData({
      handler
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