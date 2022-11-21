// components/areaConc/index.js
import {
  UnitConversion,
  splitK
} from '../../utils/index'
import * as echarts from '../ec-canvas/echarts';
const app = getApp()
const themeArr = [{
  title: '教育',
  value: '#51B3F9'
}, {
  title: '医疗卫生',
  value: '#E95863'
}, {
  title: '文化艺术',
  value: '#6C70C8'
}, {
  title: '体育',
  value: '#F7C544'
}, {
  title: '扶贫济困',
  value: '#EE793F'
}, {
  title: '生态环境',
  value: '#5BC8A3'
}, {
  title: '灾害救助',
  value: '#4482F7'
}, {
  title: '志愿服务',
  value: '#9F51F9'
}, {
  title: '乡村振兴',
  value: '#98B1F5'
}]
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
    niand: {
      type: String,
      value: ''
    },
    unit: String,
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
    },
    chartData: []
  },
  ready() {
    this.ecComponent = this.selectComponent('#mychart-dom-area');
    this.init()
  },
  observers: {
    niand() {
      this.init()
    },
    data() {
      this.init()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init() {
        if (this.properties.initFlag) {
          $tkAjax.get('/getData/pieChart', {
            params: {
              niand: this.properties.niand
            }
          }).then(({
            data
          }) => {
            data.reverse()
            data = data.filter(({ lyZhich }) => lyZhich> 0)
            const len = data.length
            if (len > 5) {
              data = data.splice(len - 5, len)
            }
            this.setData({
              chartData: data
            })
            data = data.map(item => ({
              ...item,
              lyZhb: UnitConversion(item.lyZhb, 100000000, 2),
              lyZhich: UnitConversion(item.lyZhich, 100000000, 2)
            }))
            this.ecComponent.init((canvas, width, height, dpr) => {
              const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr // new
              });
              const option = {
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'shadow'
                  }
                },
                grid: {
                  left: '3%',
                  right: '40',
                  top: 0,
                  bottom: 0,
                  containLabel: true
                },
                
                xAxis: {
                  type: 'value',
                  name: this.properties.unit,
                  axisLabel: {
                    formatter: '{value}'
                  },
                  axisTick: {
                    alignWithLabel: true
                  },
                  axisLine: {
                    show: true
                  }
                },
                yAxis: {
                  type: 'category',
                  data: data.map(item => item.lyName),
                  boundaryGap: true,
                  axisTick: {
                    alignWithLabel: true
                  }
                },
                series: [
                  {
                    type: 'bar',
                    barWidth: 20,
                    data: data.map(({ lyZhich: value, lyName }) => {
                      const { value: color } = themeArr.find(({ title }) => title === lyName) || { value: '#4482F7' }
                      return {
                        value, 
                        itemStyle: {
                          color
                        }
                      }
                    })
                  }
                ]
              };
              chart.setOption(option)
              // 注意这里一定要返回 chart 实例，否则会影响事件处理等
              return chart;
            })
          })
        } else {
          this.initData()
        }
    },
    initData () {
      let data = this.properties.data
      // data.reverse()
      data = data.filter(({ lyZhich }) => lyZhich > 0)
      const len = data.length
      if (len > 5) {
        data = data.splice(len - 5, len)
      }
      this.setData({
        chartData: data
      })
      data = data.map(item => ({
        ...item,
        lyZhb: UnitConversion(item.lyZhb, 10000, 2),
        lyZhich:UnitConversion(item.lyZhich, 10000, 2)
      }))
      
      this.ecComponent.init((canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '40',
            top: 0,
            bottom: 0,
            containLabel: true
          },
          xAxis: {
            type: 'value',
            name: this.properties.unit,
            axisLine: {
              show: true,
            },
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              rotate: 45
            }
          },
          yAxis: {
            type: 'category',
            data: data.map(item => item.lyName),
            boundaryGap: true,
            axisTick: {
              alignWithLabel: true
            }
          },
          series: [
            {
              type: 'bar',
              barWidth: 20,
              data: data.map(({ lyZhich: value, lyName }) => {
                const { value: color } = themeArr.find(({ title }) => title === lyName) || { value: '#4482F7' }
                return {
                  value, 
                  itemStyle: {
                    color
                  }
                }
              })
            }
          ]
        };
        chart.setOption(option)
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return chart;
      })
    }
  }
})
