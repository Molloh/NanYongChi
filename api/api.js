const prefix = "https://nywc.moontell.cn/nywc/api/";

const wxRequest = (params, url) => {
  wx.showLoading({
    title: 'Loading...',
  });
  wx.request({
    url: url,
    data: params.data || '',
    header: {
      'content-type': 'application/json'
    },
    method: params.method || 'GET',
    success: (res) => {
      params.success && params.success(res);
      wx.hideLoading();
    },
    fail: (res) => {
      params.fail && params.fail(res);
    },
    complete: (res) => {
      params.complete && params.complete(res);
    }
  })
} 

// home
const getCardsList = (params) => wxRequest(params, prefix + 'card/details');
const getCardByDkey = (params) => wxRequest(params, prefix + 'card/singleCardDetails');
const submitComment = (params) => wxRequest(params, prefix + 'design/newComment');

module.exports = {
  getCardsList,
  getCardByDkey,
  submitComment
}