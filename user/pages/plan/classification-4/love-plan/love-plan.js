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
    categoryArray: [['恋爱规划'],
      ['提升个人魅力', '提升沟通技巧', '了解品酒知识', '了解天文地理常识', '身材管理', '提升厨艺']
    ],
    categoryValue: [],
    tradeArray: ['金融', '没有可自填'],
    tradeValue: '',
    incomeArray: ['10w以下', '10-20w', '20-30w', '30-50w', '50-100w','100w以上'],
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
      type1_t: data.categoryArray[0][0],
      type2_t: data.categoryArray[1][data.categoryValue[1]],
    }
    let current = {
      sex: data.sexArray[data.sexValue],
      stature: data.inputInfo.stature,
      weight: data.inputInfo.weight,
      trade: data.inputInfo.trade || data.tradeArray[data.tradeValue],
      incomeArray: data.incomeArray[data.incomeValue]
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
  changeIncome(e) {
    this.setData({
      incomeValue: e.detail.value
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
  changeSex(e) {
    this.setData({
      sexValue: e.detail.value
    })
  },
  changeRegion1(e) {
    this.setData({regionValue1: e.detail.value})
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
    if(this.data.inputType == 'trade') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          trade: value
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