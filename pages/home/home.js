// pages/home/home.js
const api = require('../../api/api.js');
const app = getApp();

Page({
  data: {
    animated: true,
    title: '猫咪',
    recommends: [],
    userInfo: {},
    current: 0
  },
  
  // 页面加载
  onLoad: function (options) {
    this.getRecommends();
  },
  // 取得vols列表id对应的详细数据
  getRecommends: function () {
    let that = this;
    
    api.getCardsList({
      data: {
        maxSeconds: 0,
        minSeconds: 0,
      },
      success: (res) => {
        console.log("卡片详情", res.data);
        that.setData({
          recommends: res.data,
        })
      }
    })
  },

  onSwiperChange: function () {
    let that = this;
    that.setData({
      title: '11111',
      animated: !that.data.animated,
    });
    setTimeout(function () {
      that.setData({
        animated: !that.data.animated,
      });
    }, 100);
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

