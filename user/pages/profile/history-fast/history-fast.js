// pages/profile/history-fast/history-fast.js

var app = getApp()
var { hisPlanList } = require('./../../../../utils/network/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hisFastList: [],
    paramsInfo: {
      page: '1',
      offset: '10'
    },
    last_page: 0
  },

  fastDetailTap(e) {
    let plan_id = e.currentTarget.dataset.plan_id
    let status = e.currentTarget.dataset.status
    if(status == '2') {
      wx.navigateTo({
        url: '/user/pages/profile/history-fast/fast-detail/fast-detail?plan_id=' + plan_id,
      })
    }
    if(status == '1') {
      wx.navigateTo({
        url: '/user/pages/profile/history-fast/school-plan/school-plan?plan_id=' + plan_id,
      })
    }
  },

  getHisPlanList() {
    if(Number(this.data.paramsInfo.page) > this.data.last_page) {
      if(this.data.last_page != 0) {
        app.toast('没有更多数据了', 'none')
        return
      }
    }
    hisPlanList(this.data.paramsInfo).then(res => {
      this.setData({
        hisFastList: this.data.paramsInfo.page == '1' ? res.data.data.data : [
          ...this.data.hisFastList,
          ...res.data.data.data
        ],
        last_page: res.data.data.last_page
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHisPlanList()
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
    if(this.data.hisFastList.length != 0) {
      let num = Number(this.data.paramsInfo.page)
      num ++ 
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          page: num + ''
        }
      })
      this.getHisPlanList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})