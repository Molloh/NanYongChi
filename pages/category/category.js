// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [
      {
        image: '/images/category/notebook.png',
        name: '笔记本'
      },
      {
        image: '/images/category/bug.png',
        name: '帆布袋'
      },
      {
        image: '/images/category/tshirt.png',
        name: 'T恤'
      },
      {
        image: '/images/category/cap.png',
        name: '遮阳帽' 
      },
      {
        image: '/images/category/mug.png',
        name: '马克杯'
      },
      {
        image: '/images/category/umbrella.png',
        name: '雨伞'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  // 点击卡券整体跳转详情页
  viewDetailTap: function (event) {
    let type = event.currentTarget.dataset.cateId;
    wx.navigateTo({
      url: '../list/list?type=' + type,
    });
  },
})