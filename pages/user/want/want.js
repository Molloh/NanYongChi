// pages/user/want/want.js

const api = require('../../../api/api.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wants: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getIWant({
      data: {
        openId: app.globalData.openId,
      },
      success: (res) => {
        console.log(res.data);
        this.setData({
          wants: res.data,
        })
      }
    })
  },

  viewDetailTap: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/home/detail/detail?dkey=' + id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})