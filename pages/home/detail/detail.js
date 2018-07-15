// pages/home/detail/detail.js
const api = require("../../../api/api.js");
const util = require("../../../utils/util.js");
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
    comments: [],
    imageURLs: []
  },
  onLoad: function (options) {
    //如果是通过扫码进入
    if(options.q!=undefined){
      var qrcode = decodeURIComponent(options.q)
      console.log("扫码结果", qrcode)
      //qrcode=http://nywcstatic.moontell.cn/FvKc9xFaIxK1taFqUBc3mSRMia9A
      var vardkey=qrcode.substr(30);
      console.log("扫码得到的dkey为：",vardkey);
      options.dkey=vardkey
    }


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
        let coms = [];
        for (let i in res.data.comments) {
          coms.push({
            nickName: res.data.comments[i].nickName,
            avatarURL: res.data.comments[i].avatarURL,
            dcomment: res.data.comments[i].dcomment,
            comTime: util.formatTime(res.data.comments[i].comTime)
          })
        }
        this.setData({
          detail: {
            hpcontent_id: res.data.dkey,
            hp_img_url: res.data.imageURL,
            hp_title: res.data.dname,
            hp_author: res.data.nickName,
            hp_makettime: util.formatTime(res.data.uploadTime),
            hp_content: res.data.dinfo
          },
          serial: {
            praisenum: res.data.numLike,
            commentnum: res.data.comments.length,
          },
          comments: coms,
          imageURLs: res.data.imageURLs
        })
        wx.setNavigationBarTitle({
          title: res.data.dname,
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
            title: '从心愿单中移除',
            icon: "success",
            duration: 600,
            success: (res) => {
              this.setData({
                isCollected: !bool,
              });

              var varserial = this.data.serial;
              varserial.praisenum--;
              this.setData({
                serial: varserial
              })
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
            title: '添加至心愿单',
            icon: "success",
            duration: 600,
            success: (res) => {
              this.setData({
                isCollected: !bool,
              });

              var varserial = this.data.serial;
              varserial.praisenum++;
              this.setData({
                serial: varserial
              })
            }
          });
        }
      })
    }
  },

  // 点击分享事件
  onShareTap: function () {
  },

  // 页面分享
  onShareAppMessage: function () {
    console.log("用户分享")
    return {
      title: '南雍记  ' + this.data.detail.hp_title,
      path: '/pages/home/detail/detail?dkey=' + this.data.detail.hpcontent_id,
      imageUrl: this.data.detail.hp_img_url
    }
  }

})