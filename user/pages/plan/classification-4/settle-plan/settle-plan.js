// user/pages/plan/classification-1/match-plan/match-plan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionValue: [],
    stateArray: ['在读', '工作'],
    stateValue: '',
    categoryArray: [['落户规划'],
      ['北京落户规划', '上海落户规划', '广州落户规划', '深圳落户规划', '杭州落户规划', '其他城市落户规划']
    ],
    categoryValue: [],
    targetArray: ['了解落户政策', '协助指导落户难点'],
    targetValue: '',
    educationArray: ['博士', '硕士', '本科', '没有可自填'],
    educationValue: '',
    incomeArray: ['是', '否'],
    incomeValue: '',
    inputType: '',
    inputValue: '',
    inputInfo: {},
    targetIndex: -1,
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
      city: data.regionValue[0],
      state: data.stateArray[data.stateValue],
      education: data.inputInfo.education || data.educationArray[data.educationValue],
      stature: data.inputInfo.stature,
      time: data.inputInfo.weight,
      income: data.incomeArray[data.incomeValue]
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
  changeTarget(e) {
    this.setData({
      targetValue: e.detail.value
    })
  },  
  changeIncome(e) {
    this.setData({
      incomeValue: e.detail.value
    })
  },
  changeEducation(e) {
    let value = e.detail.value
    if(value == this.data.educationArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'education'
      })
      return
    }
    this.setData({
      educationValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        education: ''
      }
    })
  },
  inputTap(e) {
    let type = e.currentTarget.dataset.type
    this.setData({
      focus: true,
      inputType: type
    })
  },  
  changeCategory(e) {
    this.setData({
      categoryValue: e.detail.value
    })
  },
  changeState(e) {
    this.setData({
      stateValue: e.detail.value
    })
  },

  inputValue(value) {
    if(this.data.inputType == 'stature') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          stature: value
        }
      })
    }
    if(this.data.inputType == 'weight') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          weight: value
        }
      })
    }
    if(this.data.inputType == 'education') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          education: value
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