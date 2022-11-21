// components/searchBar/searchBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: String,
    active: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: '',
  },
  ready() {},
  /**
   * 组件的方法列表
   */
  methods: {
    handleSubmit(e) {
      console.log(e.detail.value)
      this.setData({
        value: e.detail.value
      })
      wx.navigateTo({
        url: `/pages/searchResult/index?keywords=${this.data.value}&active=${this.data.active}`,
      })
    }
  }
})