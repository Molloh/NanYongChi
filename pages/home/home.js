// pages/home/home.js
const api = require('../../api/api.js');
const app = getApp();

Page({
  data: {
    animated: true,
    active: true,
    title: '',
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
          title: res.data[0].dname,
        })
      }
    })
  },

  onScanCode: function () {
    wx.scanCode({
      success: (res) => {
        console.log("二维码内容为",res.result)
        let id = res.result;

        api.getCardByDkey({
          data:{
            dkey:id
          },
          success:function(res){
            console.log(res.data);

            

            var dname = res.data.dname

            if (dname==undefined){
              wx.showModal({
                title:"无效二维码",
                content: '仅支持南雍文创商品的二维码哦',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  }
                }
              });
            }
            else{
              wx.showModal({
                title: '查看作品？',
                content: '是否查看作品：' + dname,
                confirmText: "查看",
                cancelText: "取消",
                success: function (res) {
                  console.log(res);
                  if (res.confirm) {
                    console.log('用户确认查看详情')
                    wx.navigateTo({
                      url: 'detail/detail?dkey=' + id
                    });
                  } else {
                    console.log('用户取消查看详情')
                  }
                }
              });
            }
          }
        })

        

       
      }
    });
  },

  toWishList: function () {
    wx.navigateTo({
      url: '../user/want/want',
    })
  },

  onSwiperChange: function (e) {
    let that = this;
    that.setData({
      animated: !that.data.animated,
    });
    setTimeout(function () {
      that.setData({
        title: that.data.recommends[e.detail.current].dname,
        animated: !that.data.animated,
      });
    }, 100);
  },

  // 页面初次渲染完成
  onReady: function () {
  },

  // 点击卡券整体跳转详情页
  viewDetailTap: function (event) {
    let id = event.currentTarget.dataset.recId;
    wx.navigateTo({
      url: 'detail/detail?dkey=' + id
    });
  },

})

