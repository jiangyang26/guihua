// pages/message/message.js
var app = getApp();

var { leavingListUser } = require('../../../utils/network/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: '',
    banner: [],
    messageList: {}
  },

  toLeaveMessage(e) {
    let leaving_id = e.currentTarget.dataset.id
    let info = e.currentTarget.dataset.info
    let userplan_id = e.currentTarget.dataset.userplan_id
    let type = e.currentTarget.dataset.type
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: './leave-message/message?leaving_id=' + leaving_id +'&info=' + info + '&userplan_id=' + userplan_id + 
           '&type=' + type + '&name=' + name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideHomeButton();
    this.setData({
      banner: app.globalData.banner.filter(item => item.name == '用户端消息轮播图')
    })
    leavingListUser().then(res => {
      console.log(res);
      this.setData({
        messageList: res.data.data.data
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.editTabBar();    //显示自定义的底部导航
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(app.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(app.timer)
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