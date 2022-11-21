// components/geographical/index.js
const img = '../../static/location.png'
const app = getApp()
const {
  $tkAjax
} = app.globalData
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
  },
  ready() {
    this.init()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      this.mapCtx = wx.createMapContext('mapId', this)
      console.log(this.mapCtx)
      wx.authorize({
        scope: 'scope.userFuzzyLocation',
        success: () => {
          wx.getFuzzyLocation({
            type: 'wgs84',
            success: (res) => {
              const {
                latitude,
                longitude
              } = res
              this.setData({
                latitude,
                longitude
              })
            },
            fail(err) {
              console.log(err)
            }
          })
        }
      })
      $tkAjax.get('/getData/getProMap').then(({
        data
      }) => {
        const marker = {
          iconPath: img,
          width: 40,
          height: 40,
          joinCluster: true, // 指定了该参数才会参与聚合
          
        }
        const markers = data.map(({
          jingd: longitude,
          weid: latitude,
          mingch
        }, i) => {
          const newMarker = {
            ...marker,
            longitude,
            latitude,
            id: i + 1,
            callout: {
              display: 'BYCLICK',
              content: mingch,
              bgColor: '#fff',
              borderWidth: 1,
              borderRadius: 8,
              borderColor: '#d6d6d6',
              padding: 14
            }
          }
          return newMarker
        })
        this.mapCtx.addMarkers({
          markers,
          clear: false
        })
      })
    }
  }
})
