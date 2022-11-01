var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryArray: [['个人IP打造规划'], ['微信·视频号', '微信·公众号', '抖音', '快手', '小红书', '全部', '没有可自填']],
    categoryValue: [],
    targetArray: [
      '提高知名度（粉丝量）', '成为主播（知识分享）', '成为主播（带货）', '成为垂直领域达人（KOL）', '提高账号运营能力',
      '提高直播间运营（带货）能力', '签约公会获得主播扶持', '签约MCN机构获得短视频培训', '提高策划创意运营', 
      '获得第一个10w+点赞量', '掌握基本直播（短视频）技巧', '没有可自填' 
    ],
    targetValue: '',
    experienceArray: ['是', '否'],
    experienceValue: '',
    fansArray: ['1000以下', '1000-10000', '1-5w', '5w以上', '没有可自填'],
    fansValue: '',
    liveArray: ['未开通直播', '10万以下', '10-200万', '200-500万', '500万以上', '没有可自填'],
    liveValue: '',
    regionValue: [],
    inputType: '',
    inputInfo: {},
    focus: false,
    height: 0
  },

  // 提交
  submitTap() {
    let data = this.data
    let target = {
      category1: data.categoryArray[0][0],
      category2: data.inputInfo.category || data.categoryArray[1][data.categoryValue[1]],
      target: data.inputInfo.target || data.targetArray[data.targetValue]
    }
    let current = {
      experienceArray: data.experienceArray[data.experienceValue],
      fans: data.inputInfo.fans || data.fansArray[data.fansValue],
      live: data.inputInfo.live || data.liveArray[data.liveValue],
      city: data.regionValue[0]
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
  changeCategory(e) {
    let value = e.detail.value
    if(value[1] == this.data.categoryArray[1].length - 1) {
      this.setData({
        focus: true,
        inputType: 'category'
      })
      return
    }
    this.setData({
      categoryValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        category: ''
      }
    })
  },
  changeLive(e) {
    let value = e.detail.value
    if(value == this.data.liveArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'live'
      })
      return
    }
    this.setData({
      liveValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        live: ''
      }
    })
  },
  changeFans(e) {
    let value = e.detail.value
    if(value == this.data.fansArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'fans'
      })
      return
    }
    this.setData({
      fansValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        fans: ''
      }
    })
  },
  changeExperience(e) {
    this.setData({experienceValue: e.detail.value})
  },
  inputValue(value) {
    if(this.data.inputType == 'category') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          category: value
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
    if(this.data.inputType == 'fans') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          fans: value
        }
      })
    }
    if(this.data.inputType == 'live') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          live: value
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
    if(this.data.inputType == 'prePrice') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          prePrice: value
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