
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const toast = (title, icon) => {
  wx.showToast({
    title,
    icon
  })
}

const formatDate = number =>{
  var date = new Date(number);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  // return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;//年月日时分秒
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
}

// navHeight
const getNavHeight = app => {
  let menuButtonObject = wx.getMenuButtonBoundingClientRect();
  wx.getSystemInfo({
    success: res => {
      
      //导航高度
      let statusBarHeight = res.statusBarHeight,
        navTop = menuButtonObject.top,
        navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight)*2;
        app.globalData.navHeight = navHeight;
        app.globalData.navTop = navTop;
        app.globalData.windowHeight = res.windowHeight;
    },
    fail(err) {
      console.log(err);
    }
  })
}
function sortDataArray(dataArray){
  return dataArray.sort(function(a,b) {
      return Date.parse(b.updatetime.replace(/-/g,"/"))-Date.parse(a.updatetime.replace(/-/g,"/"));
  });
}

const formatPhoneNumber = str => {
  let handle_str = ''
  str.split('').forEach((item, index) => {
    if(index >= 3 && index <= 6) {
      item = '*'
    }
    handle_str += item
  })

  return handle_str
}

module.exports = {
  formatTime, toast, formatDate, getNavHeight, sortDataArray, formatPhoneNumber
}
