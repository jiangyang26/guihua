// pages/message/message.js
var app = getApp();
var { leavingListPlanner } = require('../../../utils/network/planner')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: '',
    banner: [],
    messageList: []
  },

  toLeaveMessage(e) {
    let leaving_id = e.currentTarget.dataset.id
    let info = e.currentTarget.dataset.info
    let user_id = e.currentTarget.dataset.user_id
    let avatar = e.currentTarget.dataset.avatar
    let name = e.currentTarget.dataset.name
    let type = 'message'
    wx.navigateTo({
      url: './leave-message/message?leaving_id=' + leaving_id + '&info=' + info + 
      '&user_id=' + user_id + '&avatar=' + avatar + '&name=' + name + '&type=' + type
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.setData({
      banner: app.globalData.banner.filter(item => item.name == '规划师端消息轮播图')
    })
    leavingListPlanner().then(res => {
      console.log(res);
      this.setData({
        messageList: res.data.data.data
      })
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