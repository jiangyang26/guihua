// pages/templateClass/templateClass.js
var app = getApp();
var { gh3hCate, gh3h } = require('./../../../utils/network/planner')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    tabbar: '',
    scanShow: false,
    banner: [],
    cateList: [],
    infoList: [],
    currentIndex: 0,
    paramsInfo: {
      gh3hcate_id: '1',
      page: '1',
      offset: '10'
    },
    last_page: 0
  },

  cateActiveTap(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    this.setData({
      currentIndex: index,
      paramsInfo: {
        ...this.data.paramsInfo,
        gh3hcate_id: id,
        page: '1'
      }
    })
    this.getGh3h()
  },
  scanBack() {
    this.setData({
      scanShow: false
    })
  }, 
  toScan(e) {
    let value = e.currentTarget.dataset
    this.setData({
      scanShow: true,
      qrcode_image: value.image,
    })
  },
  getGh3h() {

    if(Number(this.data.paramsInfo.page) > this.data.last_page) {
      if(this.data.last_page != 0) {
        app.toast('没有更多数据了', 'none')
        return
      }
    }

    gh3h(this.data.paramsInfo).then(res => {
      this.setData({
        infoList: this.data.paramsInfo.page == '1' ? res.data.data.data.filter(item => item.switch == 1) : [
          ...this.data.infoList,
          ...res.data.data.data.filter(item => item.switch == 1)
        ],
        last_page: res.data.data.last_page
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      banner: app.globalData.banner.filter(item => item.name == '规划师端3H模板课轮播图'),
      navHeight: app.globalData.navHeight
    })

    gh3hCate().then(res => {
      this.setData({cateList: res.data.data})
    })
    this.getGh3h()
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
    wx.hideHomeButton()
    app.editTabBar1()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    clearInterval(app.timer1)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(app.timer1)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.infoList.length != 0) {
      let num = Number(this.data.paramsInfo.page)
      num++
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          page: num + ''
        }
      })
      this.getGh3h()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})