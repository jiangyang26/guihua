// components/profilebody/profilebody/profilebody.js
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
    listDetail: [
      {id: 1, title1: '全龄规划', image: '/user/start/icon/bardian.png', url: '/user/pages/plan/plan', title: '全龄规划'},
      {id: 2, title1: '快速发布', image: '/user/start/icon/fast.png', url: '/user/pages/fast/fast',title:''},
      {id: 3, title1: '历史发布', image: '/user/start/icon/histy.png', url: '/user/pages/profile/history-fast/history-fast'},
      {id: 4, title1: '规划方案', image: '/user/start/icon/plan.png', url: '/user/pages/profile/scheme/scheme'},
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    pushOrdersPage() {
      console.log(111);
      wx.navigateTo({
        url: '/user/pages/profile/orders/orders',
      })
    },
    pushCollectPage() {
      wx.navigateTo({
        url: '/user/pages/profile/collect/collect',
      })
    }
  }
})
