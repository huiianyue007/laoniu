// components/lingyTag/index.js
const themeArr = [{
  title: '教育',
  value: 'jiaoyu'
}, {
  title: '医疗卫生',
  value: 'yiliaoweisheng'
}, {
  title: '文化艺术',
  value: 'wenhuayishu'
}, {
  title: '体育',
  value: 'tiyu'
}, {
  title: '扶贫济困',
  value: 'fupinjikun'
}, {
  title: '生态环境',
  value: 'shengtaihuanjing'
}, {
  title: '灾害救助',
  value: 'zaihaijiuzhu'
}, {
  title: '志愿服务',
  value: 'zhiyuanfuwu'
}, {
  title: '乡村振兴',
  value: 'xiangcunzhenxing'
}]
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: ''
  },
  observers: {
    title () {
      const theme = themeArr.find(({ title }) => title == this.properties.title) || {}
      this.setData({
        style: theme.value
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
