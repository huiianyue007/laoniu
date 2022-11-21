// components/financialOverView/index.js
import {
  UnitConversion,
  splitK
} from '../../utils/index'
import * as echarts from '../ec-canvas/echarts';
const app = getApp()
const {
  $tkAjax
} = app.globalData
Component({
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    initFlag: {
      type: Boolean,
      value: true
    },
    data: {
      type: Array,
      value: () => ([])
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    }
  },
  ready() {
    
    if (this.properties.initFlag) {
      this.ecComponent = this.selectComponent('#mychart-dom-area');
    $tkAjax.get('/getData/barChart').then(({
      data
    }) => {
      data = data.filter(data => data)
      data = data.map(item => ({
        ...item,
        gongyshyzhch: UnitConversion(item.gongyshyzhch, 10000, 2),
        juanzshr: UnitConversion(item.juanzshr, 10000, 2),
        shourhj: UnitConversion(item.shourhj, 10000, 2),
        zhichhj: UnitConversion(item.zhichhj, 10000, 2)
      }))
      this.ecComponent.init((canvas, width, height, dpr) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        const option = {
          tooltip: {
            trigger: 'item',
            position: function (pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              var obj = {
                top: 60
              };
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 0;
              return obj;
            }
          },
          title: {
            subtext: '单位：万元',
            right: 0,
          },
          legend: {
            bottom: 0,
            padding: 0,
            itemGap: 5,
            emphasis: {
              selectorLabel: {
                distance: 2
              },
            },
            data: [
              {
                name: '支出合计',
                icon: 'circle',
                itemStyle: {
                  color: '#5BC8A3'
                }
              },
              {
                name: '公益支出',
                icon: 'circle',
                itemStyle: {
                  color: '#E95863'
                }
              }
            ]
          },
          grid: {
            left: 50,
            right: 0,
            bottom: 50,
            top: 50
          },
          xAxis: {
            type: 'category',
            interval: 1,
            data: data.map(({
              caiwnd
            }) => caiwnd)
          },
          yAxis: [{
            type: 'value'
          }],
          series: [
            {
              data: data.map(({
                zhichhj
              }) => zhichhj),
              type: 'bar',
              name: '支出合计',
              itemStyle: {
                color: '#5BC8A3'
              }
            },
            {
              data: data.map(({
                gongyshyzhch
              }) => gongyshyzhch),
              type: 'bar',
              name: '公益支出',
              itemStyle: {
                color: '#E95863'
              }
            }
          ]
        }
        chart.setOption(option)
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    })
    } else {
      this.init()
    }
  },
  observers: {
    data () {
      this.init()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init () {
      this.ecComponent = this.selectComponent('#mychart-dom-area');
      let data = this.properties.data
      data = data.map(item => ({
        ...item,
        gongyshyzhch: UnitConversion(item.gongyshyzhch, 10000, 2),
        juanzshr: UnitConversion(item.juanzshr, 10000, 2),
        shourhj: UnitConversion(item.shourhj, 10000, 2),
        zhichhj: UnitConversion(item.zhichhj, 10000, 2)
      }))
      this.ecComponent.init((canvas, width, height, dpr) => {
        // 获取组件的 canvas、width、height 后的回调函数
        // 在这里初始化图表
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        const option = {
          tooltip: {
            trigger: 'item',
            position: function (pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              var obj = {
                top: 60
              };
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 0;
              return obj;
            }
          },
          title: {
            subtext: '单位：万元',
            right: 0,
          },
          legend: {
            bottom: 0,
            padding: 0,
            itemGap: 5,
            emphasis: {
              selectorLabel: {
                distance: 2
              },
            },
            data: [
              {
                name: '支出合计',
                icon: 'circle',
                itemStyle: {
                  color: '#5BC8A3'
                }
              },
              {
                name: '公益支出',
                icon: 'circle',
                itemStyle: {
                  color: '#E95863'
                }
              }
            ]
          },
          grid: {
            left: 50,
            right: 0,
            bottom: 50,
            top: 50
          },
          xAxis: {
            type: 'category',
            interval: 1,
            data: data.map(({
              caiwnd
            }) => caiwnd)
          },
          yAxis: [{
            type: 'value'
          }],
          series: [
            {
              data: data.map(({
                zhichhj
              }) => zhichhj),
              type: 'bar',
              name: '支出合计',
              itemStyle: {
                color: '#5BC8A3'
              }
            },
            {
              data: data.map(({
                gongyshyzhch
              }) => gongyshyzhch),
              type: 'bar',
              name: '公益支出',
              itemStyle: {
                color: '#E95863'
              }
            }
          ]
        }
        chart.setOption(option)
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      });
    }
  }
})
