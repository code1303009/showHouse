// 
var itemList = ['皇城里\n\n参考价￥388', '你想要的生活\n\n参考价￥388', '煮酒论春秋\n\n参考价￥388', '幸福里\n\n参考价￥388','大学城-北欧风\n\n参考价￥388 ','少女心\n\n参考价￥268']
var imgCountList = [14,16,15,21,22,17]

var houseLocations = [
  {
    id:0,
    latitude: 41.806021,
    longitude: 123.470073,
    iconPath: '../../images/huangchengli/huangchengli_0.jpg',
    name:"皇城里",
    description:"这是描述",
    price:488
  },
  {
    id: 1,
    latitude: 41.805890,
    longitude: 123.469950,
    iconPath: '../../images/shenghuo/shenghuo_0.jpg',
    name: "你想要的生活",
    description: "这是描述",
    price: 488
  },
  {
    id: 2,
    latitude: 41.802500,
    longitude: 123.467980,
    iconPath: '../../images/zhujiu/zhujiu_0.jpg',
    name: "煮酒轮春秋",
    description: "这是描述",
    price: 488
  },
  {
    id: 3,
    latitude: 41.803760,
    longitude: 123.338890,
    iconPath: '../../images/xingfuli/xingfuli_0.jpg',
    name: "幸福里",
    description: "这是描述",
    price: 488
  },
  {
    id: 4,
    latitude: 41.922932,
    longitude: 123.402664,
    iconPath: '../../images/shenbei/shenbei_0.jpg',
    name: "沈北大学城",
    description: "这是描述",
    price: 488
  },
  {
    id: 5,
    latitude: 41.788715,
    longitude: 123.399319,
    iconPath: '../../images/shaonvxin/shaonvxin_0.jpg',
    name: "少女心",
    description: "这是描述",
    price: 488
  }
]

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
      description:'这是描述',
      price:'￥0'
    },
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
        var markerlist = []
        for (var i = 0;i<houseLocations.length;i++)
        {
          var marker = 
          {
                 id: i,
               latitude: houseLocations[i].latitude,
               longitude: houseLocations[i].longitude,
               iconPath: houseLocations[i].iconPath,
               width: 30,
               height: 30,
               callout: {
                  content: houseLocations[i].name,
                  color: "#000",
                  fontSize: 15,
                  borderRadius : 5,
                  padding : 10,
               }
          }
            markerlist.push(marker)
        }
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers:markerlist
        })
      }
    })
  },

  regionchange(e) {
    console.log("regionchange===" + e.type)
  },

  //点击merkers
  markertap(e) {
    console.log(houseLocations[e.markerId])
    this.setData({
      showModal: {
        id:e.markerId,
        show: true,
        pic: houseLocations[e.markerId].iconPath,
        title: houseLocations[e.markerId].name,
        description: houseLocations[e.markerId].description,
        price: '￥'+houseLocations[e.markerId].price+'/晚'
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
    console.log(this.data.showModal.id)
    var urlStr = "../detail/detail?key=" + this.data.showModal.id + '&imgCount=' + imgCountList[this.data.showModal.id];
    wx.navigateTo({
      url: urlStr,
    })
  }

})


