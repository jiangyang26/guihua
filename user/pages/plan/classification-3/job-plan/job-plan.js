var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    targetArray: ['兼职', '实习', '全职', '没有可自填'],
    targetArray1: ['编制', '落户', '过渡', '没有可自填'],
    targetValue: '',
    targetValue1: '',
    regionValue: '',
    regionValue1: '',
    yearIncomeArray: ['10w以下', '10-20w', '20-30w', '30-50w', '50-100w','100w以上'],
    yearIncomeValue: '',
    mortgageArray: ['国企', '私企', '央企', '没有可自填'],
    mortgageArray1: ['在读', '应届毕业', '近期离职', '离职1年以内', '离职1年以上', '在职看机会'],
    mortgageValue: '',
    mortgageValue1: '',
    scaleArray1: ['1-10人', '10-100人', '500+', '1000+', '1w'],
    scaleArray2: ['专科学历', '本科学历', '硕士学历', '博士学历', '没有可自填'],
    scaleValue1: '',
    scaleValue2: '',
    useArray: ['行政', '市场', '运营', '高管', '其他', '没有可自填'],
    useArray1: ['行政', '市场', '运营', '高管', '其他', '没有可自填'],
    useValue: '',
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
      city_t: data.regionValue1[0],
      mortgageArray: data.mortgageArray[data.mortgageValue],
      scaleArray1: data.scaleArray1[data.scaleValue1],
      targetValue: data.inputInfo.targetValue || data.targetArray[data.targetValue],
      useValue: data.inputInfo.useValue || data.useArray[data.useValue],
      targetValue1: data.inputInfo.targetValue1 || data.targetArray1[data.targetValue1]
    }
    let current = {
      city_c: data.regionValue[0],
      mortgageArray1: data.mortgageArray1[data.mortgageValue1],
      scaleArray2: data.scaleArray2[data.scaleValue2],
      useValue1: data.inputInfo.useValue1 || data.useArray1[data.useValue1]
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
  changeRegion1(e) {
    this.setData({
      regionValue1: e.detail.value
    })
  },
  changeRegion(e) {
    this.setData({
      regionValue: e.detail.value
    })
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
  changeMortgage1(e) {
    this.setData({mortgageValue1: e.detail.value})
  },
  changeMortgage(e) {
    this.setData({mortgageValue: e.detail.value})
  },
  changeYearIncome(e) {
    this.setData({yearIncomeValue: e.detail.value})
  },
  changeTarget1(e) {
    let value = e.detail.value
    if(value == this.data.targetArray1.length - 1) {
      this.setData({
        focus: true,
        inputType: 'targetValue1'
      })
      return
    }
    this.setData({
      targetValue1: value,
      inputInfo: {
        ...this.data.inputInfo,
        targetValue1: ''
      }
    })
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
    if(this.data.inputType == 'use1') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          useValue1: value
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
    if(this.data.inputType == 'targetValue1') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          targetValue1: value
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