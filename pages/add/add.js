const qiniuUploader = require("../../utils/qiniuUploader");
//index.js

// 初始化七牛相关参数
function initQiniu() {
  let options = {
    region: 'ECN', // 华北区
    uptokenURL: app.apiURL+'/qiniu/uptoken',
    uptoken: 'ZBBVzh8MXXphhCt-IGg9QKFY-PbVXZgHN5ZhsEuD:mRQ-c6Gosg7UxEIkJo4D0yEYuYc=:eyJzY29wZSI6Im55d2MiLCJyZXR1cm5Cb2R5Ijoie1wia2V5XCI6XCIkKGtleSlcIixcImhhc2hcIjpcIiQoZXRhZylcIixcImJ1Y2tldFwiOlwiJChidWNrZXQpXCIsXCJmc2l6ZVwiOiQoZnNpemUpfSIsImRlYWRsaW5lIjoxODQzODc1ODc0fQ==',
    domain: 'http://nywcstatic.moontell.cn',
    shouldUseQiniuFileName: true
  };
  qiniuUploader.init(options);
}

//获取应用实例
var app = getApp()
Page({
  data: {
    files: [],
    imageObject: {},
    progress:0
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  //事件处理函数
  onLoad: function () {
    // console.log('onLoad')
    var that = this;
  },
  didPressChooesImage: function () {
    var that = this;
    didPressChooesImage(that);
  },
  //调整图片大小
  imageLoad: function (e) {
    var width = e.detail.width,    //获取图片真实宽度
      height = e.detail.height,
      ratio = width / height;    //图片的真实宽高比例
    var viewWidth = 750,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 750 / ratio;    //计算的高度值
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    // var width = viewWidth;
    // var height = viewHeight;
    this.setData({
      width:viewWidth,
      height: viewHeight
    })
  },
  formSubmit: function (e) {
    if (e.detail.value.dname==""){
      wx.showToast({
        title: '名称不能为空哦',
      })
      return;
    }

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: app.apiURL+'/design/update',
      data: {
        "dkey": this.data.imageObject.key,
        "openId": app.globalData.openId,
        "dname": e.detail.value.dname
      },
      header: { 'content-type': 'application/json' },
      method: "post",
      success: function (res) {
        wx.showToast({
          title: '修改名称成功',
        })
        // console.log("修改图片信息的api调用结果: ");
        // console.log(res);
        // console.info("修改图片信息的api调用状态码： " + res.statusCode);
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件');
  }
});

function didPressChooesImage(that) {
  initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
    count: 1,
    success: function (res) {
      var filePath = res.tempFilePaths[0];
      // 交给七牛上传
      qiniuUploader.upload(filePath, (res) => {
        that.setData({
          'imageObject': res
        });
        //调用存储到数据库的api
        wx.request({
          url: app.apiURL+'/design/insert',
          data:{
            "dkey": that.data.imageObject.key,
            "imageURL": that.data.imageObject.imageURL,
            "openId":app.globalData.openId,
            "dname":"雍物集",
            "dinfo":""
          },
          header: { 'content-type': 'application/json' },
          method:"post",
          success:function(res){
            // console.log("插入图片信息的api调用结果: ");
            // console.log(res);
            // console.info("插入图片信息的api调用状态码： "+res.statusCode);
            wx.showToast({
              title: '上传成功',
            })
          }
        })
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
      },
        // , {
        //     region: 'NCN', // 华北区
        //     uptokenURL: 'https://[yourserver.com]/api/uptoken',
        //     domain: 'http://[yourBucketId].bkt.clouddn.com',
        //     shouldUseQiniuFileName: false
        //     key: 'testKeyNameLSAKDKASJDHKAS'
        //     uptokenURL: 'myServer.com/api/uptoken'
        // }
        null,// 可以使用上述参数，或者使用 null 作为参数占位符
        (progress) => {
          that.setData({ progress: progress.progress})
          console.log('上传进度', progress.progress)
          // console.log('已经上传的数据长度', progress.totalBytesSent)
          // console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
        }
      );
    }
  })
  that.setData({ progress: 0 })
}