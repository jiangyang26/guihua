// pages/login/login.js
var app = getApp()
var { login, agreement } = require('./../../utils/request')
var { toast } = require('./../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 1,
    userInfoShow: true,
    checked: false,
    paramsInfo: {}
  },


  getPhoneNumber(e) {
    if(this.data.checked == false) {
      toast('请勾选协议', 'none')
      return
    }
    if(e.detail.errMsg == 'getPhoneNumber:fail user deny') return
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv
      }
    });
    login(this.data.paramsInfo).then(res => {
      if(res.data.code == 1) {
        app.globalData.userInfo = {
          ...app.globalData.userInfo,
          ...res.data.data
        }
        app.globalData.token = res.data.data.token
        wx.setStorageSync('token', res.data.data.token)
        wx.setStorageSync('userInfo', res.data.data)
        if(this.data.currentIndex == 1) {
          wx.redirectTo({
            url: '/user/pages/home/home',
          })
        }
        if(this.data.currentIndex == 2) {
          wx.redirectTo({
            url: '/planner/pages/home/home',
          })
        }
        return
      }
      toast('登录失败', 'none')
    }).catch(err => {
      console.log(err, 222);
    })
  },
  getCode() {
    wx.login({
      timeout: 60000,
      success: res => {
        app.globalData.userInfo = {
          ...app.globalData.userInfo,
          code: res.code
        }
        this.setData({
          paramsInfo: {
            ...this.data.paramsInfo,
            code: res.code
          }
        })
      }
    })
  },
  roleTap(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.hideHomeButton()
    // agreement().then(res => {
    //   console.log(res);
    // })
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
  // 协议
  onChange(event) {
    this.setData({
      checked: event.detail,
    })
  },
  onTap(){
    if(this.data.checked == false) {
      toast('请勾选协议', 'none')
      return
    }
    wx.getUserProfile({
      desc: '获取您的信息',
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.getCode()
        this.setData({
          userInfoShow: false,
          paramsInfo: {
            ...this.data.paramsInfo,
            nickname: res.userInfo.nickName,
            avatarurl: res.userInfo.avatarUrl,
          }
        })
      },
      fail: err => {
        console.log(err);
      }
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