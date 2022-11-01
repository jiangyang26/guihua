// pages/signUp/signUp.js
var { ghteam } = require('./../../../utils/network/planner')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanShow: false,
    ghteamInfo: []
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    ghteam({}).then(res => {
      let data = res.data.data.data
      this.setData({
        ghteamInfo: data.filter(item => item.switch == 1)
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

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