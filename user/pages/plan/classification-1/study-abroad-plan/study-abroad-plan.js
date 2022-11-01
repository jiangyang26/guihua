var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['直接出国完成学业', '中外合作办学', '在国内完成学业'],
    arrayIndex: -1,
    amongArray: ['请先选择类别'],
    amongIndex: -1,

    inputType: '',
    inputInfo: {},
    focus: false,
    height: 0
  },

  // 提交
  submitTap() {
    let data = this.data
    let target = {
      type_t: data.array[data.arrayIndex],
      target_t: data.inputInfo.country || data.amongArray[data.amongIndex],
      school_t: data.inputInfo.school_t,
      major_t: data.inputInfo.major_t
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
  changeSchool(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        school_t: e.detail.value
      }
    })
  },
  changeMajor(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        major_t: e.detail.value
      }
    })
  },
  changeAmong(e) {
    let value = e.detail.value
    if(this.data.amongArray[value] == '请先选择类别') return 
    if(this.data.amongArray[value] == '其他可自填') {
      this.setData({
        focus: true,
        inputType: 'country'
      })
      return
    }
    this.setData({
      amongIndex: value,
      inputInfo: {
        ...this.data.inputInfo,
        country: ''
      }
    })

  },
  changeOutermost(e) {
    let value = e.detail.value
    this.setData({
      arrayIndex: value,
      amongIndex: -1,
    })
    if(value == 0) {
      let arr = []
      arr = [
        '英国', '美国', '加拿大', '澳大利亚', '新西兰', '中国香港', '中国澳门', '法国', '匈牙利', '荷兰',
        '瑞典', '意大利', '西班牙', '泰国', '马来西亚', '新加坡', '爱尔兰', '韩国', '日本', '其他可自填'
      ]
      this.setData({amongArray: arr})
    }
    if(value == 1) {
      let arr = []
      arr = ['国内读1年+国外读3年拿海外本科学历', '国内读2年+国外读2年拿海外本科学历', 
      '国内读3年+国外读1年拿海外本科学历', '国内读3年+国外读2年拿海外本硕学历', '国内读1年+国外读1年拿海外硕士学历']
      this.setData({amongArray: arr})
    }
    if(value == 2) {
      let arr = []
      arr = ['国内就读4年拿海外本科学历', '国内就读1年拿海外硕士学历', '国内就读2年拿海外硕士学历']
      this.setData({amongArray: arr})
    }
  },
  inputValue(value) {
    if(this.data.inputType == 'country') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          country: value
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