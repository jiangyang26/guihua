// pages/me/fillIn/fillIn.js
var { planDetail } = require('./../../../../utils/network/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus:false,
    detailInfo: [],   // 规划师详情
    zsList: [],   // 证书
    gzList: [],   // 工作经历
    fdTime: [],   //可辅导时间
    badge1: [],
    situation: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    planDetail(options.userplan_id).then(res => {
      let data = res.data.data
      console.log(res);
      let chengguo_arr = []
      if(data.chengguo_json != {}) {
        let arr = Object.entries(data.chengguo_json)
        arr.forEach(item => {
          let str_arr = item[1].split(',')
          chengguo_arr.push({
            date_: str_arr[0],
            name: str_arr[1],
            type_: str_arr[2],
            situation: str_arr[3],
            result_: str_arr[4],
            time_: str_arr[5],
          })
        })
      }
      this.setData({
        detailInfo: data,
        badge1: data.badge1.filter(item => item.istrue == 1),
        zsList: data.cert_json != null ? this.entries(data.cert_json) : [],
        gzList: data.work_json != null ? this.entries(data.work_json) : [],
        fdTime: data.times_json != null ? this.entries(data.times_json) : [],
        chengguo_arr: chengguo_arr
      })
    })
  },

  entries(obj) {
    return Object.entries(obj)
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
  // 单选
  radio(){
    var radio = !this.data.radio
    this.setData({
      radio
    })
  },
  onTap(){
    this.setData({
      focus:true
    })
  },
  // 点击遮罩层
  onCatch(){
    this.setData({
      focus:false
    })
  },
  // 输入框聚焦触发
  onFocus(e){
    this.setData({
      height:e.detail.height,
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