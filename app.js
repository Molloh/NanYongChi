//app.js
App({
  //api的基址。
  // apiURL: "https://localhost/api",
  apiURL: "https://nywc.moontell.cn/nywc/api",
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    //获得用户数据，并设置到app.globalData
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {

          wx.request({
            url: that.apiURL + '/member/getinfo?js_code=' + res.code,
            method: "get",
            success: function (openIdRes) {
              // 判断openId是否获取成功
              if (openIdRes.data.openId != null & openIdRes.data.openId != undefined) {
                that.globalData.openId = openIdRes.data.openId;
                that.globalData.userInfo = openIdRes.data;
                console.info("openId： " + that.globalData.openId);
                console.log("app 用户信息：", openIdRes.data);

                if (that.userInfoReadyCallback) {
                  that.userInfoReadyCallback(openIdRes)
                }

              } else {
                console.info("获取用户openId失败");
              }
            },
            fail: function (error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    openId: ""
  }
})