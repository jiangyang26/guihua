// pages/home/teacher/teacher.js
var app = getApp()
var { ghact, actcityList } = require('./../../../../utils/network/planner')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    ghactList: [],
    scanShow: false,
    regionList: [],
    proList: [],
    proIndex: 0,
    cityList: [],
    cityIndex: 0,
    paramsInfo: {
      status: 'company',
      pro: '',
      city: '',
      page: '1',
      offset: '10'
    },
    last_page: 0
  },

  changePro(e) {
    let value = e.detail.value
    this.setData({
      proIndex: value,
      paramsInfo: {
        ...this.data.paramsInfo,
        pro: this.data.proList[value],
        page: '1'
      }
    })
    this.getGhact()
  },
  changeCity(e) {
    let value = e.detail.value
    this.setData({
      cityIndex: value,
      paramsInfo: {
        ...this.data.paramsInfo,
        city: this.data.cityList[value],
        page: '1'
      }
    })
    this.getGhact()
  },
  scanBack() {
    this.setData({
      scanShow: false
    })
  }, 
  toScan(e) {
    let value = e.currentTarget.dataset
    this.setData({
      scanShow: true,
      qrcode_image: value.image,
    })
  },
  // 活动列表
  getGhact() {
    ghact(this.data.paramsInfo).then(res => {
      this.setData({
        ghactList: this.data.paramsInfo.page == '1' ? res.data.data.data.filter(item => item.switch == '1') : [
          ...this.data.ghactList,
          ...res.data.data.data.filter(item => item.switch == '1')
        ],
        last_page: res.data.data.last_page
      })
      console.log(this.data.ghactList);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    this.setData({
      banner: app.globalData.banner.filter(item => item.name == '规划师端企业需要讲师轮播图')
    })
    // 城市列表
    actcityList().then(res => {
      let arr = res.data.data
      let pro = []
      let city = []
      arr.forEach(item => {
        pro.push(item.pro)
        city.push(item.cityslist)
      })
      console.log(pro, city);
      this.setData({
        regionList: arr,
        proList: pro,
        cityList: city
      })
    })

    // 活动列表
    this.getGhact()
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