// pages/seleClass/seleClass.js
var app = getApp();
var { ghip } = require('./../../../utils/network/planner')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: '',
    scanShow: false,
    banner: [],
    grip: [],
    zsip: []
  },

  scanBack() {
    this.setData({scanShow: false})
  },
  scanBackMark() {
    this.setData({scanShowMark: false})
  } ,
  toScan(e) {
    let value = e.currentTarget.dataset
    this.setData({scanShow: true, qrcode_image: value.image,})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      banner: app.globalData.banner.filter(item => item.name == '规划师端鲸选轮播图'),
      navHeight: app.globalData.navHeight
    })
    ghip().then(res => {
      console.log(res);
      if(res.data.code == 1) {
        this.setData({
          grip: res.data.data.grip,
          zsip: res.data.data.zsip,
          zsipList: res.data.data.zsip.lists.filter(item => item.switch == 1)
        })
      }
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})