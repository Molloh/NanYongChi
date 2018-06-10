# NanYongChi
南雍记


```js
//发布新评论所需要的data 如下
url: app.apiURL + "/design/newComment",
header: { 'content-type': 'application/json' },
method: "post",
  data:{
  "dkey":"就是图片的唯一标识",
    "openIdComm":"评论人的openId",
      "dcomment":"评论内容",
  }

//恢复评论所需要的data如下
url: app.apiURL + "/design/replyComment",
header: { 'content-type': 'application/json' },
method: "post",
data：{
  "dcid":"就是图片的唯一标识",
  "reply":"回复的内容"
}

//收藏设计的api
url: app.apiURL + "/card/iwant",
header: { 'content-type': 'application/json' },
method: "post",
data:{ 
    "dkey":"Ft3L9YjArsKejp8gUsSRKmqLJn_4",
    "wantOpenId":"oPL165f72as52n8d3l9xsulWvKtY", 
    "what":"T恤" 或者不发送这个字段，MySQL会默认为t恤
}


//查看某用户所收藏的设计
url: app.apiURL +"/member/getiwant?openId=oPL165cCi274DQKc-J5OGJiu-PQg"
```


