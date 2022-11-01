// app.js

var { leavingListUser } = require('./utils/network/user')
var { leavingListPlanner } = require('./utils/network/planner')
var { getNavHeight } = require('./utils/util');

App({
  globalData: {
    banner: [],
    userInfo: {},
    planInfo: {},
    token: '',
    isIOS: false,
    timer: null,
    timer1: null,
    navHeight: 60,
    //第一种底部导航栏显示
    tabBar: {
      isIOS: false,
      color: "#999999",
      selectedColor: "#f00",
      backgroundColor: "#fff",
      messageIsTrue: false,
      message: 'user',
      list: [
        {
          title: '',
          pagePath: "/user/pages/home/home",
          text: "首页",
          iconPath: "/user/start/tabbar/normal_home.png",
          selectedIconPath: "/user/start/tabbar/select_home.png",
          clas: "menu-item",
          selectedColor: "#5350D5",
          active: true
        },
        {
          title: '全龄规划',
          pagePath: "/user/pages/plan/plan",
          text: "全龄规划",
          iconPath: "/user/start/tabbar/normal_plan.png",
          selectedIconPath: "/user/start/tabbar/select_plan.png",
          selectedColor: "#5350D5",
          clas: "menu-item",
          active: false
        },
        {
          title: '',
          pagePath: "/user/pages/fast/fast",
          text: "快速发布",
          iconPath: "/user/start/tabbar/normal_fast.png",
          selectedIconPath: "/user/start/tabbar/select_fast.png",
          selectedColor: "#5350D5",
          clas: "menu-item",
          active: false
        },
        {
          title: '消息',
          pagePath: "/user/pages/message/message",
          text: "消息",
          iconPath: "/user/start/tabbar/normal_message.png",
          selectedIconPath: "/user/start/tabbar/select_message.png",
          selectedColor: "#5350D5",
          clas: "menu-item",
          active: false,
        },
        {
          title: '个人中心',
          pagePath: "/user/pages/profile/profile",
          text: "我的",
          iconPath: "/user/start/tabbar/normal_me.png",
          selectedIconPath: "/user/start/tabbar/select_me.png",
          selectedColor: "#5350D5",
          clas: "menu-item",
          active: false
        }
      ]
    },
    //第二种底部导航栏显示
    tabBar1: {
      isIOS: false,
      color: "#999999",
      selectedColor: "#f00",
      backgroundColor: "#fff",
      messageIsTrue: false,
      message: 'planner',
      list: [
        {
          title: '首页',
          pagePath: "/planner/pages/home/home",
          text: "首页",
          iconPath: "/planner/start/tarbar/home.png",
          selectedIconPath: "/planner/start/tarbar/home_select.png",
          clas: "menu-item1",
          selectedColor: "#5350D5",
          active: true
        },
        {
          title: '鲸选·MCN',
          pagePath: "/planner/pages/seleClass/seleClass",
          text: "鲸选·MCN",
          iconPath: "/planner/start/tarbar/mcn.png",
          selectedIconPath: "/planner/start/tarbar/mcn_select.png",
          selectedColor: "#5350D5",
          clas: "menu-item1",
          active: false
        },
        {
          title: '3H模板课',
          pagePath: "/planner/pages/templateClass/templateClass",
          text: "3H模板课",
          iconPath: "/planner/start/tarbar/normal.png",
          selectedIconPath: "/planner/start/tarbar/normal_select.png",
          selectedColor: "#5350D5",
          clas: "menu-item1",
          active: false
        },
        {
          title: '消息',
          pagePath: "/planner/pages/message/message",
          text: '消息',
          iconPath: "/planner/start/tarbar/messager.png",
          selectedIconPath: "/planner/start/tarbar/messager_select.png",
          selectedColor: "#5350D5",
          clas: "menu-item1",
          active: false,
        },
        {
          title: '个人中心',
          pagePath: "/planner/pages/me/me",
          text: "我的",
          iconPath: "/planner/start/tarbar/me.png",
          selectedIconPath: "/planner/start/tarbar/me_select.png",
          selectedColor: "#5350D5",
          clas: "menu-item1",
          active: false
        }
      ]
    }
  },
  //第一种底部  
  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。
    var curPageArr = getCurrentPages();    //获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象
    var pagePath = curPage.route;    //当前页面url
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    
    var tabBar = this.globalData.tabBar;
    tabBar.list.forEach(item => {
      item.active = false
      if(item.pagePath == pagePath) {
        item.active = true
      }
    })

    let isIOS = false
    wx.getSystemInfo({
      success: (result) => {
        if(result.system.includes('iOS')) {
          isIOS = true
        }else{
          isIOS = false
        }
      },
    })

    this.timer = setInterval(() => {
      leavingListUser('no').then(res => {
        let flag = res.data.data.data.find(item => item.istrue == 0) == undefined ? false : true
        curPage.setData({
          tabbar: {
            ...tabBar,
            messageIsTrue: flag,
            isIOS: isIOS
          },
          messageList: res.data.data.data
        });
      })
    }, 1000);
    curPage.setData({
      tabbar: {
        ...tabBar,
        isIOS: isIOS
      }
    });
  },
  editTabBar1: function () {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar1;
    tabBar.list.forEach(item => {
      item.active = false
      if(item.pagePath == pagePath) {
        item.active = true
      }
    })
    let isIOS = false
    wx.getSystemInfo({
      success: (result) => {
        if(result.system.includes('iOS')) {
          isIOS = true
        }else{
          isIOS = false
        }
      },
    })

    this.timer1 = setInterval(() => {
      leavingListPlanner('no').then(res => {
        let flag = res.data.data.data.find(item => item.istrue == 0) == undefined ? false : true
        curPage.setData({
          tabbar: {
            ...tabBar,
            messageIsTrue: flag,
            isIOS: isIOS
          },
          messageList: res.data.data.data
        });
      })
    }, 1000);
    curPage.setData({
      tabbar: {
        ...tabBar,
        isIOS: isIOS
      }
    })
  },
  toast(title, icon) {
    wx.showToast({
      title,
      icon
    })
  },
  entry(obj) {
    let obj_ = Object.entries(obj)
    let flag = true
    obj_.find(item => {
      if(item[1] == '' || item[1] == null || item[1] == undefined || item[1] == ' ') {
        this.toast('请完整填写信息', 'none')
        flag = false
      }
    })
    return flag
  },
  onLaunch: function () {
    this.globalData.userInfo = wx.getStorageSync('userInfo')
  },
  
})
