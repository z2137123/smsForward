//logs.js
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    smsList: [
      {
        "sendBy":"15868129047",
        "sendTime": "2017-08-08 08:08:08",
        "context": "该属性设置元素上内边距的宽度。行内非替换元素上设置的上内边距不会影响行高计算，因此，如果一个元素既有内边距又有背景，从视觉上看可能延伸到其他行，有可能还会与其他内容重叠。不允许指定负内边距值。"
      },
      {
        "sendBy": "15868129047",
        "sendTime": "2017-08-08 08:08:08",
        "context": "该属性设置元素上内边距的宽度。行内非替换元素上设置的上内边距不会影响行高计算，因此，如果一个元素既有内边距又有背景，从视觉上看可能延伸到其他行，有可能还会与其他内容重叠。不允许指定负内边距值。"
      },
      {
        "sendBy": "15868129047",
        "sendTime": "2017-08-08 08:08:08",
        "context": "该属性设置元素上内边距的宽度。行内非替换元素上设置的上内边距不会影响行高计算，因此，如果一个元素既有内边距又有背景，从视觉上看可能延伸到其他行，有可能还会与其他内容重叠。不允许指定负内边距值。"
      },
      {
        "sendBy": "15868129047",
        "sendTime": "2017-08-08 08:08:08",
        "context": "该属性设置元素上内边距的宽度。行内非替换元素上设置的上内边距不会影响行高计算，因此，如果一个元素既有内边距又有背景，从视觉上看可能延伸到其他行，有可能还会与其他内容重叠。不允许指定负内边距值。"
      },
      {
        "sendBy": "15868129047",
        "sendTime": "2017-08-08 08:08:08",
        "context": "该属性设置元素上内边距的宽度。行内非替换元素上设置的上内边距不会影响行高计算，因此，如果一个元素既有内边距又有背景，从视觉上看可能延伸到其他行，有可能还会与其他内容重叠。不允许指定负内边距值。"
      },
      {
        "sendBy": "15868129047",
        "sendTime": "2017-08-08 08:08:08",
        "context": "该属性设置元素上内边距的宽度。行内非替换元素上设置的上内边距不会影响行高计算，因此，如果一个元素既有内边距又有背景，从视觉上看可能延伸到其他行，有可能还会与其他内容重叠。不允许指定负内边距值。"
      }
    ],
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },
  onShow: function () {
    //   在页面展示之后先获取一次数据
    var that = this;
    this.reloadSMS();
  },
  bindDownLoad: function () {
    //   该方法绑定了页面滑动到底部的事件
    console.info('this is butttom')
  },
  scroll: function (event) {
    //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    var that = this;
    // page = 0;
    this.setData({
      smsList: [],
      scrollTop: 0
    });
    this.reloadSMS();
  },

  reloadSMS: function(){
    var that = this;
    console.info('requestSMS');
    that.setData({
      hidden: false
    });
    wx.request({
      url: app.globalData.host + '/getSMSList',
      data: {
        openId: app.globalData.openId,
        pageNumber: '0',
        pageSize: '10'
      },
      method: 'GET',
      success: function (res) {
        var rstList = res.data
        console.info(rstList);
        that.setData({
          smsList: rstList,
          hidden: true
        });
      }
    });
  }
})
