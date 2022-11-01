var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planTypeArray: [['建筑工程', '消防安全', '财会经济', '大健康', '心理', '医师', '职业资格'], 
      [
        '教师资格证', '一级建造师', '二级建造师', '一级造价工程师', '二级造价工程师', '监理工程师',
        '咨询工程师', '一级建筑师', '二级建筑师', '结构工程师', '给排水工程师', '城乡规划师',
        '房地产估价师', '环保工程师', '水利电力工程师', '化工工程师', '没有可自填'
      ]
    ],
    planTypeValue: [],
    targetArray: ['兴趣爱好', '能力提升', '工作需要', '求职需要', '升职需要', '没有可自填'],
    targetValue: '',
    regionValue: '',
    yearIncomeValue: '',
    mortgageArray: ['国企', '私企', '央企', '在读可不填', '自由职业', '创业/没有可自填'],
    mortgageValue: '',
    scaleArray1: ['1-10人', '10-100人', '500+', '1000+', '1w'],
    scaleValue1: '',
    useArray: ['行政', '市场', '运营', '高管', '没有可自填'],
    useValue: '',
    inputType: '',
    inputInfo: {},
    focus: false,
    height: 0
  },

  // 提交
  submitTap() {
    let data = this.data
    let target = {
      type1: data.planTypeArray[0][data.planTypeValue[0]],
      type2: data.planTypeArray[1][data.planTypeValue[1]],
      target: data.inputInfo.targetValue || data.targetArray[data.targetValue]
    }
    let current = {
      city: data.regionValue[0],
      mortgageArray: data.mortgageArray[data.mortgageValue],
      scaleArray1: data.scaleArray1[data.scaleValue1],
      useValue: data.inputInfo.useValue || data.useArray[data.useValue]
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
    this.setData({
      regionValue: e.detail.value
    })
  },
  changeColumncPlan(e) {
    let column = e.detail.column
    let value = e.detail.value
    let data = {
      planTypeArray: this.data.planTypeArray
    }
    if(column == 0 && value == 0) {
      data.planTypeArray[1] = [
        '教师资格证', '一级建造师', '二级建造师', '一级造价工程师', '二级造价工程师', '监理工程师',
        '咨询工程师', '一级建筑师', '二级建筑师', '结构工程师', '给排水工程师', '城乡规划师',
        '房地产估价师', '环保工程师', '水利电力工程师', '化工工程师', '没有可自填'
      ]
    }
    if(column == 0 && value == 1) {
      data.planTypeArray[1] = [
        '一级消防工程师', '二级消防工程师', '初级消防设施操作员', '中级消防设施操作员', 
        '初级注册安全工程师','中级注册安全工程师', '安全评价师-非安全员', '环境影响评价师'
      ]
    }
    if(column == 0 && value == 2) {
      data.planTypeArray[1] = [
        '初级经济师', '中级经济师', '高级经济师', '初级会计职称', '中级会计职称',
        '注册会计师', '初级管理会计师', '初级审计师', '中级审计师', '统计师',
        '税务师', '银行从业资格', '证券从业资格', '基金从业资格', '期货从业资格',
      ]
    }
    if(column == 0 && value == 3) {
      data.planTypeArray[1] = [
        '营养师', '健康管理师', '中医健康管理师', '失智老年照护', '育婴师',
        '中医康复理疗师', '中医养生保健师', '小儿推拿师', '体重控制师', '营养配餐师'
      ]
    }
    if(column == 0 && value == 4) {
      data.planTypeArray[1] = [
        '心理咨询师', '家庭教育指导师', '儿童教育指导师', '婚姻情感咨询师'
      ]
    }
    if(column == 0 && value == 5) {
      data.planTypeArray[1] = [
        '执业药师', '执业护士', '医学实践技能', '临床执业医师', '临床助理医师',
        '口腔执业医师', '口腔助理医师', '中医执业医师', '中医助理医师', '初级药师',
        '中级主管药师', '初级中药师'
      ]
    }
    if(column == 0 && value == 6) {
      data.planTypeArray[1] = [
        '一级人力资源师', '二级人力资源师', '三级人力资源师', '四级人力资源师',
        '导游证', '教师资格证', '翻译资格证'
      ]
    }
    this.setData(data)
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
  changeScale1(e) {
    this.setData({scaleValue1: e.detail.value})
  },
  changeMortgage(e) {
    this.setData({mortgageValue: e.detail.value})
  },
  changeYearIncome(e) {
    this.setData({yearIncomeValue: e.detail.value})
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
    if(this.data.inputType == 'targetValue') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          targetValue: value
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