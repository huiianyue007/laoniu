// pages/auth/index.js
import Toast from 'tdesign-miniprogram/toast/index';
const app = getApp()
const {
  $tkAjax,
  $tkAjaxGlobal
} = app.globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    phoneCode: '',
    visible: false,
    imgurl: '',
    formData: {
      name: '',
      jig: '',
      zhiw: '',
      guanzhly: []
    },
    formSelectedData: {
      guanzhly: []
    },
    checkIcon: ['check-rectangle-filled', 'check-rectangle'],
    selectVisible: false,
    guanzhlyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getRankCategorys()
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
  async getRankCategorys() {
    const {
      rows
    } = await $tkAjax.get('/top/getAlllingy', {
      params: {}
    })
    if (rows && rows.length) {
      this.setData({
        guanzhlyList: rows.map(v => v.lingy)
      })
    }
  },
  getUserInfo() {
    const {
      title: nickname,
      imgurl
    } = this.data
    if (imgurl && nickname) {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: ({
          userInfo
        }) => {
          wx.login({
            success: (res) => {
              if (res.code) {
                const code = res.code

                const {
                  gender: sex,
                } = userInfo
                if (userInfo) {
                  const {
                    title: nickname,
                    imgurl
                  } = this.data
                  const app = getApp()
                  app.globalData.userInfo = {
                    ...userInfo,
                    nickname,
                    imgurl
                  }
                } else {
                  app.globalData.userInfo = null
                }
                this.setData({
                  code
                })
                this.login({
                  sex,
                  code
                })
              }
            }
          })
        }
      })
    } else {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请设置昵称和头像',
        theme: 'fail'
      })
    }
  },
  handleSubmit(e) {
    this.setData({
      phoneCode: e.detail.code
    })
    const {
      code
    } = this.data
    if (code) {
      const app = getApp()
      const {
        gender: sex,
      } = app.globalData.userInfo || {}
      this.login({
        sex,
        code
      })
    }
  },
  onChooseAvatar(e) {
    const {
      avatarUrl: imgurl
    } = e.detail
    console.log(imgurl)
    this.setData({
      imgurl,
    })
  },
  handleInput(e) {
    this.setData({
      title: e.detail.value
    })
  },
  async login(params) {
    if (this.data.phoneCode) {
      const {
        title: nickname,
        imgurl
      } = this.data
      if (imgurl && nickname) {
        const {
          data
        } = await $tkAjax.post('/wecom/login', {
          ...params,
          nickname,
          imgurl
        })
        const {
          msg
        } = await $tkAjax.post('/wecom/getPhoneNumber', {
          code: this.data.phoneCode
        }, {
          headers: {
            authorization: `Bearer ${data.token}`
          }
        })
        const token = `Bearer ${msg}`
        $tkAjaxGlobal.headers['authorization'] = token
        const app = getApp()
        app.globalData.token = token
        wx.setStorageSync('token', token)

        if (!data.info) {
          this.setData({
            visible: true
          });
        } else {
          wx.navigateBack()
        }
      } else {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '请设置昵称和头像',
          theme: 'fail'
        })
      }

    }

  },
  handleCancel() {
    // this.setData({
    //   visible: false
    // });
    wx.navigateBack()
  },
  handleSelect() {
    this.setData({
      selectVisible: true
    });
  },
  handleFormSubmit() {
    $tkAjax.post('/user/userMessage', this.data.formData).then(res => {
      this.setData({
        visible: false
      })
      wx.navigateBack()
    })
  },
  handleGroupChange(e) {
    this.setData({
      formSelectedData: {
        guanzhly: e.detail.value
      }
    })
  },
  handleSelectCheckCancle() {
    this.setData({
      selectVisible: false
    })
  },
  handleChangeName(e) {
    const {
      formData
    } = this.data
    this.setData({
      formData: {
        ...formData,
        name: e.detail.value
      }
    })
  },
  handleChangeJig(e) {
    const {
      formData
    } = this.data
    this.setData({
      formData: {
        ...formData,
        jig: e.detail.value
      }
    })
  },
  handleChangeZhiw(e) {
    const {
      formData
    } = this.data
    this.setData({
      formData: {
        ...formData,
        zhiw: e.detail.value
      }
    })
  },
  handleSelectCheckSubmit() {
    const {
      formData
    } = this.data
    this.setData({
      formData: {
        ...formData,
        guanzhly: this.data.formSelectedData.guanzhly
      },
      selectVisible: false
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
  handleDel(e) {
    const guanzhly = this.data.formData.guanzhly
    guanzhly.splice(e.currentTarget.id * 1, 1)
    this.setData({
      formData: {
        guanzhly
      }
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