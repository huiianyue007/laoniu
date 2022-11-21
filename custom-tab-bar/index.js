Component({
  data: {
    active: 'home'
  },

  methods: {
    onChange(event) {
      const value = event.detail.value
      this.setData({ active: value });
      wx.switchTab({
        url: `/pages/${value}/${value}`,
      });
    },

    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      const active = route.split('/')[1]
      this.setData({ active });
    },
  },
});
