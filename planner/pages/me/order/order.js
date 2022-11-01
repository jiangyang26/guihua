// pages/me/order/order.js
let app =  getApp();

let { mypro } = require('./../../../../utils/network/planner')
    
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
      offset: '10',
      type: 'entrust'
    },
    last_page: 0,
    orderList: [],
    active: 0
  },

  onChange(e){
    let index = e.detail.index
    if(index == 0) {
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          type: 'entrust'
        }
      })
    }

    if(index == 1) {
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          type: 'channel'
        }
      })
    }

    this.getMyPro()
  },
  toAgreementDetail(e) {
    let signlink = e.currentTarget.dataset.signlink
    wx.navigateTo({
      url: '/planner/pages/me/agreement/agreement',
      success: function(res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('agreement', { data: {signlink} })
      }
    })
  },

  getMyPro() {
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
      console.log(data);
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
  onLoad(options) {
    this.getMyPro()
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
    if(this.data.orderList.length != 0) {
      let num = Number(this.data.paramsInfo.page)
      num++
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          page: num + ''
        }
      })
      this.getMyPro()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})