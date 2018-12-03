// pages/one/one.js
var INFO = wx.getSystemInfoSync();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    datajson:{},
    opacity: 0,
    SCROLL_TOP: 0,
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
        method:"POST",
        data: { 
          "TransCode": "030112", 
          "OpenId": "123456789", 
          "Body": ""
        },
        success: function (res) {
          //截取时间格式
          var getDateArr = [];
          var getDateLength = res.data.Body.length;
          for (var i = 0; i < getDateLength; i++) {
            if (res.data.Body[i].date.length < 20) {
              // 重新拼接字符串
              year = res.data.Body[i].date.substring(0, 4);
              month = res.data.Body[i].date.substring(5, 7);
              day = res.data.Body[i].date.substring(8, 11);
              res.data.Body[i].date = year + " / " + month + " / " + day;
              // console.log(res.data.Body[i].date);
            }
          }
          that.setData({
            datajson: res.data.Body
          })
          console.log(res.data.Body)
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
  }
})
