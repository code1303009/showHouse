
var houseLocations = []
// "两室一厅，89平，2大床+1沙发+1榻榻米&hc地铁1号线，东中街站，香檀1917&hc近中街，燃气热水器不间断，大投影，联网空调&hc适合想逛附近景点的亲~推荐4 - 6人入住"
/**
 * 页面代码
*/
Page({
  data: {
    showModal: {
      id:0,
      show:false,
      pic:'',
      title:'这是题目',
      description0:'这是描述0',
      description1: '这是描述1',
      description2: '这是描述2',
      description3: '这是描述3',
      price:'￥0'
    },
    Height: 0,
    scale: 13,
    // 41.8515070000, 123.4002680000 北陵公园
    latitude: 41.851507,
    longitude: 123.400268,
    markers: [],
    controls: [],
    circles: [],
  },

  onLoad: function () {
    var _this = this;
    //分享
    wx.showShareMenu({
      withShareTicket: true
    })

    // 1. 获取数据库引用
    const db = wx.cloud.database({
      env: 'publish-c39860'
    })

    db.collection('maplocations').doc().get({
      success: function (res) {
        // res.data 包含该记录的数据
        houseLocations=res.data['locations']
        wx.getLocation({
          type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
          success: function (res) {
            var markerlist = []
            for (var i = 0; i < houseLocations.length; i++) {
              var marker =
                {
                  id: i,
                  latitude: houseLocations[i].latitude,
                  longitude: houseLocations[i].longitude,
                  iconPath: houseLocations[i].houseCoverImage,
                  width: 60,
                  height: 60,
                  callout: {
                    content: houseLocations[i].houseName,
                    color: "#000",
                    fontSize: 15,
                    borderRadius: 5,
                    padding: 10,
                  }
                }
              markerlist.push(marker)
            }
            _this.setData({
              // latitude: res.latitude,
              // longitude: res.longitude,
              markers: markerlist
            })
          }
        })

      }
    })

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
  },

  regionchange(e) {
    // console.log("regionchange===" + e.type)
  },

  //点击markers
  markertap(e) {
    var that = this

    var descStr = houseLocations[e.markerId].houseDescription.split('&hc').join('\n')

    that.setData({
      showModal: {
        id:e.markerId,
        show: true,
        pic: houseLocations[e.markerId].houseCoverImage,
        title: houseLocations[e.markerId].houseName,
        description0: houseLocations[e.markerId].alertdesc0,
        description1: houseLocations[e.markerId].alertdesc1,
        description2: houseLocations[e.markerId].alertdesc2,
        description3: houseLocations[e.markerId].alertdesc3,
        price: '￥'+houseLocations[e.markerId].housePrice+'/晚'
      }
    })
  },

  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
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
  /**
  * 弹出框蒙层截断touchmove事件
  */
  preventTouchMove: function () {

  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal :{
        show : false
      }
    });
  },
  /**
   * 跳转到房屋相册列表
  */
  gotoDetailVC: function (e){
    var urlStr = "../detail/detail?key=" + this.data.showModal.id;
    wx.navigateTo({
      url: urlStr,
    })
  }
})


