const BASE_URL = 'https://guihua.wechat800.cn/'

const request = (config) => {
  if(config.loading != 'no') {
    wx.showLoading({
      title: '加载中',
    })
  }
  let token_  = wx.getStorageSync('token')
  // let token_  = '9ee185a7-8e3c-4c47-9aa9-ff4cb526129f'
  return new Promise((resolve, reject) => {
    wx.request({
      header: {
        token: token_
      },
      url: BASE_URL + config.url, 
      method: config.method || 'GET',
      data: config.data || {},
      success: (res) => {
        // checkAuth(res)
        
        if(config.loading != 'no') {
          wx.hideLoading()
        }
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

const login = config => {
  return request({
    url: 'index.php/api/user/code',
    method: 'POST',
    data: config
  })
}

const checkAuth = res => {
  if(res.data.code == '401') {
    wx.navigateTo({
      url: '/pages/login/login',
    })
    console.log('授权已过期，重新登陆');
  }
}

// 协议
const agreement = () => {
  return request({
    url: 'index.php/api/pubs/serverlist',
  })
}

module.exports = {
  request, login, agreement
}