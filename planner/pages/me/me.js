// pages/me/me.js
var app = getApp();
var { badgeList, getinfos } = require('./../../../utils/network/planner')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    tabbar: '',
    banner: [],
    badgeInfo: {},
    tempFilesPath: '/assets/image/aaa.jpg',
    text: '你的的会员已过期避免影响使用，请及时联系平台缴纳会员费',
    marqueePace: 0.5,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
    size: 11,
    orientation: 'left',//滚动方向
    interval: 20, // 时间间隔,
    show: false,
    timer: null,
    intervalTimer: null,
    toastmove: false
  },

  // 平台勋章点击
  medalTap(e) {
    let index = e.currentTarget.dataset.index
    let str = ''
    if(index == 0) {
      str = '登陆达人成就勋章：规则：累积登陆小程序1次-点亮登陆达人勋章'
    }
    if(index == 1) {
      str = '规划大师成就勋章：规则：累积结算课时(次)1H或以上-点亮规划大师勋章'
    }
    if(index == 2) {
      str = '讲师大师成就勋章：规则：老师完成与平台签署1单委托协议-点亮讲师大师勋章'
    }
    if(index == 3) {
      str = '订单大师成就勋章：规则：成功向家长发起并签署完成1次协议-点亮订单大师勋章'
    }
    if(index == 4) {
      str = '咨询大师成就勋章：规则：与1名家长完成沟通-点亮咨询大师勋章'
    }
    if(index == 5) {
      str = '新手任务成就勋章：规则：完成阅读所有协议后-点亮新人任务勋章'
    }
    this.setData({
      toastmove: true,
      toast_text: str
    })
  },
  pageTap() {
    this.setData({
      toastmove: false
    })
  },
  touchEvent() {
    if(this.data.toastmove != true) return
    this.setData({
      toastmove: false
    })
  },
  uploadTap() {
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['pdf'],
      success(res) {
        wx.navigateTo({
          url: '/planner/pages/me/resume/resume',
          success(result) {
            result.eventChannel.emit('resume', { data: res })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      banner: app.globalData.banner.filter(item => item.name == '规划师端我的轮播图'),
      userInfo: wx.getStorageSync('userInfo'),
      navHeight: app.globalData.navHeight
    })
    badgeList().then(res => {
      this.setData({
        badgeInfo: res.data.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  clearTimer() {
    clearTimeout(this.data.timer)
    this.setData({
      timer: null
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
   vipToast() {
    this.clearTimer()
    clearInterval(this.data.intervalTimer)
    this.setData({intervalTimer: null, marqueeDistance: 0})
    
    // 页面显示
    var vm = this;
    var length = vm.data.text.length * vm.data.size;//文字长度
    var windowWidth = 150;
    vm.setData({
      length: length,
      windowWidth: windowWidth,
      marquee2_margin: length < windowWidth ? windowWidth - length : vm.data.marquee2_margin
    });

   if(true) {
     this.setData({
       show: true
     })
    vm.run1();
   }
    this.data.timer = setTimeout(() => {
      this.setData({
        show: false
      })
    }, 30000);
   },

  onShow: function () {
    wx.hideHomeButton()
    app.editTabBar1()

    getinfos().then(res => {
      this.setData({
        planInfo: res.data.data
      })
      let date = new Date()
      let vip_time_arr = this.data.planInfo.vip_times.split('-')
      let vip_time_last_arr = vip_time_arr[1].split('.')
      let vip_time_last = vip_time_last_arr[0] + '-' + vip_time_last_arr[1]
      let current_time_str = (date.getFullYear() + '-' + (date.getMonth() + 1)).replace(/-/g,"/")
      let current_time = Date.parse(current_time_str)
      let last_time = Date.parse(vip_time_last.replace(/-/g,"/"))

      if(current_time > last_time) {
        this.setData({
          show: true
        })
        this.vipToast()
      }

    })
  },
  run1: function () {
    var vm = this;
    vm.data.intervalTimer = setInterval(function () {
      if (-vm.data.marqueeDistance < vm.data.length) {
        vm.setData({
          marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
        });
      } else {
        clearInterval(vm.data.intervalTimer);
        vm.setData({
          marqueeDistance: vm.data.windowWidth
        });
        vm.run1();
      }
    }, vm.data.interval);
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.clearTimer()
    clearInterval(app.timer1)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(app.timer1)
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