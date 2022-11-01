// pages/me/Earnings/record.js
var app = getApp()
var { payList, addBank, getinfos } = require('./../../../../utils/network/planner')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:1,
    banner: [],
    inputInfo: {},
    payList: []
  },

  changeAddress(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        address: e.detail.value
      }
    })
  },
  changeDetail(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        detail: e.detail.value
      }
    })
  },
  changeNumber(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        number: e.detail.value
      }
    })
  },
  changePhone(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        phone: e.detail.value
      }
    })
  },
  changeSf(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        sf: e.detail.value
      }
    })
  },
  changeName(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        payname: e.detail.value
      }
    })
  },
  toast(title, icon) {
    wx.showToast({
      title,
      icon
    })
  },
  entry(obj) {
    console.log(obj);
    let obj_ = Object.entries(obj)
    let flag = true
    obj_.find(item => {
      if(item[1] == '' || item[1] == null || item[1] == undefined || item[1] == ' ') {
        this.toast('请完整填写信息', 'none')
        flag = false
      }
    })
    return flag
  },
  // 提交
  submitTap() {
    let info = this.data.inputInfo
    let params = {
      payname: info.payname,
      idcard: info.sf,
      bank_mobile: info.phone,
      bank_card: info.number,
      bank_info: info.detail,
      bank_address: info.address
    }
    if(this.entry(params) == false) return 

    addBank(params).then(res => {
      if(res.data.code == 1) {
        this.toast('提交成功', 'success')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      banner: app.globalData.banner.filter(item => item.name == '规划师端收益记录轮播图')
    })
    payList({}).then(res => {
      this.setData({
        payList: res.data.data.data
      })
    })
    getinfos().then(res => {
      if(res.data.code == 1) {
        let data = res.data.data
        this.setData({
          inputInfo: {
            ...this.data.inputInfo,
            payname: data.payname,
            sf: data.idcard,
            phone: data.bank_mobile,
            number: data.bank_card,
            detail: data.bank_info,
            address: data.bank_address
          }
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

  },
  // 点击类别
  onActive(e){
    var active = e.currentTarget.dataset.index
    if(this.data.active == active){
      return
    }
    this.setData({
      active,
    })
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