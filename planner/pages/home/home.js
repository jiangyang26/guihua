// pages/home/home.js
var app = getApp();
var { userPlan, getinfos, planCate, planList, addColl } = require('./../../../utils/network/planner');
var { banner } = require('./../../../utils/network/user');

var { formatPhoneNumber } = require('./../../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: ['线上', '线下', '线上/线下均可'],
    value: -1,
    statusInfo: {},
    active: -1,
    tabbar: '',
    planList: [],
    banner: [],
    planCateList: {},
    paramsInfo: {
      page: '1',
      offset: '10',
      order: '',
      status: ''
    },
    last_page: 0,
    navHeight: 0,
    screenArr: [
      {title: '按收藏量', active: false},
      {title: '按点击量', active: false},
      {title: '按更新时间', active: false},
    ],
    terrTagList: [],
    category: [
      {id: 1, title: [['升学(学历)规划'],
      ['竞赛类规划','留学类规划','学习成绩类规划','升学类规划']], checked: false, disabled: false},
      {id: 2, title: [['个人成长规划'],
      ['心理辅导规划','恋爱规划', '落户规划', '理财规划', '创业规划']], checked: false, disabled: false},
      {id: 3, title: [['家庭成长规划'],
      ['财产（养老）规划','家庭教育规划']], checked: false, disabled: false},
      {id: 4, title: [['兴趣(能力)规划'],
      ['兴趣类规划（老年）','兴趣类规划（成人）', '兴趣类规划（青少年）']], checked: false, disabled: false},
      {id: 5, title: [['职场提升规划'],
      ['职业生涯规划','职业资格证规划', '求职规划']], checked: false, disabled: false},
      {id: 6, title: [['企业成长规划'],
      ['企业融资规划','企业财税规划', '企业上市规划', '企业员工提升规划']], checked: false, disabled: false},
      {id: 7, title: [['企业及个人品牌IP提升规划'],
      ['企业IP打造规划', '个人IP打造规划']], checked: false, disabled: false},
      {id: 8, title: [['其他'], []], checked: false, disabled: true},
    ],
    currentIndex: -1
  },


  changeTerritory(e) {
    let type2 = this.data.category[this.data.currentIndex].title[1][e.detail.value[1]]
    let type = this.data.category[this.data.currentIndex].title[0][0]
    console.log(type, type2);
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        type: type,
        type2: type2,
        page: '1'
      }
    });
    this.getPlanList()
  },
  handleCategoryClick(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentIndex: index
    })
  },
  // 规划类/快速发布 订单线索
  collScreenTap(e) {
    let status = e.currentTarget.dataset.status
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        page: '1',
        status: status
      }
    })
    this.getPlanList()
  },
  // 筛选
  changeScree(e) {
    let value = e.detail.value
    let str = ''
    if(value == '0') {
      str = '线上'
    }
    if(value == '1') {
      str = '线下'
    }
    if(value == '2') {
      str = '均可'
    }
    this.setData({
      value,
      paramsInfo: {
        ...this.data.paramsInfo,
        ks_status: str,
        page: '1'
      },
    })
    this.getPlanList()
  },
  toUserPlanInfo() {
    let text_ = this.data.userplaninfo
    wx.navigateTo({
      url: './userplaninfo/index',
      success: function(res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('textEvent', { data: text_ })
      }
    })
  },
  toMessageDetaiil(e) {
    let type = e.currentTarget.dataset.type
    let user_id = e.currentTarget.dataset.user_id
    let id = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: '/planner/pages/message/leave-message/message?user_id=' + user_id + '&type=' + type + '&id=' + id + '&name=' + name
    })
  },  
  // 收藏
  addCollTap(e) {
    let id = e.currentTarget.dataset.id
    let iscoll = e.currentTarget.dataset.iscoll

    let plan_arr = this.data.planInfoList
    let fast_arr = this.data.fastInfoList
    plan_arr.forEach(item => {
      if(id == item.id) {
        if(iscoll == 0) {
          item.iscoll = 1
          item.coll = item.coll + 1
        }
        if(iscoll == 1) {
          item.iscoll = 0
          item.coll = item.coll - 1
        }
      }
    });
    fast_arr.forEach(item => {
      if(id == item.id) {
        if(iscoll == 0) {
          item.iscoll = 1
          item.coll = item.coll + 1
        }
        if(iscoll == 1) {
          item.iscoll = 0
          item.coll = item.coll - 1
        }
      }
    });
    this.setData({
      planInfoList: plan_arr,
      fastInfoList: fast_arr
    })

    addColl(id).then(res => {})
  },
  toFastDetail(e) {
    let plan_id = e.currentTarget.dataset.plan_id
    wx.navigateTo({
      url: './fast-detail/fast-detail/fast-detail?plan_id=' + plan_id,
    })
  },
  toPlanDetail(e) {
    let plan_id = e.currentTarget.dataset.plan_id
    wx.navigateTo({
      url: './fast-detail/school-plan/school-plan?plan_id=' + plan_id,
    })
  },
  toSignUp() {
    wx.navigateTo({
      url: '/planner/pages/signUp/signUp',
    })
  },
  toSelectClass() {
    wx.navigateTo({
      url: '/planner/pages/seleClass/seleClass',
    })
  },
  toTemplateClass() {
    wx.navigateTo({
      url: '/planner/pages/templateClass/templateClass',
    })
  },
  toTeacher_() {
    wx.navigateTo({
      url: '/planner/pages/home/teacher_/teacher_',
    })
  },
  toUser() {
    wx.redirectTo({
      url: '/user/pages/home/home',
    })
  },

  // 规划订单列表获取
  getPlanList() {
    if(this.data.paramsInfo.page > this.data.last_page) {
      if(this.data.last_page != 0) {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
        return
      }
    }
    planList({
      ...this.data.paramsInfo
    }).then(res => {
      let arr = res.data.data.data
      arr.forEach(item => {
        if(item.status == 2) {
          item.ks_mobile = formatPhoneNumber(item.ks_mobile)
        }
      })
      this.setData({
        planInfoList: this.data.paramsInfo.page == '1' ? arr.filter(item => item.status == '1') : [
          ...this.data.planInfoList,
          ...arr.filter(item => item.status == '1')
        ],
        fastInfoList: this.data.paramsInfo.page == '1' ? arr.filter(item => item.status == '2') : [
          ...this.data.fastInfoList,
          ...arr.filter(item => item.status == '2')
        ],
        last_page: res.data.data.last_page
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    banner().then(res => {
      app.globalData.banner = res.data.data
      this.setData({
        banner: res.data.data.filter(item => item.name == '规划师端轮播图'),
      })
    })
    
    this.setData({
      navHeight: app.globalData.navHeight
    })
    userPlan().then(res => {
      let data = res.data.data.userplan
      let userplan_arr = Object.entries(data)
      let arr = [
        {id: 1, image: '/planner/start/icon/home_1.png', title: userplan_arr[0][0], counter: userplan_arr[0][1]},
        {id: 2, image: '/planner/start/icon/home_2.png', title: userplan_arr[1][0], counter: userplan_arr[1][1]},
        {id: 3, image: '/planner/start/icon/home_3.png', title: userplan_arr[2][0], counter: userplan_arr[2][1]},
        {id: 4, image: '/planner/start/icon/home_4.png', title: userplan_arr[3][0], counter: userplan_arr[3][1]},
        {id: 5, image: '/planner/start/icon/home_5.png', title: userplan_arr[4][0], counter: userplan_arr[4][1]}
      ]
      this.setData({
        planList: arr,
        userplaninfo: res.data.data.userplaninfo
      })
    })
    getinfos().then(res => {
      if(res.data.code != 1) return
      let data = res.data.data
      let arr_tag = []
      if(data.info_tags != '') {
        arr_tag = data.info_tags.split(',')
      }

      app.globalData.planInfo = res.data.data
      console.log(app.globalData.planInfo);
      
      this.setData({
        statusInfo: {
          status: res.data.data.status,
          bz_switch: res.data.data.bz_switch
        },
        terrTagList: arr_tag,
      })
    })

    planCate().then(res => {
      if(res.data.code == 1) {
        let arr = this.data.category
        let obj_arr = Object.entries(res.data.data)
        arr.forEach((item, index) => {
          if(index == 0) {
            item.num = obj_arr[0][1]
            return
          }
          if(index == 1) {
            item.num = obj_arr[1][1]
            return
          }
          if(index == 2) {
            item.num = obj_arr[3][1]
            return
          }
          if(index == 3) {
            item.num = obj_arr[5][1]
            return
          }
          if(index == 4) {
            item.num = obj_arr[6][1]
            return
          }
          if(index == 5) {
            item.num = obj_arr[2][1]
            return
          }
          if(index == 6) {
            item.num = obj_arr[4][1]
            return
          }
          if(index == 7) {
            item.num = obj_arr[7][1]
            return
          }
        })

        this.setData({
          category: arr
        })
      }
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
    wx.hideHomeButton()
    app.editTabBar1()
    this.getPlanList()
  },
  // 收藏量/点击量/更新时间筛选
  onTap(e){
    var active = e.currentTarget.dataset.index

    let arr = this.data.screenArr
    arr.forEach((item, index) => {
      
      if(index == active) {
        item.active = !item.active
      }else{
        item.active = false
      }
    })
   
    if(arr.filter(item => item.active == true).length == 0) {
      this.setData({
        active: active,
        screenArr: arr,
        paramsInfo: {
          ...this.data.paramsInfo,
          order: '',
          page: '1'
        }
      })
      this.getPlanList()
      return
    }

    let str = ''
    if(active == '0') {
      str = '2'
    }
    if(active == '1') {
      str = '1'
    }
    if(active == '2') {
      str = '4'
    }
    this.setData({
      active: active,
      screenArr: arr,
      paramsInfo: {
        ...this.data.paramsInfo,
        order: str,
        page: '1'
      }
    })
    this.getPlanList()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    clearInterval(app.timer1)
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        page: '1'
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(app.timer1)
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        page: '1'
      }
    })
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
    if(this.data.planInfoList.length != 0 || this.data.fastInfoList.length != 0) {
      let num = Number(this.data.paramsInfo.page)
      num++
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          page: num + ''
        }
      })
      this.getPlanList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})