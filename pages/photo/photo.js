var app = getApp()
var houseList = []
// var pushList = [
//   {
//     houseId: 0,
//     housePic: "https://publish-c39860.tcb.qcloud.la/images/huangchengli/huangchengli_0.jpg",
//     houseName: "皇城里",
//     houseDescription: "皇城里介绍",
//     housePrice:288
//   },
//   {
//     houseId: 1,
//     housePic: "https://publish-c39860.tcb.qcloud.la/images/shenghuo/shenghuo_0.jpg",
//     houseName: "你想要的生活",
//     houseDescription: "你想要的生活介绍",
//     housePrice: 288
//   },
//   {
//     houseId: 2,
//     housePic: "https://publish-c39860.tcb.qcloud.la/images/zhujiulunchunqiu/zhujiu_0.jpg",
//     houseName: "煮酒论春秋",
//     houseDescription: "煮酒论春秋介绍",
//     housePrice: 288
//   },
//   {
//     houseId: 3,
//     housePic: "https://publish-c39860.tcb.qcloud.la/images/xingfuli/xingfuli_0.jpg",
//     houseName: "幸福里",
//     houseDescription: "幸福里介绍",
//     housePrice: 288
//   },
//   {
//     houseId: 4,
//     housePic: "https://publish-c39860.tcb.qcloud.la/images/shenbei/shenbei_0.jpg",
//     houseName: "大学城（北欧风）",
//     houseDescription: "大学城介绍",
//     housePrice: 288
//   },
//   {
//     houseId: 5,
//     housePic: "https://publish-c39860.tcb.qcloud.la/images/shaonvxin/shaonvxin_0.jpg",
//     houseName: "少女心",
//     houseDescription: "少女心介绍",
//     housePrice: 288
//   }
// ]

Page({
  data: {
    listArray: houseList,
    logs: []
  },
  //事件处理函数
  gotoPhotoDetail: function (e) {
    console.log(e.currentTarget)
    var index = e.currentTarget.id;
    var urlStr = "../detail/detail?key=" + houseList[index].houseId;
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

    const db = wx.cloud.database({
      env: 'publish-c39860'
    })

    db.collection("cameraShowList").doc().get({
      success:function(res){
        houseList = res.data["houseCardList"],

        that.setData({
          listArray:houseList
        })
      }
    })

  }
})

