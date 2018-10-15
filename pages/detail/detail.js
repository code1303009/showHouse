var naviTitle = "民宿详情";
var houseDetailList = []

Page({
  data: {
    houseDetailPicList: [],
    houseDescription:"",
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 2000,
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  imgUrls:function (e){

  },
  photoTapClick: function (e){
    var that = this;
    console.log(e)
    wx.navigateTo({
      url: '../fullScreenPhoto/fullScreenPhoto?url='+e.currentTarget.id+'&naviTitle='+naviTitle,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function (options){
    var that = this;
    console.log(options)

    const db = wx.cloud.database({
      env: 'publish-c39860'
    })

    var imgList = []
    db.collection("houseDetail").doc().get({
      success: function (res) {
        houseDetailList = res.data["houseList"]
        //获取房屋详情model
        var houseDetailModel = houseDetailList[options.key]
        console.log(houseDetailModel)
        naviTitle = houseDetailModel["houseName"]
        for (var i = 0; i < houseDetailModel["housePicCount"]; i++) {
          imgList.push(houseDetailModel["housePicPrefix"] + i + '.jpg')
        }

        wx.setNavigationBarTitle({
          title: naviTitle,
        })

        that.setData({
          houseDetailPicList: imgList,
          houseDescription:houseDetailModel.houseDescription
        })
      }
    })
  }

})