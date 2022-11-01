// user/pages/plan/classification-1/match-plan/match-plan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planType: [
      ['运动类', '棋类', '舞蹈', '乐器类', '声乐类', '其他'], 
      ['游泳', '排球', '跑步','高尔夫', '没有可自填']
    ],
    planTypeIndex: [],
    targetArray: ['消遣时光', '增加兴趣爱好', '提高个人品位', '提高个人涵养', '没有可自填'],
    inputType: '',
    inputInfo: {},
    inputValue: '',
    targetIndex: -1,
    focus: false,
    height: 0
  },

  // 提交
  submitTap() {
    let data = this.data
    let target = {
      type1_t: data.planType[0][data.planTypeIndex[0]],
      type2_t: data.inputInfo.plan || data.planType[1][data.planTypeIndex[1]],
      target_t: data.inputInfo.target || data.targetArray[data.targetIndex]
    }
    let current = {}

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
  inputValue(value) {
    if(this.data.inputType == 'target') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          target: value
        }
      })
    }
    if(this.data.inputType == 'plan') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          plan: value
        }
      })
    }
  },
  changeInput(e) {
    this.inputValue(e.detail.value)
  },
  changeMulti(e) {
    let value = e.detail.value
    if(this.data.planType[1][value[1]] == '没有可自填') {
      this.setData({
        focus: true,
        inputType: 'plan'
      })
    }
    this.setData({
      planTypeIndex: value,
      inputInfo: {
        ...this.data.inputInfo,
        plan: ''
      }
    })
  },
  changeColumnc(e) {
    // 第几列改变
    let column = e.detail.column
    // 改变的值
    let value = e.detail.value
    let data = {
      planType: this.data.planType
    }
    if(column == 0 && value == 0) {
      data.planType[1] = ['游泳', '排球', '跑步','高尔夫', '没有可自填']
    }
    if(column == 0 && value == 1) {
      data.planType[1] = ['五子棋', '象棋', '国际象棋','围棋', '没有可自填']
    }
    if(column == 0 && value == 2) {
      data.planType[1] = ['民族', '交谊舞', '没有可自填']
    }
    if(column == 0 && value == 3) {
      data.planType[1] = ['钢琴', '小提琴', '大提琴','手风琴', '电子琴', '没有可自填']
    }
    if(column == 0 && value == 4) {
      data.planType[1] = ['美声', '民族', '通俗', '没有可自填']
    }
    if(column == 0 && value == 5) {
      data.planType[1] = ['咖啡品鉴', '面包烘培', '红酒品鉴','健身瘦身', '户外旅游', '钓鱼', '阅读', '健康养生', '防诈骗']
    }
    this.setData(data)
  },
  bindTargetChange(e) {
    this.setData({targetIndex: e.detail.value})
    if(e.detail.value != this.data.targetArray.length-1) return
    this.setData({
      focus: true,
      inputType: 'target'
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