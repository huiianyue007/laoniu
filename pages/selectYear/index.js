// pages/screenFunds/index.js
const app = getApp()
const {
  $tkAjax
} = app.globalData
const {
  timeList
} = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '0',
    lingy: '',
    lingyList: [],
    city: '',
    cityName: '全部',
    timeList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const app = getApp()
    let {
      lingy,
      niand
    } = app.globalData
    $tkAjax.get('/top/getAlllingy').then(({
      rows
    }) => {
      rows = rows.map(({
        lingy
      }) => ({
        lingy,
        value: lingy
      }))
      rows.unshift({
        lingy: '全部',
        value: ''
      })
      if (lingy) {
        lingy = lingy.split(',')
        rows = rows.map(({
          value,
          ...item
        }) => {
          if (lingy.includes(value)) {
            return {
              value,
              ...item,
              active: true
            }
          } else {
            return {
              value,
              ...item,
              active: false
            }
          }
        })
      } else {
        lingy = []
      }
      this.setData({
        lingyList: rows,
        lingy
      })
    })
    if (niand) {
      this.setData({
        city: niand
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
  handleCheckLingy(e) {
    let {
      lingyList,
      lingy
    } = this.data
    const name = e.currentTarget.dataset.name
    const index = lingy.indexOf(name)
    if (name == '') {
      lingy = ['']
    } else if (index != -1) {
      lingy.splice(index, 1)
    } else {
      lingy.push(name)
    }
    lingyList = lingyList.map(({
      value,
      ...item
    }) => {
      if (name == '' && value == name) {
        return {
          value,
          ...item,
          active: true
        }
      } else if (name == '' && value !== '') {
        return {
          value,
          ...item,
          active: false
        }
      } else if (lingy.includes(value) && value !== '') {
        return {
          value,
          ...item,
          active: true
        }
      } else {
        return {
          value,
          ...item,
          active: false
        }
      }
    })
    this.setData({
      lingyList,
      lingy
    })
  },
  handleChange(e) {
    this.setData({
      value: e.target.id
    })
  },
  handleCancel() {
    let {
      lingyList
    } = this.data
    lingyList = lingyList.map(item => ({
      ...item,
      active: false
    }))
    this.setData({
      city: '',
      lingyList,
      lingy: []
    })
  },
  handleSubmit() {
    const {
      city,
      lingy
    } = this.data
    const app = getApp()
    app.globalData.lingy = lingy.join(',')
    app.globalData.niand = city
    console.log(app.globalData)
    wx.navigateBack()
  },
  handleCheckCity(e) {
    this.setData({
      city: e.currentTarget.dataset.value || '',
      cityName: e.currentTarget.dataset.name
    })
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