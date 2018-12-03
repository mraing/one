// pages/one/oneDetails/oneDetails.js
var INFO = wx.getSystemInfoSync();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    ondetails: {},
    newDay:"",
    newMonth: "",
    newYear: "",
    opacity: 0,
    STATUSBAR_HEIGHT: INFO.statusBarHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //调取json数据
    var day = "";
    var month = "";
    var year = "";

    var that = this;
    wx.request({
      url: 'https://api.hibai.cn/api/index/index',
      method: "POST",
      data: {
        "TransCode": "030112",
        "OpenId": "123456789",
        "Body": ""
      },
      success: function (res) {
        //截取时间格式
        year = res.data.Body[options.key].date.substring(0, 4);
        month = res.data.Body[options.key].date.substring(5, 7);
        day = res.data.Body[options.key].date.substring(8, 11);
        res.data.Body[options.key].date = year + " / " + month + " / " + day;

        that.setData({
          ondetails: res.data.Body[options.key],
          newDay : day,
          newMonth: month,
          newYear: year
        })
        // console.log(res.data.Body[options.key])
        return false;
      },
      // 请求失败
      fail: function () {
        console.log("数据请求失败")
      }
    });
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    setTimeout(function () {
      wx.hideToast()
    }, 500);
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
  
  },
  scrollHandler: function (e) {
    var { scrollTop } = e.detail;
    // 计算透明度
    var opacity = parseFloat(scrollTop / 250).toFixed(2);
    if (opacity > 1) opacity = 1;
    if (opacity < 0.1) opacity = 0;
    // 这里设置<300是减少setData次数，节省内存
    if (scrollTop < 300) {
      this.setData({
        opacity
      })
    }
  },

  //点击图片预览、保存
  tapName: function (e) {
    wx.previewImage({
      current:"",
      urls: [e.target.dataset.src],
    })
  }
})