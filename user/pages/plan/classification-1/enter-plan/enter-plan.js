var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionValue: [],
    regionValue1: [],
    stageArray: [['幼儿园', '小学', '初中', '高中', '本科', '硕士', '中专'],
      ['国内幼儿园', '国际幼儿园']
    ],
    stageArray1: [['幼儿园', '小学', '初中', '高中', '本科', '硕士', '中专'],
      ['国内幼儿园', '国际幼儿园']
    ],
    stageValue: [],
    stageValue1: [],
    inputType: '',
    inputInfo: {},
    schoolInfo: {},
    focus: false,
    height: 0
  },

  submitTap() {
    let data = this.data
    let target = {
      city_t: data.regionValue[0],
      stage1_t: data.stageArray[0][data.stageValue[0]],
      stage2_t: data.stageArray[1][data.stageValue[1]],
      school_t: data.inputInfo.school_t
    }
    let current = {
      city_c: data.regionValue[0],
      stage1_c: data.stageArray1[0][data.stageValue1[0]],
      stage2_c: data.stageArray1[1][data.stageValue1[1]],
      school_c: data.inputInfo.school_t,
      other: data.inputInfo.other
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
  changeSchoolNameCurrent(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        school_c: e.detail.value
      }
    })
  },
  changeSchoolNameTarget(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        school_t: e.detail.value
      }
    })
  },
  changeStage1(e) {
    let value = e.detail.value
    this.setData({
      stageValue1: value,
    })
  },
  changeStage(e) {
    let value = e.detail.value
    this.setData({
      stageValue: value,
    })
  },
  changeColumncStage1(e) {
    let data = {
      stageArray1: this.data.stageArray1
    }
    let column = e.detail.column
    let value  = e.detail.value
    if(column == 0 && value == 0) {
      data.stageArray1[1] = ['国内幼儿园', '国际幼儿园']
    }
    if(column == 0 && value == 1) {
      data.stageArray1[1] = ['国内小学', '国际小学']
    }
    if(column == 0 && value == 2) {
      data.stageArray1[1] = ['国内初中', '国际初中']
    }
    if(column == 0 && value == 3) {
      data.stageArray1[1] = ['国内高中', '国际高中']
    }
    if((column == 0 && value == 4) || (column == 0 && value == 5) || (column == 0 && value == 6)) {
      data.stageArray1[1] = ['国内大学', '海外大学']
    }
    this.setData(data)
  },
  changeColumncStage(e) {
    let data = {
      stageArray: this.data.stageArray
    }
    let column = e.detail.column
    let value  = e.detail.value
    if(column == 0 && value == 0) {
      data.stageArray[1] = ['国内幼儿园', '国际幼儿园']
    }
    if(column == 0 && value == 1) {
      data.stageArray[1] = ['国内小学', '国际小学']
    }
    if(column == 0 && value == 2) {
      data.stageArray[1] = ['国内初中', '国际初中']
    }
    if(column == 0 && value == 3) {
      data.stageArray[1] = ['国内高中', '国际高中']
    }
    if((column == 0 && value == 4) || (column == 0 && value == 5) || (column == 0 && value == 6)) {
      data.stageArray[1] = ['国内大学', '海外大学']
    }
    this.setData(data)
  },
  changeRegion1(e) {
    let value = e.detail.value
    this.setData({
      regionValue1: value,
      currentInfo: {
        ...this.data.currentInfo,
        city: value[0] + '-' + value[1]
      }
    })
  },
  changeRegion(e) {
    let value = e.detail.value
    this.setData({
      regionValue: value,
    })
  },

  inputValue(value) {
    if(this.data.inputType == 'target') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          school: value
        }
      })
    }
    if(this.data.inputType == 'current') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          major: value
        }
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