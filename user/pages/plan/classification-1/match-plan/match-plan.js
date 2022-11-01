// user/pages/plan/classification-1/match-plan/match-plan.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiMatch: [
      ['国内竞赛', '国际竞赛'], [
        '全国中学生数学奥林匹克竞赛', '全国中学生物理奥林匹克竞赛', '全国中学生化学奥林匹克竞赛',
        '全国中学生生物学奥林匹克竞赛', '全国青少年信息学奥林匹克联赛', '全国青少年科技创新大赛',
        '“明天小小科学家”竞赛', '全国中小学电脑制作活动', '全国新概念作文大赛',
        '全国中小学创新作文大赛', '语文报杯全国中学生作文大赛', '“叶圣陶”杯中学生新作文大赛&中华“圣陶杯”中学生作文大赛',
        '全国创新英语大赛', '全国中学生英语能力竞赛', '中国青少年机器人竞赛',
        '国际科学与工程大奖赛', '国际环境科研项目奥林匹克竞赛', '“北大培文杯”全国青少年创意写作大赛',
        '“21世纪杯”全国中小学生英语演讲比赛', '中央电视台“希望之星”英语风采大赛', 
        '“外研社杯”全国中学生英语技能大赛&“外教社杯”全国中学生英语能力大赛 ', '没有可自填'
      ]
    ],
    multiMatchIndex: [],
    array: ['研究生', '本科', '大专', '高中', '初中', '小学', '幼儿园'],

    targetArray: ['获奖', '参与体验', '没有可自填'],
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
      type_t: data.multiMatch[0][data.multiMatchIndex[0]],
      name_t: data.multiMatch[1][data.multiMatchIndex[1]],
      target_t: data.inputValue
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
        inputValue: value
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
  changeColumnc(e) {
    // 第几列改变
    let column = e.detail.column
    // 改变的值
    let value = e.detail.value
    let data = {
      multiMatch: this.data.multiMatch
    }
    if(column == 0 && value == 1) {
      data.multiMatch[1] = [
        'AMC数学竞赛', '澳大利亚数学竞赛', '斯坦福数学锦标赛', 'pumac普林斯顿大学数学竞赛',
        '滑铁卢大学高斯数学竞赛', '丘成桐数学奖', 'BAAO', '澳大利亚科学挑战赛',
        '加拿大物理大奖赛', '丘成桐物理奖', 'Physics Bowl', '丘成桐化学奖',
        'C3L6剑桥化学挑战赛', 'YBTC', 'UKCHO', '多伦多大学生物竞赛',
        '丘成桐生物奖', 'BioGENEiusChallenges', 'Brain Bee', '谷歌CodeJam编程赛',
        '丘成桐计算机奖', 'Kaggle大数据竞赛', '哥大ME商赛', 'DECA商赛',
        '沃顿I4A商赛', '马歇尔学会经济论文竞赛', 'KWHS Investment', '没有可自填'
      ]
    }
    if(column == 0 && value == 0) {
      data.multiMatch[1] = [
        '全国中学生数学奥林匹克竞赛', '全国中学生物理奥林匹克竞赛', '全国中学生化学奥林匹克竞赛',
        '全国中学生生物学奥林匹克竞赛', '全国青少年信息学奥林匹克联赛', '全国青少年科技创新大赛',
        '“明天小小科学家”竞赛', '全国中小学电脑制作活动', '全国新概念作文大赛',
        '全国中小学创新作文大赛', '语文报杯全国中学生作文大赛', '“叶圣陶”杯中学生新作文大赛&中华“圣陶杯”中学生作文大赛',
        '全国创新英语大赛', '全国中学生英语能力竞赛', '中国青少年机器人竞赛',
        '国际科学与工程大奖赛', '国际环境科研项目奥林匹克竞赛', '“北大培文杯”全国青少年创意写作大赛',
        '“21世纪杯”全国中小学生英语演讲比赛', '中央电视台“希望之星”英语风采大赛', 
        '“外研社杯”全国中学生英语技能大赛&“外教社杯”全国中学生英语能力大赛 ', '没有可自填'
      ]
    }
    this.setData(data)
  },
  bindTargetChange(e) {
    this.setData({inputValue: this.data.targetArray[e.detail.value]})
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