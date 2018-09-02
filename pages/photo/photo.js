var app = getApp()
var imgCountList = [14, 16, 15, 21, 22, 17]

Page({
  data: {
    listArray:[
      {
        id:0,
        pic:"../../images/huangchengli/huangchengli_0.jpg",
        title:"皇城里",
        message:"皇城里介绍"
      },
      {
        id: 1,
        pic: "../../images/shenghuo/shenghuo_0.jpg",
        title: "你想要的生活",
        message: "你想要的生活介绍"
      },
      {
        id: 2,
        pic: "../../images/zhujiu/zhujiu_0.jpg",
        title: "煮酒论春秋",
        message: "煮酒论春秋介绍"
      },
      {
        id:3,
        pic: "../../images/xingfuli/xingfuli_0.jpg",
        title: "幸福里",
        message: "幸福里介绍"
      },
      {
        id:4,
        pic: "../../images/shenbei/shenbei_0.jpg",
        title: "大学城（北欧风）",
        message: "大学城介绍"
      },
      {
        id:5,
        pic: "../../images/shaonvxin/shaonvxin_0.jpg",
        title: "少女心",
        message: "少女心介绍"
      }
    ],
    logs: []
  },
  //事件处理函数
  gotoPhotoDetail: function (e) {
    var urlStr = "../detail/detail?key=" + e.currentTarget.id + '&imgCount=' + imgCountList[e.currentTarget.id];
    wx.navigateTo({
      url: urlStr,
    })
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})

