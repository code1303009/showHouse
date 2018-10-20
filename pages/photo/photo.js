// var app = getApp()
var houseList = []
Page({
  data:{
    listArray:[],
    logs:[]
  },

  //事件处理函数
  gotoPhotoDetail:function(e){
    var index = e.currentTarget.id
    var urlStr = "../detail/detail?key=" + houseList[index].houseId
    wx.navigateTo({
      url:urlStr,
    })
  },

  onLoad:function(options){
    var that = this
    
    const db = wx.cloud.database({
      env:'publish-c39860'
    })

    db.collection('cameraShowList').doc().get({
      success:function(res){
        houseList = res.data["houseCardList"]
        for (var i = 0; i < houseList.length;i++)
        {
          var desc = houseList[i].houseDescription.split('&hc').join('\n')
          houseList[i].houseDescription = desc
        }

        that.setData({
          listArray: houseList,
        })
      }
    })
  }
})

