let app = getApp()
var { leavingInfo, addLeaving } = require('./../../../../utils/network/planner')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paramsInfo: {},
    leavingInfo: [],
    inputInfo: '',
    copyInputInfo: '',
    markNum: 0,
    scrollTop: -1,
    notMessage: true
  },

  addLeaving(fid, id = '') {
    addLeaving({
      fid: fid,
      user_id: this.data.paramsInfo.user_id,
      info: this.data.inputInfo,
      plan_id: id
    }).then(res => {
      if(res.data.code == 1) {
        leavingInfo(this.data.paramsInfo.user_id).then(res => {
          this.setData({
            leavingInfo: res.data.data,
            inputInfo: '',
            scrollTop: res.data.data.length * 500
          });
        })
        return
      }
      wx.showToast({
        title: '发送失败',
        icon: 'error'
      })

    })
  },
  // 发送
  pushTap() {
    if(this.data.paramsInfo.type == 'home') {
      if(this.data.leavingInfo.length == 0) {
        this.addLeaving(this.data.paramsInfo.id, this.data.paramsInfo.id)
      }else{
        leavingInfo(this.data.paramsInfo.user_id).then(res => {
          this.setData({
            paramsInfo: {
              ...this.data.paramsInfo,
              leaving_id: res.data.data[0].leaving_id,
              scrollTop: res.data.data.length * 500
            }
          })
          this.addLeaving(res.data.data[0].leaving_id, '')
        })
      };
    }
    if(this.data.paramsInfo.type == 'message') {
      this.addLeaving(this.data.paramsInfo.leaving_id)
    }
  },
  // 输入
  changeInput(e) {
    this.setData({inputInfo: e.detail.value});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      paramsInfo: {
        ...options
      },
      avatar: app.globalData.userInfo.avatar
    })
    wx.setNavigationBarTitle({
      title: options.name,
    });
    leavingInfo(options.user_id).then(res => {
      let data = res.data.data;
      
      if(data.length == 0) {
        this.setData({
          notMessage: false
        })
      }

      this.setData({
        leavingInfo: data,
        scrollTop: data.length * 500
      })
    })
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