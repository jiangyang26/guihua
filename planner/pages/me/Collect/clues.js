// pages/me/Collect/clues.js

var app = getApp()
var { collList, addColl } = require('./../../../../utils/network/planner')
var { formatDate, sortDataArray, formatPhoneNumber } = require('./../../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    paramsInfo: {
      status: '',
      page: '1',
      offset: '10'
    },
    last_page: 0,
    collListFilter: [],
    planCollList: [],
    fastCollList: []
  },

  toMessageDetaiil(e) {
    let type = e.currentTarget.dataset.type
    let user_id = e.currentTarget.dataset.user_id
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        page: '1'
      }
    })
    wx.navigateTo({
      url: '/planner/pages/message/leave-message/message?user_id=' + user_id + '&type=' + type,
    })
  },  
  // 筛选
  collScreenTap(e) {
    let status = e.currentTarget.dataset.status
    this.setData({
      paramsInfo: {
        ...this.data.paramsInfo,
        page: '1',
        status: status
      }
    })
    this.getCollList()
  },
  // 收藏
  addCollTap(e) {
    let id = e.currentTarget.dataset.id
    let iscoll = e.currentTarget.dataset.iscoll
    let type = e.currentTarget.dataset.type

    if(type == 'screen') {
      let filter_arr = this.data.collListFilter

      filter_arr.forEach(item => {
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
        collListFilter: filter_arr
      })
      return
    }

    let plan_arr = this.data.planCollList
    let fast_arr = this.data.fastCollList
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
      planCollList: plan_arr,
      fastCollList: fast_arr
    })

    addColl(id).then(res => {})
  },
  toFastDetail(e) {
    let plan_id = e.currentTarget.dataset.plan_id
    wx.navigateTo({
      url: './../../home/fast-detail/fast-detail/fast-detail?plan_id=' + plan_id,
    })
  },
  toPlanDetail(e) {
    let plan_id = e.currentTarget.dataset.plan_id
    wx.navigateTo({
      url: './../../home/fast-detail/school-plan/school-plan?plan_id=' + plan_id,
    })
  },

  // 收藏列表
  getCollList() {

    if(this.data.paramsInfo.page > this.data.last_page) {

      if(this.data.last_page != 0) {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'none'
        })
        return
      }
    }

    collList(this.data.paramsInfo).then(res => {
      let arr = res.data.data.data;
      arr.forEach(item => {
        item.iscoll = 1
        item.updatetime = formatDate(new Date(item.updatetime * 1000))
        if(item.status == '2') {
          item.ks_mobile = formatPhoneNumber(item.ks_mobile)
        }
      })
      if(this.data.paramsInfo.status == '') {
        let arr1 = this.data.paramsInfo.page == '1' ? arr.filter(item => item.status == '1') : [
          ...this.data.planCollList,
          ...arr.filter(item => item.status == '1')
        ]

        let arr2 = this.data.paramsInfo.page == '1' ? arr.filter(item => item.status == '2') : [
          ...this.data.fastCollList,
          ...arr.filter(item => item.status == '2')
        ]
        this.setData({
          planCollList: sortDataArray(arr1),
          fastCollList:  sortDataArray(arr2),
          last_page: res.data.data.last_page
        })
      }

      if(this.data.paramsInfo.status == '1') {
        this.setData({
          collListFilter: this.data.paramsInfo.page == '1' ? arr.filter(item => item.status == '1') : [
            ...this.data.collListFilter,
            ...arr.filter(item => item.status == '1')
          ],
          last_page: res.data.data.last_page
        })
      }

      if(this.data.paramsInfo.status == '2') {
        this.setData({
          collListFilter: this.data.paramsInfo.page == '1' ? arr.filter(item => item.status == '2') : [
            ...this.data.collListFilter,
            ...arr.filter(item => item.status == '2')
          ],
          last_page: res.data.data.last_page
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      banner: app.globalData.banner.filter(item => item.name == '规划师端收藏的线索轮播图')
    })
    this.getCollList()
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
    if(this.data.planCollList.length != 0 || this.data.fastCollList.length != 0) {
      let num = Number(this.data.paramsInfo.page)
      num++
      this.setData({
        paramsInfo: {
          ...this.data.paramsInfo,
          page: num + ''
        }
      })
      this.getCollList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})