
var houseLocations = [];
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
              // console.log(houseLocations[i].houseCoverImage)
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
              latitude: res.latitude,
              longitude: res.longitude,
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
    console.log("regionchange===" + e.type)
  },

  //点击markers
  markertap(e) {
    var that = this
    console.log(houseLocations[e.markerId])
    that.setData({
      showModal: {
        id:e.markerId,
        show: true,
        pic: houseLocations[e.markerId].houseCoverImage,
        title: houseLocations[e.markerId].houseName,
        description: houseLocations[e.markerId].houseDescription,
        price: '￥'+houseLocations[e.markerId].housePrice+'/晚'
      }
    })
    // wx.showModal({
    //   title: e.markerId,
    //   content: '',
    // })

    // wx.showToast({
    //   title: '',
    // })

    // var currentStatu = e.currentTarget.dataset.statu;
    // this.util(currentStatu)
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
    var urlStr = "../detail/detail?key=" + this.data.showModal.id;
    wx.navigateTo({
      url: urlStr,
    })
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  }
})


