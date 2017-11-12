//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    hasOpenId: false,
    list: [
      {
        name: '短信',
        path: '/pages/sms/sms'
      }, {
        name: '插入',
        path: '/pages/insertSMS/insertSMS'
      }, {
        name: '测试',
        path: '/pages/logs/logs'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    var that = this;
    if (app.globalData.userInfo && app.globalData.openId) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        hasOpenId: true
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
                url: app.globalData.host + '/login',
                data: { code: code },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT      
                success: function (res) {
                  console.info(res.data);
                  if (res.data.openid){
                    app.globalData.openId = res.data.openid;
                    that.setData({
                      userInfo: app.globalData.userInfo,
                      hasOpenId: true
                    })
                  }
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
