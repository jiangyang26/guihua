// pages/home/home.js
var app = getApp();
var { planList, userPlanList, addColl, addtags, banner } = require('../../../utils/network/user')
var { getNavHeight } = require('./../../../utils/util')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 规划大数据
    planList: [],
    tabbar: '',
    current_page: '1',
    last_page: 0,
    offset: '10',
    screenButtonList: [
      // {id: 1, title: '按毕业院校', disabled: true},
      {id: 2, title: '按学历', disabled: false, options: ['初中', '高中', '大专', '本科', '研究生', '博士']},
      {id: 3, title: '按性别', disabled: false, options: ['男', '女']},
      {id: 4, title: '按工作年限', disabled: false, options: ['一年以下', '1-3年', '3-5年', '5-10年']}
    ],
    screenButtonIndex: -1,
    estimateList: [
      {id: 1, title: '耐心', count: 32},
      {id: 2, title: '细心', count: 32},
      {id: 3, title: '热情', count: 32}
    ],
    badgeToastText: '',
    screenIndex: -1,
    timer: null,
    currentChoose: 1,
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

    banner: [],
    info: {},
    userPlanListInfo: [],
    planCate: '',
    planValue: '',
  },

  // 规划类别筛选
  changeMulti(e) {
    let index = this.data.currentChoose
    let value = e.detail.value[1]
    let str = ''
    
    if(index == 1) {
      str = this.data.multiArray[1][value]
    }
    if(index == 2) {
      str = this.data.multiArray3[1][value]
    }
    if(index == 3) {
      str = this.data.multiArray5[1][value]
    }
    if(index == 4) {
      str = this.data.multiArray1[1][value]
    }
    if(index == 5) {
      str = this.data.multiArray4[1][value]
    }
    if(index == 6) {
      str = this.data.multiArray6[1][value]
    }
    if(index == 7) {
      str = this.data.multiArray2[1][value]
    }

    this.setData({
      current_page: '1',
      planCate: '5',
      planValue: str
    })
    this.getPlanInfoList()
  },
  toPlan(){
    wx.redirectTo({
      url: '/user/pages/plan/plan',
    })
  },
  toUserInfo() {
    let text_ = ``
    text_ = this.data.userinfotext
    wx.navigateTo({
      url: './userinfo/index',
      success: function(res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('textEvent', { data: text_ })
      }
    })
  },
  toMessageDetail(e) {
    let userplan_id = e.currentTarget.dataset.userplan_id
    let name = e.currentTarget.dataset.name
    let avatar = e.currentTarget.dataset.avatar
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/user/pages/message/leave-message/message?userplan_id=' + userplan_id + '&name=' + name + 
           '&avatar=' + avatar + '&type=' + type
    })
  },
  // 规划师筛选
  changeCate(e) {
    let event_value = e.detail.value
    let index = this.data.screenButtonIndex
    let type = ''
    let value = ''
    console.log(index);
    if(index == 0) {
      type = '2'
      if(event_value == '0' || event_value == '1' || event_value == '2') {
        value = '4'
      }
      if(event_value == '3') {
        value = '1'
      }
      if(event_value == '4') {
        value = '2'
      }
      if(event_value == '5') {
        value = '3'
      }
    }
    if(index == 1) {
      type = '3'
      if(event_value == '0') {
        value = '1'
      }
      if(event_value == '1') {
        value = '0'
      }
    }
    if(index == 2) {
      type = '4'
      if(event_value == '0') {
        value = '0'
      }
      if(event_value == '1') {
        value = '1-3'
      }
      if(event_value == '2') {
        value = '3-5'
      }
      if(event_value == '3') {
        value = '5-10'
      }
    }
    this.setData({
      current_page: '1',
      planCate: type,
      planValue: value
    })
    this.getPlanInfoList()
  },
  // 点赞
  tagTap(e) {
    let id = e.currentTarget.dataset.id
    let tag = e.currentTarget.dataset.tag

    let arr = [...this.data.userPlanListInfo]
    arr.find(item => {
      if(item.userplan_id == id) {
        item.tags.find(item_tag => {
          if(item_tag.tag == tag) {
            if(item_tag.isuser == 0) {
              addtags({
                userplan_id: id,
                tag: tag
              }).then(res => {
                item_tag.num += 1
                item_tag.isuser = 1
                this.setData({userPlanListInfo: arr})
              }).catch(err => {
                console.log(err);
              })
            }
            if(item_tag.isuser == 1) {
              item_tag.num -= 1
              item_tag.isuser = 0
            }
          }
        })
      }
    })
    this.setData({userPlanListInfo: arr})
    
  },
  // 收藏
  collTap(e) {
    let id = e.currentTarget.dataset.id + ''
    addColl(id).then(res => {
      if(res.data.code == 1) {
        let arr = [...this.data.userPlanListInfo]
        arr.find(item => {
          if(item.userplan_id == id) {
            if(item.iscoll == 0) {
              item.iscoll = 1
            } else {
              item.iscoll = 0
            }
          }
        })
        this.setData({
          userPlanListInfo: arr
        })
      }
    })
  },

  toTeacherDetail(e) {
    let userplan_id = e.currentTarget.dataset.userplan_id
    wx.navigateTo({
      url: '/user/pages/profile/fillIn/fillIn?userplan_id=' + userplan_id,
    })
  },
  handleCurrentChoose(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      currentChoose: index
    })
  },
  // 徽章点击
  badgeTapToast(e) {
    clearTimeout(this.data.timer)
    const data = e.currentTarget.dataset
    this.setData({badgeToastText: data.text, screenIndex: data.index})
    this.data.timer = setTimeout(() => {
      this.setData({screenIndex: -1})
      clearTimeout(this.data.timer)
    }, 1200);
  },

  screenButtonTap(e) {
    const index = e.currentTarget.dataset.index
    this.setData({screenButtonIndex: index})

  },

  toTeacher() {
    wx.redirectTo({
      url: '/planner/pages/home/home',
    })
  },
  getPlanInfoList() {
    if(this.data.current_page > this.data.last_page) {
      if(this.data.last_page != 0) {
        app.toast('没有更多数据了', 'none')
        return
      }
    }
    userPlanList({
      page: this.data.current_page,
      offset: this.data.offset,
      type: this.data.planCate,
      value: this.data.planValue
    }).then(res => {
      if(res.data.code == 1) {
        console.log(res);
        let arr = res.data.data.data
        this.setData({
          userPlanListInfo: this.data.current_page == 1 ? arr : [
            ...this.data.userPlanListInfo,
            ...arr
          ],
          last_page: res.data.data.last_page,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideHomeButton();

    banner().then(res => {
      app.globalData.banner = [
        ...res.data.data
      ]
      this.setData({
        banner: res.data.data.filter(item => item.name == '用户端轮播图')
      })
    })

    // 规划大数据
    planList().then(res => {
      let data = res.data.data.user
      let user_arr = Object.entries(data)
      let arr = [
        {id: 1, image: '/user/start/home/icon01.png', title: user_arr[0][0], counter: user_arr[0][1]},
        {id: 2, image: '/user/start/home/icon02.png', title: user_arr[1][0], counter: user_arr[1][1]},
        {id: 3, image: '/user/start/home/icon03.png', title: user_arr[2][0], counter: user_arr[2][1]},
        {id: 4, image: '/user/start/home/icon04.png', title: user_arr[3][0], counter: user_arr[3][1]},
        {id: 5, image: '/user/start/home/icon05.png', title: user_arr[4][0], counter: user_arr[4][1]}
      ]
      this.setData({
        planList: arr,
        userinfotext: res.data.data.userinfo
      })
    })

    // 规划师
    this.getPlanInfoList()
  },  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    getNavHeight(app)
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
    if(this.data.userPlanListInfo.length != 0) {
      let num = Number(this.data.current_page)
      num++
      this.setData({
        current_page: num + ''
      })
      this.getPlanInfoList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})