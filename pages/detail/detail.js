var naviTitle = "民宿详情";
var houseDetailList = []
var houseDetailModel = {}
var picList = []

Page({
  data: {
    houseCoverImage:"",
    houseDetailPicList: [],
    houseDescription:"",
    indicatorDots: false,
    autoplay: false,
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
  photoTapClick: function (e){
    var indexStr_after = e.currentTarget.id.split('_')[1]//获取"_"号分割的字符串尾部的字符串
    var indexId = indexStr_after.split('.')[0]

    // wx.previewImage({
    //   current: e.currentTarget.id,
    //   urls: houseDetailList,
    // })
  },

  gotoPicCollectionView: function (e) {
    wx.navigateTo({
      url: '../picCollectionView/picCollectionView?naviTitle=' + naviTitle + '&picPrefix=' + houseDetailModel.housePicPrefix + '&picCount=' + houseDetailModel.housePicCount,
    })
  },

  onLoad: function (options){
    var that = this

    const db = wx.cloud.database({
      env: 'publish-c39860'
    })

    var imgList = []
    db.collection("houseDetail").doc().get({
      success: function (res) {
        houseDetailList = res.data["houseList"]
        //获取房屋详情model
        houseDetailModel = houseDetailList[options.key]
        naviTitle = houseDetailModel["houseName"]
        for (var i = 0; i < houseDetailModel["housePicCount"]; i++) {
          imgList.push(houseDetailModel["housePicPrefix"] + i + '.jpg')
        }

        var descStr = houseDetailModel.houseDescription.split('&hc').join('\n')

        wx.setNavigationBarTitle({
          title: naviTitle,
        })

        picList = imgList

        that.setData({
          houseCoverImage:imgList[0],
          houseDetailPicList: imgList,
          houseDescription:descStr,
        })
      }
    })
  }

})