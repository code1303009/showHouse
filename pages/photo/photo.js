// var app = getApp()
var houseList = [{
  "houseDescription":
    "亮点：【近中街】步行5分钟，逛街逛景点超方便 【投影仪】超大屏幕/wifi联网，可手机推送。 内置芒果TV,最新电影综艺 2.手机app爱奇艺等 无线推送 3.手机相册内容无线推送  4.电视台直播 5.USB/HDMI 【60寸智能电视】超大电视，连网视频 【麻将】隐藏于屋内哈  《床铺情况》 【主卧】1.8×2米双人床，可睡2-3人 【次卧】1.5*2双人床，可睡2人 【客厅】沙发可睡一人。///可免费加个双人榻榻米，就是10cm厚的海绵床垫，1.8*2米，可睡2-3人————————————————————《交通》 地铁1号线 东中街地铁站 A口出，步行5分钟。到各景点(地标)距离：【中街】距离中街上最近的商场：大悦城，步行5分钟【故宫】2公里 打车起步价8元 不到10分钟。步行25分钟，沿着商业街走就行。【兴顺夜市】打车24元 半个小时【沈阳北站】打车11元，15分钟。地铁6站 半个小时【沈阳站】打车20元 25分钟。地铁 6站 半个小时 【小区：香檀1917】其余地点距离请自行搜索———————————————————— 《厨房》【厨具】齐全，为苏泊尔套装 有：| 煮锅 | 炒锅 | 煎锅 | 电磁炉 | 电饭煲 | 热水壶 | 鸳鸯锅 【餐具】够8个人左右同时用餐。 【调味品】我们不负责提供食材和调味品，不过屋内有很多以前做饭的客人留下的调味品。房扫会把新鲜的留下。当然您可以免费使用 ^ -^ 【菜市场】小区后门直达菜市场 购买食材非常方便。 ————————————————————— 【清洁】| 厨具 | 餐具 | 免费使用，但请亲使用后，自行清理恢复整洁。否则加收50元清洁费用, 概不减免。自行清理则免费使用。———————————————————— 《停车》 正门门口有一排免费停车位//如果停满的话，马路斜对面有个肿瘤医院，它前面有个收费停车场：白天 2元/小时，过夜总共10元//不要停在非车位的位置，会贴条。自驾请提醒房东，给您发送停车示意图。  《行李寄存》 小区里有个小卖铺可提供寄存，老板收费五元每件。 ————————————————《注意事项》 【厨房清洁】| 厨具 | 餐具 | 免费使用，但请亲使用后，自行清理恢复整洁！！！否则加收50元清洁费用, 概不减免。自行清理则免费使用。 【垃圾】房扫打扫不易，请亲自觉配合将垃圾置于垃圾袋内哦~厨房和餐具免费使用，但使用厨房和餐具，请自行清理恢复整洁，否则加收60元清洁费用。自行清洁则免费。清洁费用不讨价还价，望住客自觉，严格遵守。",
"houseId":"0",
"houseName":"皇城里",
"housePic":"https://publish-c39860.tcb.qcloud.la/images/huangchengli/huangchengli_0.jpg",
"housePrice":"288"
}]
Page({
  data:{
    listArray:houseList,
    logs:[]
  },

  //事件处理函数
  gotoPhotoDetail:function(e){
    console.log(e.currentTarget)
    var index = e.currentTarget.id
    var urlStr = "../detail/detail?key=" + houseList[index].houseId
    wx.navigateTo({
      url:urlStr,
    })
  },

  onLoad:function(options){
    console.log('onLoad')
    var that = this

    const db = wx.cloud.database({
      env:'publish-c39860'
    })

    db.collection('cameraShowList').doc().get({
      success:function(res){
        houseList = res.data["houseCardList"],
        that.setData({
          listArray:houseList,
        })
      }
    })
  }
})

