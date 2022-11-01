
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionValue: [],
    planTypeArray: [['创业规划'], ['创业规划（已经落地）', '创业规划（构想中）']],
    planTypeValue: [],
    targetArray: [
      '项目可行性评估', '寻找合伙人', '寻找投资人', '需要FA', '业务梳理规划',
      '财务梳理规划', '协助项目落地', '创业咨询', '没有可自填'
    ],
    targetValue: '',
    yearIncomeArray: ['无', '1-10w', '10-50w', '50-100w', '100w以上'],
    yearIncomeValue: '',
    mortgageArray: ['是', '否'],
    mortgageValue: '',
    scaleArray1: ['30%', '40%', '50%'],
    scaleValue1: '',
    scaleArray2: ['30%', '40%', '50%'],
    scaleValue2: '',
    useArray: ['51%以上', '没有可自填'],
    useValue: '',
    useArray1: ['1', '2', '1-5', '没有可自填'],
    useValue1: '',
    inputType: '',
    inputInfo: {},
    focus: false,
    height: 0
  },

  // 提交
  submitTap() {
    let data = this.data
    let target = {
      type1: data.planTypeArray[0][data.planTypeValue[0]],
      type2: data.planTypeArray[1][data.planTypeValue[1]],
      target: data.inputInfo.target || data.targetArray[data.targetValue]
    }
    let current = {
      city: data.regionValue[0],
      useValue1: data.inputInfo.useValue1 || data.useArray1[data.useValue1],
      yearIncomeArray: data.yearIncomeArray[data.yearIncomeValue],
      useValue: data.inputInfo.useValue || data.useArray[data.useValue]
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
  changeRegion(e) {
    this.setData({regionValue: e.detail.value})
  },
  changeUse1(e) {
    let value = e.detail.value
    if(value == this.data.useArray1.length - 1) {
      this.setData({
        focus: true,
        inputType: 'use1'
      })
      return
    }
    this.setData({
      useValue1: value,
      inputInfo: {
        ...this.data.inputInfo,
        useValue1: ''
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
    let value = e.detail.value
    if(value == this.data.targetArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'target'
      })
      return
    }
    this.setData({
      targetValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        target: ''
      }
    })
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
    if(this.data.inputType == 'target') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          target: value
        }
      })
    }
    if(this.data.inputType == 'use1') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          useValue1: value
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