//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      that._login();
    }
  },

  _login: function (){
    var that = this;
    console.info('login');
    wx.login({
      success: function (res) {
        if (res.code) {
          var code = res.code;
          console.info(code);
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              app.globalData.userInfo = res.userInfo
              console.info(res.userInfo);
              that.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
              })
              console.info('getOpenID');
              wx.request({
                url: app.globalData.host + '/getOpenId',
                data: { code: code },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT      
                success: function (res) {
                  console.info(res.data);
                  app.globalData.openId = res.data.openId;
                }
              });
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  _getUserInfo: function() {
    var that = this;
    wx.openSetting({
        success: function(data) {
          if(data) {
            that._login(); 
          }
            
        }
              
      });
  }
})
