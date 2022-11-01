
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planTypeArray: ['理财规划', '养老规划'],
    planTypeValue: [],
    targetArray: ['合理分配收入支出', '通过理财获得更多收益', '节省不必要开销', '养老投资'],
    targetValue: '',
    yearIncomeArray: ['10w以下', '10-20w', '20-30w', '30-50w', '50-100w','100w以上'],
    yearIncomeValue: '',
    mortgageArray: ['是', '否'],
    mortgageValue: '',
    scaleArray1: ['30%', '40%', '50%'],
    scaleValue1: '',
    scaleArray2: ['30%', '40%', '50%'],
    scaleValue2: '',
    useArray: ['购物', '消费', '没有可自填'],
    useValue: '',
    inputType: '',
    inputInfo: {},
    focus: false,
    height: 0
  },

  // 提交
  submitTap() {
    let data = this.data
    let target = {
      type: data.planTypeArray[data.planTypeValue],
      target: data.targetArray[data.targetValue]
    }
    let current = {
      yearIncome: data.yearIncomeArray[data.yearIncomeValue],
      mortgage: data.mortgageArray[data.mortgageValue],
      scale1: data.scaleArray1[data.scaleValue1],
      scale2: data.scaleArray2[data.scaleValue2],
      use: data.inputInfo.useValue || data.useArray[data.useValue]
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
  changeUse(e) {
    let value = e.detail.value
    if(value == this.data.useArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'use'
      })
      return
    }
    this.setData({
      useValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        useValue: ''
      }
    })
  },
  changeScale2(e) {
    this.setData({scaleValue2: e.detail.value})
  },
  changeScale1(e) {
    this.setData({scaleValue1: e.detail.value})
  },
  changeMortgage(e) {
    this.setData({mortgageValue: e.detail.value})
  },
  changeYearIncome(e) {
    this.setData({yearIncomeValue: e.detail.value})
  },
  changeTarget(e) {
    this.setData({targetValue: e.detail.value})
  },
  changePlanType(e) {
    this.setData({planTypeValue: e.detail.value})
  },
  inputValue(value) {
    if(this.data.inputType == 'use') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          useValue: value
        }
      })
    }
  },
  changeInput(e) {
    this.inputValue(e.detail.value)
  },
  changeMulti(e) {
    this.setData({
      multiMatchIndex: e.detail.value
    })
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