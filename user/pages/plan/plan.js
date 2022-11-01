// pages/plan/plan.js
var app = getApp();
var { addLlan, planCaseList } = require('./../../../utils/network/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    tabbar: '',
    currentChoose: 0,
    target: {},
    targetValue: '',
    current: {},
    currentValue: '',
    multiArray: [
      ['升学(学历)规划'],
      ['竞赛类规划','留学类规划','学习成绩类规划','升学类规划']
    ],
    multiArray1: [
      ['兴趣(能力)规划'],
      ['兴趣类规划（老年）','兴趣类规划（成人）', '兴趣类规划（青少年）']
    ],
    multiArray2: [
      ['企业及个人IP提升规划'],
      ['企业IP打造规划', '个人IP打造规划']
    ],
    multiArray3: [
      ['个人成长规划'],
      ['心理辅导规划','恋爱规划', '落户规划', '理财规划', '创业规划']
    ],
    multiArray4: [
      ['职场提升规划'],
      ['职业生涯规划','职业资格证规划', '求职规划']
    ],
    multiArray5: [
      ['家庭成长规划'],
      ['财产（养老）规划', '家庭教育规划']
    ],
    multiArray6: [
      ['企业成长规划'],
      ['企业融资规划','企业财税规划', '企业上市规划', '企业员工提升规划']
    ],
    ageList: [{values: [{ text: '目前年龄', disabled: true }]},{values: [{ text: '实现目标年龄', disabled: true }]}],
    optAgeList: [],
    ageFlag: false,
    // 显示popup
    isShow: false,
    yearIsShow: false,
    yearList: [{values: [{ text: '目前时间', disabled: true }]},{values: [{ text: '实现目标时间', disabled: true }]}],
    optYearList: [],
    yearFlag: false,
    plannerList: [
      {id: 1, title: '本人', image: '/user/start/allplan/_pic01.png'},
      {id: 2, title: '孩子', image: '/user/start/allplan/_pic02.png'},
      {id: 3, title: '家人', image: '/user/start/allplan/_pic03.png'},
      {id: 4, title: '企业', image: '/user/start/allplan/_pic04.png'}
    ],
    currentPlanner: -1,
    paramsInfo: {},
    planCaseList: []
  },

  fastTap() {
    let info = this.data.paramsInfo
    let params = {
      type: info.type,
      type2: info.type2,
      ql_name: info.planner,
      ql_times: info.times,
      ql_info: this.data.targetValue,
      ql_type: this.data.currentValue
    }

    if(params.ql_name == '' || params.ql_name == null || params.ql_name == undefined) {
      app.toast('请选择规划人', 'none')
      return
    }
    if(params.type == '' || params.type == null || params.type == undefined) {
      app.toast('请输入计划实现的目标', 'none')
      return
    }
    if(params.ql_times == '' || params.ql_times == null || params.ql_times == undefined) {
      app.toast('请选择实现目标耗时', 'none')
      return
    }
    if(params.ql_info == '' || params.ql_info == null || params.ql_info == undefined) {
      app.toast('请输入实现目标内容', 'none')
      return
    }
    if(params.ql_type == '' || params.ql_type == null || params.ql_type == undefined) {
      app.toast('请输入目前状态', 'none')
      return
    }

    addLlan(params).then(res => {
      if(res.data.code == 1) {
        app.toast('发布成功', 'success');
        this.setData({

          paramsInfo: {
            type: '',
            type2: '',
            planner: '',
            times: ''
          },
          currentPlanner: -1,
          targetValue: '',
          currentValue: '',
          ageFlag: false,
          yearFlag: false,
          currentChoose: 0
        })
        return
      }
      app.toast('发布失败', 'error')
    })

  },
  // 第三步
  changePlan3(e) {
    this.setData({
      targetValue: e.detail.value
    })
  },
  // 第四步
  changePlan4(e) {
    this.setData({
      currentValue: e.detail.value
    })
  },
  targetStr(obj) {
    let obj_ = Object.entries(obj)
    let str = ''
    obj_.forEach((item, index) => {
      if(index == obj_.length - 1) {
        str = str + item[1]
      }else{
        str = str + item[1] + ','
      }
    })

    return str
  },
  handleCurrentSelect(event) {
    const index = event.currentTarget.dataset.index
    let title = ''
    if(index == 0) {
      title = '本人'
    }
    if(index == 1) {
      title = '孩子'
    }
    if(index == 2) {
      title = '家人'
    }
    if(index == 3) {
      title = '企业'
    }
    this.setData({
      currentPlanner: index,
      paramsInfo: {
        ...this.data.paramsInfo,
        planner: title
      }
    })
  },
  // 关闭popup
  onClose() {
    this.setData({
      isShow: false,
      yearIsShow: false
    })
  },
  // 弹出popup
  showPopup() {
    this.setData({
      isShow: true
    })
  },
  showPopupYear() {
    this.setData({
      yearIsShow: true
    })
  },
  tapCancel() {
    this.setData({isShow: false})
  },
  tapConfirm(e) {
    let value = e.detail.value
    this.setData({
      optAgeList: value,
      ageFlag: true, isShow: false, 
      yearFlag: false,
      paramsInfo: {
        ...this.data.paramsInfo,
        times: '目前' + value[0].text + ',实现目标' + value[1].text
      }
    })
  },
  yearTapCancel() {
    this.setData({yearIsShow: false})
  },
  yearTapConfirm(e) {
    let value = e.detail.value
    this.setData({
      optYearList: value, 
      yearFlag: true, 
      yearIsShow: false, ageFlag: false,
      paramsInfo: {
        ...this.data.paramsInfo,
        times: value[0].text + '开始,' + value[1].text + '实现目标'
      }
    })
  },

  bindMultiPickerChange7(e){
    let value = e.detail.value[1]

    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        type: this.data.multiArray2[0][0],
        type2: this.data.multiArray2[1][value]
      }
    })
    if(value == 0) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-7/enterprise-plan/enterprise-plan',
      })
    }
    if(value == 1) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-7/individual-plan/individual-plan',
      })
    }
  },
  bindMultiPickerChange6(e){
    let value = e.detail.value[1]

    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        type: this.data.multiArray6[0][0],
        type2: this.data.multiArray6[1][value]
      }
    })
    if(value == 0) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-6/finance-plan/finance-plan',
      })
    }
    if(value == 1) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-6/tax-plan/tax-plan',
      })
    }
    if(value == 2) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-6/market-plan/market-plan',
      })
    }
    if(value == 3) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-6/staff-plan/staff-plan',
      })
    }
  },
  bindMultiPickerChange5(e){
    let value = e.detail.value[1]

    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        type: this.data.multiArray1[0][0],
        type2: this.data.multiArray1[1][value]
      }
    })
    if(value == 0) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-5/old-plan/old-plan',
      })
    }
    if(value == 1) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-5/grow-up-plan/grow-up-plan',
      })
    }
    if(value == 2) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-5/young-boy-plan/young-boy-plan',
      })
    }
  },
  bindMultiPickerChange4(e){
    let value = e.detail.value[1]

    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        type: this.data.multiArray3[0][0], 
        type2: this.data.multiArray3[1][value]
      }
    })
    if(value == 0) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-4/psychology-plan/psychology-plan',
      })
    }
    if(value == 1) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-4/love-plan/love-plan',
      })
    }
    if(value == 2) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-4/settle-plan/settle-plan',
      })
    }
    if(value == 3) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-4/money-plan/money-plan',
      })
    }
    if(value == 4) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-4/undertaking-plan/undertaking-plan',
      })
    }
  },
  bindMultiPickerChange3(e){
    let value = e.detail.value[1]

    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        type: this.data.multiArray4[0][0],
        type2: this.data.multiArray4[1][value]
      }
    })
    if(value == 0) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-3/occupation-plan/occupation-plan',
      })
    }
    if(value == 1) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-3/certificate-plan/certificate-plan',
      })
    }
    if(value == 2) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-3/job-plan/job-plan',
      })
    }
  },
  bindMultiPickerChange2(e){
    let value = e.detail.value[1]

    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        type: this.data.multiArray5[0][0],
        type2: this.data.multiArray5[1][value]
      }
    })
    if(value == 0) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-2/property-plan/property-plan',
      })
    }
    if(value == 1) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-2/education-plan/education-plan',
      })
    }
  },
  bindMultiPickerChange1(e){
    let value = e.detail.value[1]

    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        type: this.data.multiArray[0][0],
        type2: this.data.multiArray[1][value]
      }
    })
    if(value == 0) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-1/match-plan/match-plan',
      })
    }
    if(value == 1) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-1/study-abroad-plan/study-abroad-plan',
      })
    }
    if(value == 2) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-1/study-plan/study-plan',
      })
    }
    if(value == 3) {
      wx.navigateTo({
        url: '/user/pages/plan/classification-1/enter-plan/enter-plan',
      })
    }
  },

  handleCurrentChoose(e) {
    const index = e.currentTarget.dataset.index
    if(index == 8){
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          type:'其他'
        }
      })
    }
    this.setData({
      currentChoose: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideHomeButton();

    this.setData({
      banner: app.globalData.banner.filter(item => item.name == '全龄规划轮播图')
    })

    planCaseList().then(res => {
      if(res.data.code == 1) {
        this.setData({
          planCaseList: res.data.data.data
        })
      }
    })

    let arr = [...this.data.ageList]
    let arrYear = [...this.data.yearList]
    for (let i = 0; i < 100; i++) {
      let produ = i+1+'岁'
      let produ_year = 2022+i+'年'
      arr[0].values.push({text: produ})
      arr[1].values.push({text: produ})
      arrYear[0].values.push({text: produ_year})
      arrYear[1].values.push({text: produ_year})
    }
    this.setData({
      ageList: arr,
      yearList: arrYear
    })
    
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
    app.editTabBar();    //显示自定义的底部导航
    if(JSON.stringify(this.data.target) != '{}') {
      this.setData({
        targetValue: this.targetStr(this.data.target)
      })
    }
    if(JSON.stringify(this.data.current) != '{}') {
      this.setData({
        currentValue: this.targetStr(this.data.current)
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(app.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(app.timer)
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