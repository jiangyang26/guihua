// package/pages/plan/study-plan/study-plan.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    regionValue: [],
    studyStageArray: ['研究生', '本科', '大专', '高中', '初中', '小学', '幼儿园', '没有可自填'],
    studyStageValue: '',
    courseArray: ['国内课程', '国际课程', '没有可自填'],
    courseValue: '',
    subjectArray: [
      '语文', '数学', '英语', '化学', '生物', '物理', '历史', '地理', '政治', '体育', '技术',
      '进阶数学', '科学', '心理学', '经济', '会计', '社会学', '高数', '计算机', '自然科学', '社会科学',
      '艺术', '没有可自填'
    ],
    subjectValue: '',
    fractionArray: [
      '70-80分', '80-90分', '90-100分', '100-110分', '110分-120分', '120分-130分', '130分-140分',
      '140分-150分', '150分-160分', 'Pass', 'Credit pass', '  Distinction', ' High Distinction',
      'First class honours', 'Second class honours, upper division', 'Second class honours, lower division',
      'Third class honours', 'Merit', 'Fail', 'A*', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-',
      'D+', 'D', 'D-', '没有可自填'
    ],
    fractionValue: '',
    inputType: '',
    inputInfo: {},
    focus: false,
    height: 0
  },

  // 提交
  submitTap() {
    let data = this.data
    let target = {
      city_t: data.regionValue[0],
      type_t: data.inputInfo.stage || data.studyStageArray[data.studyStageValue],
      school_t: data.inputInfo.school_t,
      course_t: data.inputInfo.course || data.courseArray[data.courseValue],
      subject: data.inputInfo.subject || data.subjectArray[data.subjectValue],
      fraction: data.inputInfo.fraction || data.fractionArray[data.fractionValue],
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
  changeFraction(e) {
    let value = e.detail.value
    if(value == this.data.fractionArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'fraction'
      })
      return
    }
    this.setData({
      fractionValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        fraction: ''
      }
    })
  },

  changeSubject(e) {
    let value = e.detail.value
    if(value == this.data.subjectArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'subject'
      })
      return
    }
    this.setData({
      subjectValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        subject: ''
      }
    })
  },
  changeCourse(e) {
    let value = e.detail.value
    if(value == this.data.courseArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'course'
      })
      return
    }
    this.setData({
      courseValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        course: ''
      }
    })
  },
  changeStudyStage(e) {
    let value = e.detail.value
    if(value == this.data.studyStageArray.length - 1) {
      this.setData({
        focus: true,
        inputType: 'stage'
      })
      return
    }
    this.setData({
      studyStageValue: value,
      inputInfo: {
        ...this.data.inputInfo,
        stage: ''
      }
    })
  },
  changeRegion(e) {
    this.setData({regionValue: e.detail.value})
  },

  inputValue(vlaue) {
    if(this.data.inputType == 'stage') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          stage: vlaue
        }
      })
    }
    if(this.data.inputType == 'course') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          course: vlaue
        }
      })
    }
    if(this.data.inputType == 'subject') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          subject: vlaue
        }
      })
    }
    if(this.data.inputType == 'fraction') {
      this.setData({
        inputInfo: {
          ...this.data.inputInfo,
          fraction: vlaue
        }
      })
    }
  },
  changeInput(e) {
    let value = e.detail.value
    this.inputValue(value)
  },
  handleInputFocus(e) {
    this.setData({
      height: e.detail.height
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