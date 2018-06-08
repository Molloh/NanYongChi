// pages/home/home.js

Page({
  data: {
    vols: [
      {
        hpcontent_id: 0,
        hp_img_url: 'http://ww1.sinaimg.cn/large/006k2f85ly1fs46egit5fj32bc2bcb2a.jpg',
        hp_title: '火立方',
        hp_author: '设计&蓝小毛 作品',
        hp_makettime: 'June 1 2018',
      },
      {
        hpcontent_id: 1,
        hp_img_url: 'http://ww1.sinaimg.cn/large/006k2f85ly1fs46f67t16j32bc2bc1ky.jpg',
        hp_title: '大活',
        hp_author: '设计&蓝小毛 作品',
        hp_makettime: 'June 2 2018',
      },
      {
        hpcontent_id: 2,
        hp_img_url: 'http://ww1.sinaimg.cn/large/006k2f85ly1fs46ffhz9pj32bc2bc7wi.jpg',
        hp_title: '北大楼',
        hp_author: '设计&蓝小毛 作品',
        hp_makettime: 'June 3 2018',
      },
      {
        hpcontent_id: 3,
        hp_img_url: 'http://ww1.sinaimg.cn/large/006k2f85ly1fs46fnok7gj32bc2bcx6p.jpg',
        hp_title: '图书馆',
        hp_author: '设计&蓝小毛 作品',
        hp_makettime: 'June 4 2018',
      }
    ],
    current: 0
  },
  // 页面加载
  onLoad: function (options) {

  },
  // 取得vols列表id对应的详细数据
  getVols: function (idList) {

  },
  // 页面初次渲染完成
  onReady: function () {
  },

  // 点击卡券整体跳转详情页
  viewDetailTap: function (event) {
    wx.navigateTo({
      url: 'detail/detail'
    });
  },

})