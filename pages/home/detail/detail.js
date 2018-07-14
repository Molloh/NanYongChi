// pages/home/detail/detail.js
const api = require("../../../api/api.js");
const app = getApp();

Page({
  data: {
    commentValue: '',
    isCollected: undefined,
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
    let openId = app.globalData.openId;
    api.checkIsCollected({
      data: {
        dkey: options.dkey,
        openId: openId,
      },
      success: (res) => {
        this.setData({
          isCollected: res.data,
        })
      }
    });
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
            hp_author: res.data.nickName,
            hp_makettime: res.data.uploadTime,
            hp_content: res.data.dinfo
          },
          serial: {
            praisenum: res.data.numLike,
            commentnum: res.data.comments.length,
          },
          comments: res.data.comments,
        })
      }
    });
    console.log(this.data);
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
    let dkey = this.data.detail.hpcontent_id;
    let openId = app.globalData.openId;
    let bool = this.data.isCollected;
    console.log(bool);
    if (bool) {
      api.iDontWant({
        data: {
          dkey: dkey,
          wantOpenId: openId,
        },
        method: '',
        success: (res) => {
          wx.showToast({
            title: '不想要了',
            icon: "success",
            duration: 600,
            success: (res) => {
              this.setData({
                isCollected: !bool,
              });
            }
          })
        }
      })
    } else {
      api.collectIWant({
        data: {
          dkey: dkey,
          wantOpenId: app.globalData.openId,
          what: 'T恤',
        },
        method: 'POST',
        success: (res) => {
          wx.showToast({
            title: '添加至我想要的',
            icon: "success",
            duration: 600,
            success: (res) => {
              this.setData({
                isCollected: !bool,
              });
            }
          })
        }
      })
    }
  },

  // 点击分享事件
  onShareTap: function () {
  },

  // 页面分享
  onShareAppMessage: function () {
  }

})