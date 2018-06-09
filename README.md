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
```


