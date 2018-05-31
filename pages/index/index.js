//index.js
//获取应用实例
var app = getApp();

Page({
  data: {
    animationData: {},
    cardInfoList: []
  },

  //事件处理函数

  slidethis: function(e) {
    console.log(e);
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'cubic-bezier(.8,.2,.1,0.8)',
    });
    var self = this;
    this.animation= animation;
    this.animation.translateY(-420).rotate(-5).translateX(0).step();
    this.animation.translateY(62).translateX(25).rotate(0).step();
    this.setData({
      animationData: this.animation.export()
    });
    setTimeout(function() {
      var cardInfoList = self.data.cardInfoList;
      var slidethis = self.data.cardInfoList.shift();
      self.data.cardInfoList.push(slidethis);
      self.setData({
        cardInfoList: self.data.cardInfoList,
        animationData: {}
      });
    }, 350);
  },

  onLoad: function() {
    let that = this;
    wx.request({
      url: 'https://nywc.moontell.cn/api/card/details',
      data: {
        maxSeconds: 0,
        minSeconds: 0,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          cardInfoList: res.data,
        })
      }
    })
  }
  // onLoad: function () {
  //   //获取用户信息（原来的代码无效）
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo
  //     })
  //   } else {
  //     // 由于 请求getinfo接口 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.data
  //       })
  //       console.log("index 用户信息：", this.data.userInfo);
  //     }
  //   }
  // }
})
