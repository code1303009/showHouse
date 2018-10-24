var textPicList = []

Page({
  data:{
    houseDescHeader: "",
    houseDescList: []
  },
  lookBigHeader: function (e) {
    wx.previewImage({
      current: 0,
      urls: textPicList,
    })
  },
  /**
   * 查看大图
  */
  lookBigPic: function (e) {
    wx.previewImage({
      current: e.currentTarget.id,
      urls: textPicList,
    })
  },
  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    var title = options.naviTitle
    var picList = options.houseDescPicList.split(',')
    textPicList = options.houseDescPicList.split(',')

    var lightSpotImage = ""
    var temList = []
    for (var i = 0;i<picList.length;i++){
        if (i == 0){
          lightSpotImage = picList[i]
        }else{
          temList.push(picList[i])
        }
    }

    this.setData({
      houseDescHeader: lightSpotImage,
      houseDescList: temList
    })

    wx.setNavigationBarTitle({
      title: title,
    })
  }
})