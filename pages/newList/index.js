const app = getApp()
const {
  $tkAjax
} = app.globalData
// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zixfl: '最新',
    pageQuery: {
      pageNum: 2,
      pageSize: 2
    },
    id: '',
    value: '',
    newsList: [],
    total: 0,
    dataList: [],
    lingyList: [],
    newTypeOption: [
      '最新',
      '资助',
      '招聘',
      '获奖',
      '深度报道',
      '法规政策解读',
      '采购',
      '招标',
      '人员变更',
      '行业活动',
      '机构名称变更',
      '行政处罚',
      '报告'
    ],
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  onLoad({ id }) {
    this.setData({
      id
    })
    this.init()
    $tkAjax.get('/top/getAlllingy').then(({ rows }) => {
      this.setData({
        lingyList: rows
      })
    })
  },
  handleSubmit () {
    this.setData({
      value: e.detail.value
    })
    this.init()
  },
  async init() {
    try {
      this.setData({
        loading: true
      })
      this.setData({
        pageQuery: {
          pageNum: 1,
          pageSize: 7
        },
        dataList: []
      })
      this.getData()
    } finally {
      this.setData({
        loading: false
      })
    }
  },
  handleRoute(e) {
    wx.navigateTo({
      url: `/pages/newsDetail/newsDetail?id=${e.currentTarget.id}`,
    })
  },
  async getData() {
    const {
      zixfl,
      pageQuery,
      dataList,
      id,
      value
    } = this.data
    const { total,
      rows } = await $tkAjax('/famData/news', {
      params: {
        zixfl,
        id,
        value: '',
        ...pageQuery
      }
    })
    this.setData({
      dataList: [...dataList, ...rows],
      total
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */

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
    const {
      pageQuery,
      total,
      dataList
    } = this.data
    console.log(total, dataList.length)
    if (total > dataList.length) {
      this.setData({
        pageQuery: {
          ...pageQuery,
          pageNum: pageQuery.pageNum + 1
        }
      })
      this.getData()
    }
  },
  onTabsChange(e) {
    this.setData({
      zixfl: e.detail.value
    })
    this.init()
  },
  onStickyScroll(event) {
    console.log(event.detail);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})