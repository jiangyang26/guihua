// pages/fast/fast.js
var app = getApp();
var { addPlanTo } = require('./../../../utils/network/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {

    recruit: [
      {id: 1, title: [['升学(学历)规划'],
      ['竞赛类规划','留学类规划','学习成绩类规划','升学类规划']], active: false, disabled: false},
      {id: 2, title: [['个人成长规划'],
      ['心理辅导规划','恋爱规划', '落户规划', '理财规划', '创业规划']], active: false, disabled: false},
      {id: 3, title: [['家庭成长规划'],
      ['财产（养老）规划','家庭教育规划']], active: false, disabled: false},
      {id: 4, title: [['兴趣(能力)规划'],
      ['兴趣类规划（老年）','兴趣类规划（成人）', '兴趣类规划（青少年）']], active: false, disabled: false},
      {id: 5, title: [['职场提升规划'],
      ['职业生涯规划','职业资格证规划', '求职规划']], active: false, disabled: false},
      {id: 6, title: [['企业成长规划'],
      ['企业融资规划','企业财税规划', '企业上市规划', '企业员工提升规划']], active: false, disabled: false},
      {id: 7, title: [['企业及个人品牌IP提升规划'],
      ['企业IP打造规划', '个人IP打造规划']], active: false, disabled: false},
      {id: 8, title: [['其他'], []], active: false, disabled: true},
    ],
    recruitIndex: -1,
    tabbar: '',
    array: ['线上', '线下', '线上+线下'],
    index: -1,
    detail: [
      {id: 1, scope_: '100-200/小时'},
      {id: 2, scope_: '面议'}
    ],
    currentIndex: 0,
    value: '',
    checkedCategory: '',
    paramsInfo: {},
    focus: false,
    height: 56
  },

  // 发布
  fastTap() {
    let info = this.data.paramsInfo
    let params_s = {
      type: info.type,
      type2: info.type2,
      ks_name: info.name,
      ks_mobile: info.phone,
      ks_status: info.give,
      ks_address: info.give == '线上' ? '线上地址' : info.address,
      ks_price: info.price,
    }
    let params_n = {
      ks_desc: info.other
    }
    if(app.entry(params_s) == false) return 

    if(params_s.ks_mobile.length < 11) {
      app.toast('请完整填写手机号码', 'none')
      return
    }

    addPlanTo({
      ...params_s,
      ...params_n
    }).then(res => {
      if(res.data.code == 1) {
        app.toast('发布成功', 'success')
        this.setData({
          paramsInfo: {
            type: '',
            type2: '',
            name: '',
            phone: '',
            give: '',
            price: '',
            other:''
          },
          checkedCategory: '',
          recruitIndex: -1,
          index: -1,
          currentIndex: 0,
          value: ''
        })
        return
      }
      app.toast('发布失败', 'error')
    })
  },
  changeAddress(e) {
    let value = e.detail.value
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        address: value
      }
    })
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

  changeOther(e) {
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        other: e.detail.value
      }
    })
  },
  changePhone(e) {
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        phone: e.detail.value
      }
    })
  },
  changeName(e) {
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        name: e.detail.value
      }
    })
  },
  activeTap(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentIndex: index
    })
    if(index == '1') {
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          price: this.data.value
        }
      })
    }
    if(index == '2') {
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          price: '面议'
        },
        value: ''
      })
    }
  },
  changeInput(e) {
    this.setData({
      value: e.detail.value,
      paramsInfo: {
        ...this.data.paramsInfo,
        price: e.detail.value
      }
    })
  },
  changeRecruit(e) {
    let value = e.detail.value[1]
    let type = this.data.recruit[this.data.recruitIndex].title[0][0]
    let type2 = this.data.recruit[this.data.recruitIndex].title[1][value]
    this.setData({
      checkedCategory: type2,
      paramsInfo: {
        ...this.data.paramsInfo,
        type: type,
        type2: type2
      }
    })
  },
  tapHandler(event) {
    const index = event.currentTarget.dataset.index
    this.setData({
      recruitIndex: index
    })
  },
  changeGive(e) {
    let value = e.detail.value
    if(value == '1' || value == '2') {
      this.setData({
        focus: true
      })
    }
    this.setData({
      index: e.detail.value, 
      paramsInfo: {
        ...this.data.paramsInfo,
        give: this.data.array[value]
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideHomeButton()

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