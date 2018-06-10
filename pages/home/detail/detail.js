// pages/home/detail/detail.js
const api = require("../../../api/api.js");

Page({
  data: {
    serial: {
      praisenum: 10,
      commentnum: 100,
    },
    isDetail: false,
    detail: {},
    comments: []
  },
  onLoad: function (options) {
    api.getCardByDkey({
      data: {
        dkey: options.dkey,
      },
      success: (res) => {
        console.log(res.data);
        this.setData({
          detail: {
            hpcontent_id: res.data.dkey,
            hp_img_url: res.data.imageURL,
            hp_title: res.data.dname,
            hp_author: res.data.nickname,
            hp_makettime: res.data.uploadTime,
          },
          comments: res.data.comments,
        })
      }
    })
  },

  // 点击收藏事件
  onFavoriteTap: function() {
  },

  // 取得所有的卡片是否收藏信息
  getVolsIsFavoriteAsy: function() {
  },

  // 设置和显示收藏信息
  showToast: function (volsIsFavorite, isFavorite) {
  },

  // 点击分享事件
  onShareTap: function () {
  },

  // 页面分享
  onShareAppMessage: function () {
  }

})