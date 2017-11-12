const util = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
    sendBy:"",
    context:""
  },
  onLoad: function () {
    console.info('load');
    // this.submitSMS();
  },
  bindsendBy: function(e) {
    this.setData({
      sendBy: e.detail.value
    })
  },

  bindsendContext: function (e) {
    this.setData({
      context: e.detail.value
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  submitSMS: function (e) {
    var that = this;
    console.info('insertSMS');
    var currentTime = util.formatTime(new Date(Date.now()));
    var formData = {
      sendBy: that.data.sendBy,
      openId: app.globalData.openId,
      context: that.data.context,
      sendTime: currentTime
    };
    console.info(formData);
    wx.request({
      url: app.globalData.host + '/insertSMS',
      header:'charset=utf-8',
      data: formData,
      method: 'GET',
      success: function (res) {
        wx.navigateTo({
          url: '../index/index'
        })
      }
    });
  }

  
})