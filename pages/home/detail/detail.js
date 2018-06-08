// pages/home/detail/detail.js

Page({
  data: {
    isDetail: false,
    detail: {
      hpcontent_id: 0,
      hp_img_url: '/images/01火立方.jpg',
      hp_title: '火立方',
      hp_author: '设计&蓝小毛 作品',
      hp_makettime: 'June 1 2018',
    },
    comments: [
      {
        user: {
          web_url: '/images/tab/read.png',
          user_name: 'Molloh',
          input_date: '2018-06-08 06:44:55',
        },
        content: '巧克力海绵蛋糕红砖头体育馆',
        praisenum: 120,
      },
      {
        user: {
          web_url: '/images/tab/read.png',
          user_name: 'Moontell',
          input_date: '2018-06-09 16:44:55',
        },
        content: '火立方-方肇周体育馆',
        praisenum: 666,
      }
    ]
  },
  onLoad: function (options) {
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