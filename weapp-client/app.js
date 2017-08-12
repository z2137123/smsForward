//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {

    //       wx.login({
    //         success: function (res) {
    //           if (res.code) {
    //             wx.getUserInfo({
    //               success: function (res) {
    //                 this.globalData.userInfo = res.userInfo
    //                 console.info(res.userInfo);

    //                 var d = that.globalData;//这里存储了appid、secret、token串    
    //                 var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
    //                 console.info('getOpenID');
    //                 wx.request({
    //                   url: l,
    //                   data: {},
    //                   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT    
    //                   // header: {}, // 设置请求的 header    
    //                   success: function (res) {
    //                     console.info(res.data);
    //                     this.globalData.openId = res.data.openId;
    //                   }
    //                 });

    //                 // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //                 // 所以此处加入 callback 以防止这种情况
    //                 if (this.userInfoReadyCallback) {
    //                   this.userInfoReadyCallback(res)
    //                 }
    //               }
    //             });
    //           } else {
    //             console.log('获取用户登录态失败！' + res.errMsg)
    //           }            
    //         }
    //       });  
    //     }
    //   }
    // })
  },
  globalData: {
    host:'https://26170473.qcloud.la',
    appid: 'wx349ab0f21271a96e',//appid需自己提供，此处的appid我随机编写  
    secret: 'b3c7bba940fb0063e50c65835293a223',
    openId:null,
    userInfo: null
  }
})