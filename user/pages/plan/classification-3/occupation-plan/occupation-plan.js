var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planTypeArray: [['职业生涯发展方向规划', '职场提升'], ['职业生涯发展方向规划', '性格测试']],
    planTypeValue: [],
    targetArray: ['个人提升', '升职加薪', '跨越瓶颈期', '求职', '输入'],
    targetValue: '',
    regionValue: '',
    yearIncomeArray: ['10w以下', '10-20w', '20-30w', '30-50w', '50-100w','100w以上'],
    yearIncomeValue: '',
    mortgageArray: ['国企', '私企', '央企', '在读可不填', '自由职业', '创业/其他'],
    mortgageValue: '',
    scaleArray1: ['1-10人', '10-100人', '500+', '1000+', '1w'],
    scaleValue1: '',
    useArray: ['行政', '市场', '运营', '高管', '其他', '没有可自填'],
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
      type1: data.planTypeArray[0][data.planTypeValue[0]],
      type2: data.planTypeArray[1][data.planTypeValue[1]],
      target: data.inputInfo.targetValue || data.targetArray[data.targetValue]
    }
    let current = {
      city: data.regionValue[0],
      mortgageArray: data.mortgageArray[data.mortgageValue],
      scaleArray1: data.scaleArray1[data.scaleValue1],
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
    this.setData({
      regionValue: e.detail.value
    })
  },
  changeColumncPlan(e) {
    let column = e.detail.column
    let value = e.detail.value
    let data = {
      planTypeArray: this.data.planTypeArray
    }
    if(column == 0 && value == 0) {
      data.planTypeArray[1] = ['职业生涯发展方向规划', '性格测试']
    }
    if(column == 0 && value == 1) {
      data.planTypeArray[1] = [
        '职场简历优化', '职场背景优化', '职场口才提升', '职场情商提升',
        '职场晋升规划', '职场人际规划', '工作瓶颈期规划', '职场技能提升', '没有可自填'
      ]
    }
    this.setData(data)
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
        inputType: 'targetValue'
      })
      return
    }
    this.setData({
      targetValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        targetValue: ''
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
    if(this.data.inputType == 'targetValue') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          targetValue: value
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