var imageList = ['../../images/huangchengli/huangchengli_', '../../images/shenghuo/shenghuo_', '../../images/zhujiu/zhujiu_', '../../images/xingfuli/xingfuli_', '../../images/shenbei/shenbei_', '../../images/shaonvxin/shaonvxin_']
var houseNameList = ['皇城里','你想要的生活','煮酒论春秋','幸福里','沈北大学城','少女心']
var naviTitle = "民宿详情"

Page({
  data: {
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
    var that = this.data;
    console.log(options)
    var indexId = options.key
    naviTitle = houseNameList[indexId]
    var imgCount = options.imgCount    
    var imgList = []
    for (var i = 0; i < imgCount; i++) {
        var imgUrl = imageList[indexId]+i+'.jpg'
        imgList.push(imgUrl)
    }
    this.setData({
      imgUrls: imgList,
    })

    wx.setNavigationBarTitle({
      title: naviTitle,
    })
  }

})