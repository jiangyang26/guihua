var { request } = require('./../request')

const banner = () => {
  return request({
    url: 'index.php/api/pubs/chartlist'
  })
}

// 规划大数据
const planList = () => {
  return request({
    url: 'index.php/api/pubs/user'
  })
}

// 规划师列表
const userPlanList = config => {
  return request({
    url: 'index.php/api/user/userplanlist',
    data: config,
    method: 'POST'
  })
}

// 收藏
const addColl = userplan_id => {
  return request({
    url: 'index.php/api/user/addcoll',
    data: {userplan_id},
    method: 'POST'
  })
}

// 点赞
const addtags = config => {
  return request({
    url: 'index.php/api/user/addtags',
    data: config,
    method: 'POST'
  })
}

// 留言列表
const leavingListUser = loading => {
  return request({
    url: 'index.php/api/user/leavinglist',
    method: 'POST',
    loading: loading
  })
}

// 留言详情
const leavingInfo = userplan_id => {
  return request({
    url: 'index.php/api/user/leavinginfo',
    data: {userplan_id},
    method: 'POST'
  })
}

// 用户给规划师留言
const addLeaving = config => {
  return request({
    url: 'index.php/api/user/addleaving',
    data: config,
    method: 'POST'
  })
}

// 规划师给用户回复
const addPlanLeaving = config => {
  return request({
    url: 'index.php/api/userplan/addleaving',
    data: config,
    method: 'POST'
  })
}

// 收藏列表
const collList = config => {
  return request({
    url: 'index.php/api/user/colllist',
    data: config,
    method: 'POST'
  })
}

const planDetail = userplan_id => {
  return request({
    url: 'index.php/api/user/userplaninfo',
    data: {userplan_id},
    method: 'POST'
  })
}

// 勋章列表
const badgeList = () => {
  return request({
    url: 'index.php/api/userplan/badgelist',
    method: 'POST'
  })
}

// 快速发布
const addPlanTo = config => {
  return request({
    url: 'index.php/api/user/addplanto',
    method: 'POST',
    data: config
  })
}

// 全龄发布
const addLlan = config => {
  return request({
    url: 'index.php/api/user/addplan',
    method: 'POST',
    data: config
  })
}

// 全龄发布
const hisPlanList = config => {
  return request({
    url: 'index.php/api/user/planlist',
    method: 'POST',
    data: config
  })
}

// 历史发布详情
const hisPlanDetail = plan_id => {
  return request({
    url: 'index.php/api/user/planinfo',
    method: 'POST',
    data: {plan_id}
  })
}

// 历史发布详情
const planCaseList = config => {
  return request({
    url: 'index.php/api/user/plancaselist',
    method: 'POST',
    data: config
  })
}

// 我的订单
const mypro = config => {
  return request({
    url: 'index.php/api/user/mypro',
    method: 'POST',
    data: config
  })
}

// 规划方案
const myproinfo = config => {
  return request({
    url: 'index.php/api/user/myproinfo',
    method: 'POST',
    data: config
  })
}

// 规划方案详情
const myproinfos = config => {
  return request({
    url: 'index.php/api/user/myproinfos',
    method: 'POST',
    data: config
  })
}

module.exports = {
  banner, planList, userPlanList, addColl, addtags, leavingListUser, leavingInfo, addLeaving,
  collList, planDetail, badgeList, addPlanTo, addLlan, hisPlanList, hisPlanDetail, planCaseList,
  mypro, myproinfo, myproinfos
}