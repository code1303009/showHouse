var houseTotalPics = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picHeader:"",
    picList:[]
  },
  /**
   * 查看大图
  */
  lookBigPic: function (e) {
    var indexStr_after = e.currentTarget.id.split('_')[1]//获取"_"号分割的字符串尾部的字符串
    var indexId = indexStr_after.split('.')[0]

    wx.previewImage({
      current: e.currentTarget.id,
      urls: houseTotalPics,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var title = options.naviTitle
    var picPrefix = options.picPrefix
    var picCount = options.picCount
    // console.log(options)
    var housePicList = []
    var houseHeaderPic = ""
    for (var i = 0; i < picCount; i++) {
      if (i == 0){
        houseHeaderPic = picPrefix + i + '.jpg'
      }else{
        housePicList.push(picPrefix + i + '.jpg')
      }
      houseTotalPics.push(picPrefix + i + '.jpg')
    }

    this.setData({
      picList: housePicList,
      picHeader:houseHeaderPic
    })

    wx.setNavigationBarTitle({
      title: title,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})