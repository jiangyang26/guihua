// pages/profile/orders/orders.js
let app =  getApp();
let { mypro } = require('./../../../../utils/network/user')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    agreementList: [
      {id: 1, title: '《学费代收代付第三方监管协议》'},
      {id: 2, title: '《平台入驻诚信协议》(平台免费协议)'},
      {id: 3, title: '《发布需求信息平台免责协议》(声明)'},
      {id: 4, title: '《平台产品购买基本协议》'}
    ],
    paramsInfo: {
      page: '1',
      offset: '10'
    },
    last_page: 0,
    orderList: []
  },


  getMypro() {
    if(this.data.paramsInfo.page > this.data.last_page) {
      if(this.data.last_page != 0) {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
        return
      }
    }
    mypro(this.data.paramsInfo).then(res => {
      let data = res.data.data.data
      if(res.data.code == 1) {
        this.setData({
          orderList: this.data.paramsInfo.page == '1' ? data : [
            ...this.data.orderList,
            ...data
          ],
          last_page: res.data.data.last_page
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMypro()
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

    if(this.data.orderList.length != 0) {
      let num = Number(this.data.paramsInfo.page)
      num++
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          page: num + ''
        }
      })
      this.getMypro()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})