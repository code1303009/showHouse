var imageList = ['../../images/huangchengli/huangchengli_', '../../images/shenghuo/shenghuo_', '../../images/zhujiu/zhujiu_', '../../images/xingfuli/xingfuli_', '../../images/shenbei/shenbei_', '../../images/shaonvxin/shaonvxin_']

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 2000,
    // imageHeight:150
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
    wx.navigateTo({
      url: '../fullScreenPhoto/fullScreenPhoto?key=666',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function (options){
    var that = this.data;
    console.log(options.key)
    var indexId = options.key
    var imgCount = options.imgCount    
    var imgList = []
    for (var i = 0; i < imgCount; i++) {
        var imgUrl = imageList[indexId]+i+'.jpg'
        imgList.push(imgUrl)
    }
    this.setData({
      imgUrls: imgList,
      scroHeight: 1000
    })

    // wx.getSystemInfo({
      // success: function(res) {
      // imageHeight = res.screenHeight*40%
      // }
    // })
  }

})