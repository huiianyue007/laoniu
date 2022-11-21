// pages/screenFunds/index.js
const app = getApp()
const {
  $tkAjax
} = app.globalData
import { getProvince } from '../../utils/city'
import {  getLocation } from '../../utils/area'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '0',
    lingy: [],
    city: [],
    cityName: '全国',
    cityList: [],
    lingyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({ sheng, lingy }) {
    $tkAjax.get('/top/getAlllingy').then(({ rows }) => {
      rows = rows.map(({ lingy }) => ({
        lingy,
        value: lingy
      }))
      rows.unshift({
        lingy: '全部',
        value: ''
      })
      if (lingy) {
        lingy = lingy.split(',')
        rows = rows.map(({value, ...item}) => {
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
    let { city } = this.data
    if (sheng) {
      city = sheng.split(',')
    }
    let cityList = getProvince()
    cityList = cityList.map(label => ({
      label,
      value: label
    }))
    cityList.unshift({
      label: '全国',
      value: ''
    })
    if (city.length > 0) {
      cityList = cityList.map(({ value, ...item }) => {
        if (city.includes(value)) {
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
    }
    this.setData({
      cityList,
      city
    })
    getLocation().then(res => {
      if (cityList.some(({ value }) => value === res)) {
        this.setData({
          cityName: res
        })
      } else {
        this.setData({
          cityName: '全国'
        })
      }
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
  handleCheckLingy (e) {
    let { lingyList, lingy } = this.data
    const name = e.currentTarget.dataset.name
    const index = lingy.indexOf(name)
    if (name == '') {
      lingy = ['']
    } else if  (index != -1) {
      lingy.splice(index, 1)
    } else {
      lingy.push(name)
    }
    lingyList = lingyList.map(({ value, ...item }) => {
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
      } else  {
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
  handleChange (e) {
    this.setData({
      value: e.target.id
    })
  },
  handleCancel () {
    let { cityList, lingyList  } = this.data
    cityList = cityList.map(item => ({
      ...item,
      active: ''
    }))
    lingyList= lingyList.map(item => ({
      ...item,
      active: ''
    }))
    this.setData({
      city: [],
      cityList,
      lingyList,
      lingy: []
    })
  },
  handleSubmit () {
    let { city: sheng, lingy } = this.data
    sheng = sheng.filter(val => val).join(',')
    lingy = lingy.filter(val => val).join(',')
    wx.redirectTo({
      url: `/pages/fundsOrgList/index?sheng=${sheng}&lingy=${lingy}`,
    })
  },
  handleRouteCity () {
    wx.navigateTo({
      url: '/pages/selectCity/index',
    })
  },
  handleCheckCity (e) {
    let { cityList, city } = this.data
    const name = e.currentTarget.dataset.name
    const index = city.indexOf(name)
    if (name == '') {
      city = ['']
    } else if  (index != -1) {
      city.splice(index, 1)
    } else {
      city.push(name)
    }
    cityList = cityList.map(({ value, ...item }) => {
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
      } else if (city.includes(value) && value !== '') {
        return {
          value,
          ...item,
          active: true
        }
      } else  {
        return {
          value,
          ...item,
          active: false
        }
      }
    })
    this.setData({
      cityList,
      city
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