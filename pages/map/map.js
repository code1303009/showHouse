// 
var itemList = ['皇城里\n\n参考价￥388', '你想要的生活\n\n参考价￥388', '煮酒论春秋\n\n参考价￥388', '幸福里\n\n参考价￥388','大学城-北欧风\n\n参考价￥388 ','少女心\n\n参考价￥268']
Page({
  data: {
    Height: 0,
    scale: 16,
    latitude: "",
    longitude: "",
    markers: [],
    controls: [{
      id: 1,
      iconPath: '../../images/map-sub.png',
      position: {
        left: 0,
        top:  50,
        width: 40,
        height: 40
      },
      clickable: true
    },
    {
      id: 2,
      iconPath: '../../images/map-add.png',
      position: {
        left: 40,
        top: 50,
        width: 40,
        height: 40
      },
      clickable: true
    }
    ],
    circles: []
  },

  onLoad: function () {
    var _this = this;

    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight,
          }
        })
      }
    })

    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {

        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: 0,
            latitude: 41.806021,
            longitude: 123.470073,
            iconPath: '../../images/house.png',
            width: 30,
            height: 30,
            callout: {
              content: "皇城里",
              color: "#000",
              fontSize: 20,
            },
            // label: {
            //   color: "#000",
            //   fontSize: 12,
            //   content: "皇城里",
            //   x: 41.806021,
            //   y: 123.470073
            // }
          }, {
            // 41.805890,123.469950
            id: 1,
            latitude: 41.805890,
            longitude: 123.469950,
            iconPath: '../../images/house.png',
            width: 30,
            height: 30,
            callout: {
              content: "你想要的生活",
              color: "#000",
              fontSize: 20,
             }
            }, {
              // 41.802500,123.467980
              id: 2,
              latitude: 41.802500,
              longitude: 123.467980,
              iconPath: '../../images/house.png',
              width: 30,
              height: 30,
              callout: {
                content: "煮酒轮春秋",
                color: "#000",
                fontSize: 20,
                bgColor: "#fff",
                boxShadow: "2px 2px 10px #aaa"
              }
          }, {
            // 41.803760,123.338890
            id: 3,
            latitude: 41.803760,
            longitude: 123.338890,
            iconPath: '../../images/house.png',
            width: 30,
            height: 30,
            callout: {
              content: "幸福里",
              color: "#000",
              fontSize: 20,
            }
            }, {
              // 41.922932,123.402664
              id: 4,
              latitude: 41.922932,
              longitude: 123.402664,
              iconPath: '../../images/house.png',
              width: 30,
              height: 30,
              callout: {
                content: "北欧风近方特 大学城",
                color: "#000",
                fontSize: 30,
              }
          }, {
            // 41.788715,123.399319
            id: 5,
            latitude: 41.788715,
            longitude: 123.399319,
            iconPath: '../../images/house.png',
            width: 30,
            height: 30,
            callout: {
              content: "少女心",
              color: "#000",
              fontSize: 20,
            }
          }
         ],
        })
      }

    })


  },

  regionchange(e) {
    console.log("regionchange===" + e.type)
  },

  //点击merkers
  markertap(e) {
    console.log(e.markerId)

    wx.showActionSheet({
      itemList: [itemList[e.markerId]],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '../detail/detail',
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })

  },

  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    console.log("scale===" + this.data.scale)
    if (e.controlId === 1) {
      that.setData({
        scale: --this.data.scale
      })
    } else {
      that.setData({
        scale: ++this.data.scale
      })
    }
  },
})


