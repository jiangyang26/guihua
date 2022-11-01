// pages/me/collection/collection.js
var app = getApp()

var { addpro } = require('./../../../../utils/network/planner')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio:1,
    banner: [],
    territoryList: [
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
    inputInfo: {},
    paramsInfo: {},
    currentIndex: -1,
  },


  changeOther(e) {
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        type2: e.detail.value
      }
    })
  },
  onChange(e) {
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        model_status: e.detail
      }
    })
  },
  // 提交
  submitTap() {
    let info = this.data.inputInfo
    let params = {
      ...this.data.paramsInfo,
      model_status: this.data.paramsInfo.model_status != undefined ? this.data.paramsInfo.model_status + '' : '1',
      times: info.step2,
      nums: info.step3,
      price: info.step4,
      xy_user_name: info.step6,
      idcard: info.step7,
      xy_user_mobile: info.step8,
      xy_user_sn: info.step9,
    };

    if(app.entry(params) == false) return
    if(params.idcard.length < 18) {
      app.toast('请完整填写身份证号码', 'none')
      return
    }
    if(params.xy_user_mobile.length < 11) {
      app.toast('请完整填写手机号码', 'none')
      return
    }

    addpro(params).then(res => {
      if(res.data.code == 1) {
        app.toast('提交成功', 'success')
        this.setData({
          paramsInfo: {},
          inputInfo:{},
          radio:1
        })
      }
    })
  },

  // 规划类别
  changeTerritory(e) {
    let value = e.detail.value
    let index = this.data.currentIndex
    let type = this.data.territoryList[index].title[0][0]
    let type2 = this.data.territoryList[index].title[1][value[1]]
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        type, type2
      },
    })
  },
  territoryTap(e) {
    let index = e.currentTarget.dataset.index
    if(index == 7) {
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          type: "其他",
          type2: ''
        }
      })
    }
    this.setData({
      currentIndex: index
    })
  },

  changeInput1(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        step2: e.detail.value
      }
    })
  },
  changeInput2(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        step3: e.detail.value
      }
    })
  },
  changeInput3(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        step4: e.detail.value
      }
    })
  },
  changeInput4(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        step6: e.detail.value
      }
    })
  },
  changeInput5(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        step7: e.detail.value
      }
    })
  },
  changeInput6(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        step8: e.detail.value
      }
    })
  },
  changeInput7(e) {
    this.setData({
      inputInfo: {
        ...this.data.inputInfo,
        step9: e.detail.value
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      banner: app.globalData.banner.filter(item => item.name == '规划师端发起协议及收款轮播图')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})