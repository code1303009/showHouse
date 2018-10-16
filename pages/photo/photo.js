var app = getApp()
var houseList = []
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

