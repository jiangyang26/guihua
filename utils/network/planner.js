var { request } = require('./../request')

// 首页规划大数据
const userPlan = () => {
  return request({
    url: 'index.php/api/pubs/userplan'
  })
}

// 获取规划师信息
const getinfos = () => {
  return request({
    url: 'index.php/api/userplan/getinfos',
    method: 'POST'
  })
}

// 规划师信息添加
const addinfos = (config) => {
  return request({
    url: 'index.php/api/userplan/addinfos',
    method: 'POST',
    data: config
  })
}

// 留言列表
const leavingListPlanner = loading => {
  return request({
    url: 'index.php/api/userplan/leavinglist',
    method: 'POST',
    loading: loading
  })
}

// 留言详情
const leavingInfo = user_id => {
  return request({
    url: 'index.php/api/userplan/leavinginfo',
    data: {user_id},
    method: 'POST'
  })
}

// 规划师给用户回复
const addLeaving = config => {
  return request({
    url: 'index.php/api/userplan/addleaving',
    data: config,
    method: 'POST'
  })
}

// 3H模板课分类
const gh3hCate = () => {
  return request({
    url: 'index.php/api/usergh/gh3hcate'
  })
}

// 3H模板课
const gh3h = config => {
  return request({
    url: 'index.php/api/usergh/gh3h',
    method: 'POST',
    data: config
  })
}

// 资格证学习团报
const ghteam = config => {
  return request({
    url: 'index.php/api/usergh/ghteam',
    method: 'POST',
    data: config
  })
}

// 企业与学校所需规划师
const ghact = config => {
  return request({
    url: 'index.php/api/usergh/ghact',
    method: 'POST',
    data: config
  })
}

// 收款明细
const payList = config => {
  return request({
    url: 'index.php/api/userplan/paylist',
    method: 'POST',
    data: config
  })
}

// 添加收款信息
const addBank = config => {
  return request({
    url: 'index.php/api/userplan/addbank',
    method: 'POST',
    data: config
  })
}

// 勋章列表
const badgeList = () => {
  return request({
    url: 'index.php/api/userplan/badgelist',
    method: 'POST'
  })
}

// IP提升课
const ghip = () => {
  return request({
    url: 'index.php/api/usergh/ghip'
  })
}

// 首页规划分类数量
const planCate = () => {
  return request({
    url: 'index.php/api/userplan/plancate',
    method: 'POST'
  })
}

// 首页用户发布线索列表
const planList = config => {
  return request({
    url: 'index.php/api/userplan/planlist',
    method: 'POST',
    data: config
  })
}

// 线索详情
const planInfo = plan_id => {
  return request({
    url: 'index.php/api/userplan/planinfo',
    data: {plan_id},
    method: 'POST'
  })
}

// 收藏
const addColl = id => {
  return request({
    url: 'index.php/api/userplan/addcoll',
    data: {id},
    method: 'POST'
  })
}

// 收藏
const collList = config => {
  return request({
    url: 'index.php/api/userplan/colllist',
    data: config, 
    method: 'POST'
  })
}

// 城市列表
const actcityList = () => {
  return request({
    url: 'index.php/api/usergh/actcitylist',
    method: 'POST'
  })
}

// 发起协议
const addpro = config => {
  return request({
    url: 'index.php/api/userplan/addpro',
    method: 'POST',
    data: config
  })
}

// 我的订单
const mypro = config => {
  return request({
    url: 'index.php/api/userplan/mypro',
    method: 'POST',
    data: config,
    loading: 'no'
  })
}

// 上传简历
const addjl = url => {
  return request({
    url: 'index.php/api/userplan/addjl',
    method: 'POST',
    data: {url}
  })
}


module.exports = {
  gh3hCate, gh3h, userPlan, ghteam, ghact, getinfos, addinfos, leavingListPlanner, 
  leavingInfo, addLeaving, payList, addBank, badgeList, ghip, planCate, planList,
  planInfo, addColl, collList, actcityList, addjl, addpro, mypro
}