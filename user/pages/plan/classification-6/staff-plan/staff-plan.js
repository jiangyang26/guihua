var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryArray: [['企业员工规划'], ['提升员工归属感', '提升员工积极性', '企业内部结构优化', 
      '提高员工工作效率', '提升员工办公能力', '中层管理者能力提升', '高层管理者能力提升', '没有可自填'
    ]],
    categoryValue: [],
    tradeArray: ['金融', 'IT', '科技', '互联网', '健康', '大数据', '广告', '教培', '媒体', '律所', '其他'],
    tradeValue: '',
    scaleArray1: ['100人以下', '100-500人', '500-1000人', '1000人以上', '没有可自填'],
    scaletValue1: '',
    timeValue: '',
    isMarketArray: ['是', '否'],
    isMarketValue: '',
    inputType: '',
    inputInfo: {},
    focus: false,
    height: 0
  },

  // 提交
  submitTap() {
    let data = this.data
    let target = {
      type1: data.categoryArray[0][0],
      type2: data.inputInfo.category || data.categoryArray[1][data.categoryValue[1]]
    }
    let current = {
      trade: data.inputInfo.trade || data.tradeArray[data.tradeValue],
      scale1: data.inputInfo.scale1 || data.scaleArray1[data.scaletValue1],
      scaleArray2: data.timeValue,
      preYear: data.isMarketArray[data.isMarketValue]
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
  changeIsMarket(e) {
    let value = e.detail.value
    this.setData({isMarketValue: value})
  },
  changeTime(e) {
    this.setData({
      timeValue: e.detail.value
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
  inputValue(value) {
    if(this.data.inputType == 'category') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          category: value
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