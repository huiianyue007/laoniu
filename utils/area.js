var QQMapWX = require('./qqmap-wx-jssdk');
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'HU7BZ-MGTCU-GO5VW-BJIUI-ETYB7-62FUH'
});

export const getLocation = function () {
  return new Promise(resolve => {
    wx.authorize({
      scope: 'scope.userFuzzyLocation',
      success () {
        wx.getFuzzyLocation({
          type: 'wgs84',
          success (res) {
            const {latitude, longitude} = res
            console.log(latitude, longitude)
            qqmapsdk.reverseGeocoder({
              location: {
                latitude,
                longitude
              },
              success ({ result }) {
                console.log(result)
                let province = result && result.ad_info && result.ad_info.province
                province = province.replace(/省|市/img, '')
                console.log(province)
                resolve(province)
              },
              fail (err) {
                console.log(err)
              }
            })
            // resolve(res)
          },
          fail (err) {
            console.log(err)
          }
        })
      }
    })
    
  })
}