// pages/profile/collect/collect.js
var { collList } = require('./../../../../utils/network/user')
var { addColl, addtags } = require('./../../../../utils/network/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPlanListInfo: [],
    timer: null,
    screenIndex: -1,
    badgeToastText: '',
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
      // {id: 8, title: [['其他'], []], checked: false, disabled: true},
    ],
    page: '1',
    tags: '',
    last_page: 0,
    offset: '10',
    currentIndex: -1
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
                console.log(res);
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollList()
  },
  getCollList() {
    if(this.data.page > this.data.last_page) {
      if(this.data.last_page != 0) {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
        return
      }
    }
    collList({
      page: this.data.page,
      offset: this.data.offset,
      tags: this.data.tags
    }).then(res => {
      let arr = [...res.data.data.data]
      arr.forEach(item => {
        item.iscoll = 1
      })
      this.setData({
        userPlanListInfo: this.data.page == '1' ? arr : [
          ...this.data.userPlanListInfo,
          ...arr
        ],
        last_page: res.data.data.last_page,
      })
    })
  },
  changeTerritory(e) {
    let value = this.data.category[this.data.currentIndex].title[1][e.detail.value[1]]
    this.setData({
      tags: value,
      page: '1'
    })
    this.getCollList()
  },
  handleCategoryClick(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      currentIndex: index
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
    let num = Number(this.data.page)
    num++
    this.setData({
      page: num + ''
    })
    this.getCollList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})