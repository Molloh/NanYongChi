// pages/home/home.js
const api = require('../../api/api.js');

Page({
  data: {
    vols: [],
    current: 0
  },
  
  // 页面加载
  onLoad: function (options) {
    this.getVols();
  },
  // 取得vols列表id对应的详细数据
  getVols: function () {
    let that = this;
    
    api.getCardsList({
      data: {
        maxSeconds: 0,
        minSeconds: 0,
      },
      success: (res) => {
        console.log("卡片详情", res.data);
        that.setData({
          vols: res.data,
        })
      }
    })

  },
  // 页面初次渲染完成
  onReady: function () {
  },

  // 点击卡券整体跳转详情页
  viewDetailTap: function (event) {
    let id = event.currentTarget.dataset.volId;
    wx.navigateTo({
      url: 'detail/detail?dkey=' + id
    });
  },

})