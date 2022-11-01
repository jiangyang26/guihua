// user/pages/plan/classification-1/match-plan/match-plan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionValue1: [],
    sexArray: ['男', '女'],
    sexValue: '',
    categoryArray: [['心理辅导规划'],
    ['心理疏导规划（未成年）', '心理疏导规划（成年）', '心理疏导（老年独居）', '心理疏导（疫情居家）', '其他']
   ],
   categoryValue: [],
    targetArray: ['需要倾听', '解决困惑', '缓解抑郁（轻度）', '需要安慰鼓励', '没有可自填'],
    targetValue: '',
    inputType: '',
    inputValue: '',
    focus: false,
    height: 0
  },

  // 提交
  submitTap() {
    let data = this.data
    let target = {
      type1: data.categoryArray[0][0],
      type2: data.categoryArray[1][data.categoryValue[1]],
      target: data.inputValue || data.targetArray[data.targetValue]
    }
    let current = {
      city: data.regionValue1[0],
      sex: data.sexArray[data.sexValue]
    }

    if(app.entry({
      ...target,
      ...current
    }) == false) return
    
    if(data.inputInfo.other != undefined && data.inputInfo.other != '') {
      current = {
        ...current,
        other: data.inputInfo.other
      }
    }

    let pages = getCurrentPages()
    let prevpage= pages[pages.length - 2]// 上一个页面
    prevpage.setData({
      target: target,
      current: current
    })
    wx.navigateBack()
  },  
  changeOther(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        other: e.detail.value
      }
    })
  },
  changeCategory(e) {
    this.setData({
      categoryValue: e.detail.value
    })
  },
  bindTargetChange(e) {
    let value = e.detail.value
    if(value == this.data.targetArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'target',
      })
    }
    this.setData({
      targetValue: value,
      inputValue: ''
    })
  },
  changeSex(e) {
    this.setData({
      sexValue: e.detail.value
    })
  },
  changeRegion1(e) {
    this.setData({regionValue1: e.detail.value})
  },

  inputValue(value) {
    if(this.data.inputType == 'target') {
      this.setData({
        inputValue: value
      })
    }
  },
  changeInput(e) {
    this.inputValue(e.detail.value)
  },
  handleInputFocus(e) {
    let height = e.detail.height
    this.setData({
      height
    })
  },
  handleInputBlur() {
    this.setData({
      focus: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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