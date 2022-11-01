// planner/pages/me/fillIn/add-achievement/achievement.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date_: '',
    name: '',
    type_: '',
    situation: '',
    result_: '',
    time_: ''
  },

  addTap() {
    let pages = getCurrentPages()
    let prevpage= pages[pages.length - 2]// 上一个页面
    let data = prevpage.data // 获取上一页data里的数据

    let params = {
      date_ : this.data.date_,
      name : this.data.name,
      type_ : this.data.type_,
      situation : this.data.situation,
      result_ : this.data.result_,
      time_ : this.data.time_,
    }

    if(app.entry(params) == false) return
    
    prevpage.setData({
      achievement: [
        ...data.achievement,
        {...params}
      ]
    })
    wx.navigateBack()
  },
  changeTime(e) {
    let value = e.detail.value
    this.setData({
      time_: value
    })
  },
  changeResult(e) {
    let value = e.detail.value
    this.setData({
      result_: value
    })
  },
  changeSituation(e) {
    let value = e.detail.value
    this.setData({
      situation: value
    })
  },
  changeType(e) {
    let value = e.detail.value
    this.setData({
      type_: value
    })
  },
  changeName(e) {
    let value = e.detail.value
    this.setData({
      name: value
    })
  },
  changeDate(e) {
    let date_ = e.detail.value
    this.setData({date_})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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