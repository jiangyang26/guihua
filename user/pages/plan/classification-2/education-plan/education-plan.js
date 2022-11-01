var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryArray: [['家庭教育规划'], 
      [
        '子女教育规划（学前）', '子女教育规划（幼儿园）', '子女教育规划（小学）', '子女教育规划（初中）', 
        '子女教育规划（高中）', '子女教育规划（大学）', '子女教育规划（就业）'
      ]
    ],
    categoryValue: '',
    targetArray: ['培养学习兴趣', '启蒙教育', '提高学习分数', '兴趣及生涯规划', '就业规划'],
    targetValue: '',
    inputType: '',
    inputInfo: {},
    focus: false,
    height: 0
  },

  // 提交
  submitTap() {
    let data = this.data
    let target = {
      type1: data.categoryArray[0][data.categoryValue[0]],
      type2: data.categoryArray[1][data.categoryValue[1]],
      target: data.targetArray[data.targetValue]
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
  changeTarget(e) {
    this.setData({targetValue: e.detail.value})
  },
  changeCategory(e) {
    this.setData({categoryValue: e.detail.value})
  },
  inputValue(value) {
    if(this.data.inputType == 'school') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          school: value
        }
      })
    }
    if(this.data.inputType == 'major') {
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