// pages/firing/firing.js
var app = getApp()
var { banner } = require('./../../utils/network/user')
var { getNavHeight } = require('./../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    banner().then(res => {
      this.setData({
        banner: res.data.data.filter(item => item.name == '启用页')
      })
      app.globalData.banner = res.data.data
      setTimeout(() => {
        if(wx.getStorageSync('token') != '') {
          app.globalData.token = wx.getStorageSync('token')
          wx.redirectTo({
            // url: '/planner/pages/me/order/order'
            url: '/user/pages/home/home'
          })
          return
        }

        wx.redirectTo({
          url: '/pages/login/login',
        })
      }, 1200);
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    getNavHeight(app)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})