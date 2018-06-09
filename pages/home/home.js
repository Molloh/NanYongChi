// pages/home/home.js

var app = getApp();

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
    //获取用户信息（原来的代码无效）
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      // 由于 请求getinfo接口 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.data
        })
        console.log("index 用户信息：", this.data.userInfo);
      }
    }

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