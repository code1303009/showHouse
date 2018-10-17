Page({

  /**
   * 页面的初始数据
   */
  data: {
    housePicList:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var indexId = options.indexId
    var title = options.naviTitle
    var picPrefix = options.picPrefix
    var picCount = options.picCount
    // console.log(options)
    var picList = []
    for (var i = 0;i<picCount;i++){
      picList.push(picPrefix + i + '.jpg')
    }
    var url = picList[indexId]

    this.setData({
      housePicList:picList
    })

    wx.setNavigationBarTitle({
      title: title,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { }
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