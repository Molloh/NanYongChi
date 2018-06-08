//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '南雍记',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    let that = this;
    wx.request({
      url: app.apiURL + '/member/miaoshaRecords?openId=' + app.globalData.openId,
      success: function (res) {
        that.setData({
          miaoshaRecords: res.data
        })
        console.log("秒杀记录json", that.data.miaoshaRecords)
      }
    })
    wx.request({
      url: app.apiURL + '/member/starProducts?openId=' + app.globalData.openId,
      success: function (res) {
        console.log("收藏商品列表json", res.data);
        that.setData({
          starProducts: res.data
        })
      }
    })
  },
  setUserInfo: res => {
    app.globalData.userInfo.nickName = res.detail.userInfo.nickName;
    app.globalData.userInfo.avatarURL = res.detail.userInfo.avatarUrl;
    console.log("更新后的用户信息", app.globalData.userInfo);
    wx.request({
      url: app.apiURL + '/member/uppdateinfo',
      method: "POST",
      data: app.globalData.userInfo
    })
    wx.redirectTo({
      url: '/pages/home/home',
    })
  },
  data: {
    miaoshaRecords: null,
    starProducts: null
  }
})
