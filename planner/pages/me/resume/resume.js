// planner/pages/me/resume/resume.js
let app =  getApp();

let { addjl } = require('./../../../../utils/network/planner')
  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFiles: [],
    notShow: false
  },

  uploadTap() {

    if(this.data.tempFiles.length == 0) {
      this.setData({notShow: true})
      return
    }

    let token_ = wx.getStorageSync('token')
    wx.uploadFile({
      filePath: this.data.tempFiles[0].path,
      name: 'file',
      url: 'https://guihua.wechat800.cn/index.php/api/common/upload',
      header:{
        token:token_
      },
      success: res_ =>{
        let obj = JSON.parse(res_.data)
        console.log(obj);
        console.log(obj.data.fullurl);
        if(obj.code == 1 && obj.msg == '上传成功') {
          addjl(obj.data.fullurl).then(res => {
            if(res.data.code == 1) {
              app.toast('上传成功', 'success')
              return
            }
          })
          return
        };
        app.toast('上传失败', 'error')
      }
    })
  },
  delResume() {
    this.setData({
      tempFiles: []
    })
  },
  backTap() {
    wx.navigateBack({
      delta: 1,
    })
  },
  reSelect() {

    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['pdf'],
      success: res => {
        this.setData({
          tempFiles: res.tempFiles,
          notShow: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    // 监听resume事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('resume', (data) => {
      console.log(data);
      this.setData({
        tempFiles: data.data.tempFiles
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