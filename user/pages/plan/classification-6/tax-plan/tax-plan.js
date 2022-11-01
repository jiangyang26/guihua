var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionValue: [],
    typeArray: ['国企（央企）', '个人独资企业', '有限合伙企业', '其他可自填'],
    typeValue: '',
    scaleArray: ['100人以下', '100-500人', '500-1000人', '1000人以上', '没有可自填'],
    scaletValue: '',
    scaleArray1: ['100人以下', '100-500人', '500-1000人', '1000人以上', '没有可自填'],
    scaletValue1: '',
    timeValue: '',
    tradeArray: ['金融', 'IT', '科技', '互联网', '健康', '大数据', '广告', '教培', '媒体', '律所', '没有可自填'],
    tradeValue: '',
    preYearArray: ['500万以下', '500-1000万', '1000万-3000万', '3000万-5000万', '5000万以上', '没有可自填'],
    preYearValue: '',
    inputType: '',
    inputInfo: {},
    focus: false,
    height: 0,
  },


  // 提交
  submitTap() {
    let data = this.data
    let target = {
      type: data.inputInfo.type || data.typeArray[data.typeValue],
      scale: data.inputInfo.scale || data.scaleArray[data.scaletValue],
      city: data.regionValue[0],
      other_t: data.inputInfo.other_t
    }
    let current = {
      trade: data.inputInfo.trade || data.tradeArray[data.tradeValue],
      scale1: data.inputInfo.scale1 || data.scaleArray1[data.scaletValue1],
      scaleArray2: data.timeValue,
      preYear: data.inputInfo.preYear || data.preYearArray[data.preYearValue]
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
  changeOtherTarget(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        other_t: e.detail.value
      }
    })
  },
  changeRegion(e) {
    this.setData({regionValue: e.detail.value})
  },
  changePreYear(e) {
    let value = e.detail.value
    if(value == this.data.preYearArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'preYear'
      })
      return
    }
    this.setData({
      preYearValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        preYear: ''
      }
    })
  },
  changeTime(e) {
    this.setData({
      timeValue: e.detail.value
    })
  },
  changeScale1(e) {
    let value = e.detail.value
    if(value == this.data.scaleArray1.length - 1) {
      this.setData({
        focus: true,
        inputType: 'scale1'
      })
      return
    }
    this.setData({
      scaletValue1: value,
      inputInfo: {
        ...this.data.inputInfo,
        scale1: ''
      }
    })
  },
  changeTrade(e) {
    let value = e.detail.value
    if(value == this.data.tradeArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'trade'
      })
      return
    }
    this.setData({
      tradeValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        trade: ''
      }
    })
  },
  changeScale(e) {
    let value = e.detail.value
    if(value == this.data.scaleArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'scale'
      })
      return
    }
    this.setData({
      scaletValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        scale: ''
      }
    })
  },
  changeType(e) {
    let value = e.detail.value
    if(value == this.data.typeArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'type'
      })
      return
    }
    this.setData({
      typeValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        type: ''
      }
    })
  },
  inputValue(value) {
    if(this.data.inputType == 'type') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          type: value
        }
      })
    }
    if(this.data.inputType == 'scale') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          scale: value
        }
      })
    }
    if(this.data.inputType == 'trade') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          trade: value
        }
      })
    }
    if(this.data.inputType == 'scale1') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          scale1: value
        }
      })
    }
    if(this.data.inputType == 'time') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          time: value
        }
      })
    }
    if(this.data.inputType == 'preYear') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          preYear: value
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