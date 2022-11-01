// components/profilebody/itemlist/itemlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleToPage(e) {
      const url = e.currentTarget.dataset.url_
      const title = e.currentTarget.dataset.title
      if(url.indexOf('/plan') != -1) {
        wx.redirectTo({
          url: url+'?title='+title
        })
        return
      }
      if(url.indexOf('/fast') != -1) {
        wx.redirectTo({
          url: url+'?title='+title
        })
        return
      }
      wx.navigateTo({
        url: url
      })
    }
  }
})
