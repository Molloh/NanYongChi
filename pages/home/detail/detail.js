// pages/home/detail/detail.js
const api = require("../../../api/api.js");
const app = getApp();

Page({
  commentValue: '',
  isCollected: false,
  data: {
    commentFocus: false,
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

  onCommentTap: function() {
    this.setData({
      commentFocus: true
    })
  },

  onTextAreaInput: function(e) {
    this.setData({
      commentValue: e.detail.value,
    });
  },

  onSubmitCommentTap: function(e) {
    let that = this;
    that.setData({
      commentFocus: false
    });
    api.submitComment({
      method: 'POST',
      data: {
        dkey: that.data.detail.hpcontent_id,
        openIdComm: app.globalData.openId,
        dcomment: that.data.commentValue,
      },
      success: (res) => {
        wx.showToast({
          title: '评论成功',
          icon: "success",
          duration: 1000,
          success: (res) => {
            that.onLoad({
              dkey: that.data.detail.hpcontent_id,
            });
          }
        })
      }
    })    
  },

  onCancelCommentTap: function () {
    this.setData({
      commentFocus: false
    })
  },

  // 点击收藏事件
  onCollectionTap: function() {
    this.setData({
      isCollected: !this.isCollected
    })
  },

  // 点击分享事件
  onShareTap: function () {
  },

  // 页面分享
  onShareAppMessage: function () {
  }

})