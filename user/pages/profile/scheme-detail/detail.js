// user/pages/profile/scheme-detail/detail.js
let app =  getApp();
let { myproinfos } = require('./../../../../utils/network/user')
  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paramsInfo: {
      page: '1',
      offset: '10',
    },
    last_page: 0,
    detailList: [],
    imageTapList: []
  },

  // 图片预览
  imageTap(e) {
    let url = e.currentTarget.dataset.image
    this.setData({
      imageTapList: [url]
    })
    wx.previewImage({
      urls: this.data.imageTapList
    });
  },
  getMyproInfos() {
    
    if(this.data.paramsInfo.page > this.data.last_page) {
      if(this.data.last_page != 0) {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
        return
      }
    }

    myproinfos(this.data.paramsInfo).then(res => {
      let data = res.data.data.data
      console.log(res);
      if(res.data.code == 1) {
        this.setData({
          detailList: this.data.paramsInfo.page == '1' ? data : [
            ...this.data.detailList,
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
    console.log(options);
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        info_id: options.info_id
      },
      surfaceImage: options.image
    })
    this.getMyproInfos()
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

    if(this.data.detailList.length != 0) {
      let num = Number(this.data.paramsInfo.page)
      num++
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          page: num + ''
        }
      })
      this.getMyproInfos()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})