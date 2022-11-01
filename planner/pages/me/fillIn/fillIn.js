// pages/me/fillIn/fillIn.js
var app = getApp()
let { getinfos, addinfos } = require('./../../../../utils/network/planner')
let { formatDate } = require('./../../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    planInfo: {},
    paramsInfo: {},
    info: {},
    infoType: '',
    inputValue: '',
    focus:false,
    height: 0,
    highestEducation: ['本科', '硕士', '博士', '其他'],
    highestEducationValue: -1,
    currentState: ['已毕业', '在读'],
    currentStateValue: -1,
    mode: ['线上', '线下', '线上+线下均可'], 
    modeValue: -1,
    modeValue1: -1,
    rank: [
      '985院校',
      '211院校',
      '985&211院校',
      '国内普通高校',
      '全球QS名校排名100以内',
      '全球QS名校排名200以内',
      '全球QS名校排名300以内',
      '全球QS名校排名500以内',
      '全球QS名校排名800以内',
      '全球QS名校排名1000以内'
    ],
    rankValue: -1,
    dateValue1: '',
    dateValue2: '',
    dateValue3: '',
    dateValue4: '',
    dateValue5: '',
    dateValue6: '',
    region: '',
    tagList: [],
    tagIndex: 0,
    multiTimeArray: [
      ['星期一','星期二','星期三','星期四','星期五','星期六','星期日',]
    ],
    addArrObj: [],
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
    territoryIndex: -1,
    territoryTag: [],
    territoryNum: 0,
    achievement: [],
    isShowInput: false,

    uploadImageArr: [
      {id: 0, title: '教师资格证', path: '', aliPath: '', istrue: false},
      {id: 1, title: '毕业证/学生证', path: '', aliPath: '', istrue: false},
      {id: 2, title: '其他', path: '', aliPath: '', istrue: false},
    ],
    descValue: '',
    focus_number: false,
    sexArray: ['女', '男'],
    sexValue: -1,
    yearArray: []
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
      if(item[1] == '' || item[1] == -1 || item[1] == undefined || item[1] == null) {
        this.toast('请完整填写信息', 'none')
        flag = false
      }
    })
    return flag
  },
  // 提交
  submitTap() {
    let info = this.data.info
    let tag = ''
    let territory = ''

    // 可辅导时间
    let time_obj = {}
    this.data.addArrObj.forEach(item => {
      time_obj[item.week] = item.time
    })
    
    this.data.tagList.forEach((item, index) => {
      if(index == this.data.tagList.length - 1) {
        tag = tag + item.tag
      } else {
        tag = tag + item.tag + ','
      }
    })
    this.data.territoryTag.forEach((item, index) => {
      if(index == this.data.territoryTag.length - 1) {
        territory = territory + item.tag
      } else {
        territory = territory + item.tag + ','
      }
    })


    // 曾获证书
    let str_zs = ""
    let str1 = this.data.dateValue1
    let str2 = this.data.dateValue2
    let str3 = this.data.dateValue3

    let obj = {}

    if(str1 != '' && info.certificate1 != '') {
      obj[str1] = info.certificate1
    }
    if(str2 != '' && info.certificate2 != '') {
      obj[str2] = info.certificate2
    }
    if(str3 != '' && info.certificate3 != '') {
      obj[str3] = info.certificate3
    }

    if(Object.keys(obj).length != 0) {
      str_zs = JSON.stringify(obj)
    }

    // 工作经历
    let str_work = ""
    let str4 = this.data.dateValue4
    let str5 = this.data.dateValue5
    let str6 = this.data.dateValue6

    let obj_work = {}

    if(str4 != '' && info.work1 != '') {
      obj_work[str4] = info.work1
    }
    if(str5 != '' && info.work2 != '') {
      obj_work[str5] = info.work2
    }
    if(str6 != '' && info.work3 != '') {
      obj_work[str6] = info.work3
    }

    if(Object.keys(obj).length != 0) {
      str_work = JSON.stringify(obj_work)
    }


    // 辅导成果
    let result_arr = this.data.achievement
    let result_obj = {}
    result_arr.forEach((item, index) => {
      let str = ''
      str = item.date_ + ',' + item.name + ',' + item.type_ + ',' + item.situation + ',' + item.result_ + ',' + item.time_
      result_obj[index + 1] = str
    })

    let params_s = {
      name: info.name,
      jiguan: info.place,
      times: info.times,
      price: '100/小时',
      tags: tag,
      jy_xueli: info.school,
      jy_xl_status: Number(this.data.highestEducationValue) + 1,
      jy_status: (Number(this.data.currentStateValue) + 1) + '',
      jy_pm_status: (Number(this.data.rankValue) + 1) + '',
      city: this.data.region,
      info_status: (Number(this.data.modeValue) + 1) + '',
      info_tags: territory,
      info_work_status: (Number(this.data.modeValue1) + 1) + '',
      info_field_status: this.data.radio == true ? '1' : '2',
      times_json: this.data.addArrObj.length != 0 ? JSON.stringify(time_obj) : '',
      desc: this.data.descValue,
    }

    if(params_s.name == '' || params_s.name == ' ' || params_s.name == undefined || params_s.name == null) {
      app.toast('请输入姓名', 'none')
      return
    }
    if(params_s.jiguan == '' || params_s.jiguan == ' ' || params_s.jiguan == undefined || params_s.jiguan == null) {
      app.toast('请输入籍贯', 'none')
      return
    }
    if(params_s.times == '' || params_s.times == ' ' || params_s.times == undefined || params_s.times == null) {
      app.toast('请输入从业时长', 'none')
      return
    }
    if(params_s.tags == '' || params_s.tags == ' ' || params_s.tags == undefined || params_s.tags == null) {
      app.toast('请添加性格标签', 'none')
      return
    }
    if(params_s.jy_xueli == '' || params_s.jy_xueli == ' ' || params_s.jy_xueli == undefined || params_s.jy_xueli == null) {
      app.toast('请输入毕业院校', 'none')
      return
    }
    if(params_s.jy_xl_status == '' || params_s.jy_xl_status == ' ' || params_s.jy_xl_status == undefined || params_s.jy_xl_status == null) {
      app.toast('请选择最高学历', 'none')
      return
    }
    if(params_s.jy_status == '' || params_s.jy_status == ' ' || params_s.jy_status == undefined || params_s.jy_status == null) {
      app.toast('请选择目前状态', 'none')
      return
    }
    if(params_s.jy_pm_status == '' || params_s.jy_pm_status == ' ' || params_s.jy_pm_status == undefined || params_s.jy_pm_status == null) {
      app.toast('请选择社会排名', 'none')
      return
    }
    if(params_s.city == '' || params_s.city == ' ' || params_s.city == undefined || params_s.city == null) {
      app.toast('请选择所在城市', 'none')
      return
    }
    if(params_s.info_status == '' || params_s.info_status == ' ' || params_s.info_status == undefined || params_s.info_status == null) {
      app.toast('请选择授课模式', 'none')
      return
    }
    if(params_s.info_tags == '' || params_s.info_tags == ' ' || params_s.info_tags == undefined || params_s.info_tags == null) {
      app.toast('请添加个人擅长领域', 'none')
      return
    }
    if(params_s.info_work_status == '' || params_s.info_work_status == ' ' || params_s.info_work_status == undefined || params_s.info_work_status == null) {
      app.toast('请选择工作模式', 'none')
      return
    }
    if(params_s.info_field_status == '' || params_s.info_field_status == ' ' || params_s.info_field_status == undefined || params_s.info_field_status == null) {
      app.toast('请选择是否有固定场所', 'none')
      return
    }
    if(params_s.times_json == '' || params_s.times_json == ' ' || params_s.times_json == undefined || params_s.times_json == null) {
      app.toast('请添加可辅导时间', 'none')
      return
    }
    if(params_s.desc == '' || params_s.desc == ' ' || params_s.desc == undefined || params_s.desc == null) {
      app.toast('请添加个人自述', 'none')
      return
    }


    let params_n = {
      gender: this.data.sexValue + '',
      chengguo_json: JSON.stringify(result_obj),
      cert_json: str_zs,
      work_json: str_work,
      js_image: this.data.uploadImageArr[0].aliPath,
      xs_images: this.data.uploadImageArr[1].aliPath,
      zs_images: this.data.uploadImageArr[2].aliPath
    };
    console.log(params_n);

    addinfos({
      ...params_s,
      ...params_n
    }).then(res => {
      if(res.data.code == 1) {
        this.toast('提交成功', 'success')
      }
    })
    
  },

  changeDesc(e) {
    this.setData({descValue: e.detail.value})
  },
  // 文件上传
  uploadImage(e) {
    let index = Number(e.currentTarget.dataset.index)
    let arr = [...this.data.uploadImageArr]
    wx.chooseImage({
      count: 1,
      success: (res) => {
        arr.forEach((item, indey) => {
          if(index == indey) {
            item.path = res.tempFilePaths[0]
            
            let token_ = wx.getStorageSync('token')
            wx.uploadFile({
              filePath: item.path,
              name: 'file',
              url: 'https://guihua.wechat800.cn/index.php/api/common/upload',
              header: {
                token: token_
              },
              success: res_up => {
                let res_ = JSON.parse(res_up.data)
                item.aliPath = res_.data.fullurl
                item.istrue = true
                this.setData({uploadImageArr: arr})
              },
              fail: err => {
                console.log(err);
              }
            });
          }
        });
        this.setData({uploadImageArr: arr})
        console.log(this.data.uploadImageArr);
      }
    });
  },
  changeEducationTime(e) {
    this.setData({educationValue: this.data.educationTime[e.detail.value]})
  },
  delTag(e) {
    let indey = e.currentTarget.dataset.index
    let arr = [...this.data.tagList]
    arr.forEach((item, index) => {
      if(index == indey) {
        item.active = false
      }
    })
    this.setData({
      tagList: arr.filter(item => item.active)
    })

  },
  toAchievement() {
    if(this.data.achievement.length >= 5) {
      app.toast('最多添加5个成果', 'none')
      return
    }
    wx.navigateTo({
      url: './add-achievement/achievement',
    })
  },
  delTerritoryTag(e) {
    let index = e.currentTarget.dataset.index
    let arr_tag = [...this.data.territoryTag]
    let tag = ''
    let arr = [...this.data.territoryList]
    let product = null
    arr_tag.forEach((item, indey) => {
      if(index == indey) {
        item.active = false
        tag = item.tag
      }
    })
    let arr_tag_filter = arr_tag.filter(item => item.active == true)
    arr.forEach(item_x => {
      item_x.title[1].forEach(item_y => {
        if(item_y == tag) {
          product = item_x
        }
      })
    })
    try {
      if(product) {
        arr_tag_filter.forEach(item => {
          if(product.title[1].toString().indexOf(item.tag) != -1) {
            throw new Error('不等于-1')
          }
          product.active = false
        })
      }
    } catch (error) {
      if(error.message!="不等于-1") throw e
    }
    if(arr_tag_filter.length == 0) {
      arr.forEach(item => item.active = false)
    }
    this.setData({
      territoryTag: arr_tag_filter,
      territoryList: arr
    })
  },
  changeTerritory(e) {
    let value = e.detail.value
    let territoryIndex = this.data.territoryIndex
    let active_value = ''
    let arr = [...this.data.territoryList]
    let tag_arr = [...this.data.territoryTag]
    if(tag_arr.length >= 3) return
    arr.forEach((item, index) => {
      if(index == territoryIndex) {
        active_value = item.title[1][value[1]]
        item.active = true
        tag_arr.push({tag: active_value, active: true})
      }
    })
    this.setData({
      territoryList: arr,
      territoryTag: tag_arr
    })
  },
  territoryTap(e) {
    let index = e.currentTarget.dataset.index
    let is_show
    if(index == 7) {
      is_show = true
    }

    this.setData({
      territoryIndex: index,
      isShowInput: is_show
    })
  },
  changeSex(e) {
    this.setData({
      sexValue: e.detail.value
    })
  },
  changeDate6(e) {
    let value = e.detail.value
    let year_ = value + '年'
    this.setData({dateValue6: year_})
  },
  changeDate5(e) {
    let value = e.detail.value
    let year_ = value + '年'
    this.setData({dateValue5: year_})
  },
  changeDate4(e) {
    let value = e.detail.value
    let year_ = value + '年'
    this.setData({dateValue4: year_})
  },
  changeDate3(e) {
    let value = e.detail.value
    let year_ = value + '年'
    this.setData({
      dateValue3: year_
    })
  },
  changeDate2(e) {
    let value = e.detail.value
    let year_ = value + '年'
    this.setData({
      dateValue2: year_
    })
  },
  changeDate1(e) {
    let value = e.detail.value
    let year_ = value + '年'
    this.setData({
      dateValue1: year_
    })
  },

  createComprisonFunction(propertyName){
    return function(object1,object2){
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if(value1 < value2){
            return -1;
        }else if(value1 > value2){
            return 1;
        }else{
            return 0;
        }
    }
  },
  changeMulti(e) {
    let value = e.detail.value
    let arr = this.data.multiTimeArray
    // 星期
    let week = arr[0][value[0]]
    // 开始时间
    let start_time = arr[1][value[1]]
    // 结束时间
    let end_time = arr[2][value[2]]
    let time =  start_time+'-'+end_time
    if(this.data.addArrObj.length == 0) {
      this.setData({
        addArrObj: [
          ...this.data.addArrObj,
          {week, start_time, end_time, time, time_count: 1, num: 1}
        ]
      })
    }else{
      let arr_ = [...this.data.addArrObj]
      let product
      arr_.find(item => {
        if(item.week == arr[0][value[0]]) {
          product = item
        }
      })
      if(product) {
        if(product.time_count >= 4) return
        product.time = product.time+' '+time
        product.time_count += 1
      }else{
        arr_.push({week, start_time, end_time, time, time_count: 1, num: 1})
      }
      arr_.forEach(item => {
        if(item.week == '星期一') {
          item.num = 1
        }
        if(item.week == '星期二') {
          item.num = 2
        }
        if(item.week == '星期三') {
          item.num = 3
        }
        if(item.week == '星期四') {
          item.num = 4
        }
        if(item.week == '星期五') {
          item.num = 5
        }
        if(item.week == '星期六') {
          item.num = 6
        }
        if(item.week == '星期日') {
          item.num = 7
        }
      })
      this.setData({
        addArrObj: arr_.sort(this.createComprisonFunction("num"))
      })
    }
  },
  changeRegion(e) {
    let value = e.detail.value
    this.setData({
      region: value[0] + '/' + value[1] + '/' + value[2]
    })
  },
  changeMode1(e) {
    this.setData({
      modeValue1: e.detail.value
    })
  },
  changeMode(e) {
    this.setData({
      modeValue: e.detail.value
    })
  },
  changeRank(e) {
    this.setData({
      rankValue: e.detail.value
    })
  },
  changeCurrentState(e) {
    this.setData({
      currentStateValue: e.detail.value
    })
  },
  changeHighestEducation(e) {
    this.setData({
      highestEducationValue: e.detail.value
    })
  },

  infoInputFunc() {
    let type = this.data.infoType
    let info = this.data.info
    if(type == 'times') {
      this.setData({
        info: {
          ...info,
          times: this.data.inputValue
        }
      })
    }
    if(type == 'name') {
      this.setData({
        info: {
          ...info,
          name: this.data.inputValue
        }
      })
    }
    if(type == 'sex') {
      this.setData({
        info: {
          ...info,
          sex: this.data.inputValue
        }
      })
    }
    if(type == 'place') {
      this.setData({
        info: {
          ...info,
          place: this.data.inputValue
        }
      })
    }
    if(type == 'school') {
      this.setData({
        info: {
          ...info,
          school: this.data.inputValue
        }
      })
    }
    if(type == 'certificate1') {
      this.setData({
        info: {
          ...info,
          certificate1: this.data.inputValue
        },
      })
    }
    if(type == 'certificate2') {
      this.setData({
        info: {
          ...info,
          certificate2: this.data.inputValue
        },
      })
    }
    if(type == 'certificate3') {
      this.setData({
        info: {
          ...info,
          certificate3: this.data.inputValue
        },
      })
    }
    if(type == 'work1') {
      this.setData({
        info: {
          ...info,
          work1: this.data.inputValue
        },
      })
    }
    if(type == 'work2') {
      this.setData({
        info: {
          ...info,
          work2: this.data.inputValue
        },
      })
    }
    if(type == 'work3') {
      this.setData({
        info: {
          ...info,
          work3: this.data.inputValue
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let arr1 = []
    let arr2 = []
    for (let index = 8; index <= 22; index++) {
      for (let indey = 0; indey < 2; indey++) {
        let start_timer
        if(index == 22) {
          start_timer = index+':'+'00'
        }else{
          start_timer = index+':'+(indey == 0?'00':'30')
        }
        arr1.push(start_timer)
        arr2.push(start_timer)
      }
    }
    let year_arr = [[], []]
    for(let i = 1980; i <= 2022; i ++) {
      year_arr[0].push(i + '年')
      year_arr[1].push(i + '年')
    }
    this.setData({
      multiTimeArray: [
        ...this.data.multiTimeArray,
        arr1,
        arr2
      ],
      yearArray: year_arr,
      avatar: app.globalData.userInfo.avatar
    });
    getinfos().then(res => {
      let data = res.data.data
      console.log(data);
      let obj_arr_zs = []
      let obj_arr_work = []

      if(data.cert_json != '') {
        obj_arr_zs = Object.entries((JSON.parse(data.cert_json)))
      }

      if(data.work_json != '') {
        obj_arr_work = Object.entries((JSON.parse(data.work_json)))
      }

      let time_arr = []
      let time_arr_obj = []
      if(data.times_json != '' && data.times_json != '{}') {
        time_arr_obj = Object.entries(JSON.parse(data.times_json))
      }
      
      time_arr_obj.forEach(item => {
        time_arr.push({
          week: item[0],
          time: item[1]
        })
      })

      let arr_tags = []
      if(data.tags != '') {
        let arr = data.tags.split(',')
        arr.forEach(item => {
          arr_tags.push({
            tag: item,
            active: true
          })
        })
      }

      // 擅长领域标签
      let territory_arr = []
      // 擅长领域选中
      let territory_list = this.data.territoryList
      if(data.info_tags != '') {
        let t_arr = data.info_tags.split(',')
        t_arr.forEach(item => {
          territory_arr.push({tag: item, active: true})
          territory_list.forEach(terr_item => {
            terr_item.title[1].forEach(title_item =>{
              if(item == title_item) {
                terr_item.active = true
              }
            })
          })
        })
      }
      
      // 图片
      let imageList = this.data.uploadImageArr
      imageList.forEach((item, index) => {
        if(index == 0) {
          item.aliPath = data.js_image
          if(data.js_image.indexOf('http') != -1) {
            item.istrue = true
          } else {
            item.istrue = false
          }
        }
        if(index == 1) {
          item.aliPath = data.xs_images
          if(data.xs_images.indexOf('http') != -1) {
            item.istrue = true
          } else {
            item.istrue = false
          }
        }
        if(index == 2) {
          item.aliPath = data.zs_images
          if(data.zs_images.indexOf('http') != -1) {
            item.istrue = true
          } else {
            item.istrue = false
          }
        }
      })

      // 辅导成果
      let result_arr = []
      if(data.chengguo_json != '{}' && data.chengguo_json != '') {
        let result_obj = JSON.parse(data.chengguo_json)
        for (const [key, value] of Object.entries(result_obj)) {
          let value_arr = value.split(',')
          let value_obj = {
            date_: value_arr[0],
            name: value_arr[1],
            type_: value_arr[2],
            situation: value_arr[3],
            result_: value_arr[4],
            time_: value_arr[5],
          }
          result_arr.push(value_obj)
        }
      }

      // 注册时间
      let create_time = formatDate(new Date(data.createtime * 1000))

      this.setData({
        planInfo: {
          ...data
        },
        info: {
          ...this.data.info,
          createtime: create_time,
          name: data.name,
          place: data.jiguan,
          school: data.jy_xueli,
          times: data.times,                                    // 教育时长  
          certificate1: obj_arr_zs.length >= 1 ? obj_arr_zs[0][1] : '',
          certificate2: obj_arr_zs.length >= 2 ? obj_arr_zs[1][1] : '',
          certificate3: obj_arr_zs.length >= 3 ? obj_arr_zs[2][1] : '',
          work1: obj_arr_work.length >= 1 ? obj_arr_work[0][1] : '',
          work2: obj_arr_work.length >= 2 ? obj_arr_work[1][1] : '',
          work3: obj_arr_work.length >= 3 ? obj_arr_work[2][1] : '',
        },
        region: data.city,
        highestEducationValue: Number(data.jy_xl_status) - 1,   // 最高学历
        currentStateValue: Number(data.jy_status) - 1,          // 目前状态
        rankValue: Number(data.jy_pm_status) - 1,               // 最高学历社会排名
        modeValue: Number(data.info_status) - 1,                // 可授课模式
        modeValue1: Number(data.info_work_status) - 1,          // 可授课模式
        radio: data.info_field_status == '1' ? true : false,    // 是否有固定授课场地
        descValue: data.desc,                                   // 自述
        tagList: arr_tags,                                      // 性格标签   
        dateValue1: obj_arr_zs.length >= 1 ? obj_arr_zs[0][0] : '',
        dateValue2: obj_arr_zs.length >= 2 ? obj_arr_zs[1][0] : '',
        dateValue3: obj_arr_zs.length >= 3 ? obj_arr_zs[2][0] : '',
        dateValue4: obj_arr_work.length >= 1 ? obj_arr_work[0][0] : '',
        dateValue5: obj_arr_work.length >= 2 ? obj_arr_work[1][0] : '',
        dateValue6: obj_arr_work.length >= 3 ? obj_arr_work[2][0] : '',    
        addArrObj: time_arr,
        achievement: result_arr,
        uploadImageArr: imageList,
        territoryTag: territory_arr,
        territoryList:territory_list,
        sexValue: data.gender,
      })
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
  // 单选
  radio(){
    var radio = !this.data.radio
    this.setData({
      radio
    })
  },
  onTap(e){
    let type = e.currentTarget.dataset.type
    if(type == 'times') {
      this.setData({
        focus_number: true,
        infoType: type,
        tagIndex: e.currentTarget.dataset.index || 0
      })
      return
    }
    this.setData({
      focus:true,
      infoType: type,
      tagIndex: e.currentTarget.dataset.index || 0
    })

  },
  changeInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
    this.infoInputFunc()
  },
  // 点击遮罩层
  onCatch(){
     this.setData({
      focus:false,
      focus_number: false
    })
    if(this.data.infoType == 'addtag') {
      if(this.data.inputValue == '' || this.data.inputValue == ' ') return
      let arr = [...this.data.tagList]
      arr.push({tag: this.data.inputValue, active: true})
      this.setData({
        tagList: arr
      })
    }
    if(this.data.infoType == 'updatetag') {
      if(this.data.inputValue == '' || this.data.inputValue == ' ') return
      let arr = [...this.data.tagList]
      arr.forEach((item, index) => {
        if(this.data.tagIndex == index) {
          item.tag = this.data.inputValue
        }
      })
      this.setData({
        tagList: arr,
        inputValue: ''
      })
    }
  },
  catchT() {

  },
  // 输入框聚焦触发
  onFocus(e){
    let height_ = e.detail.height
    this.setData({
      height: height_
    })
  },
  onBlur() {
    this.setData({
      focus: false,
      focus_number: false
    })
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