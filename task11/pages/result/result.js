// pages/result/result.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    occupations: [],
    scrollLeft: 0,
    currentTab: 0,
  },

  setCurrentTab: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.tab
    });
  },

  changeTab: function (e) {
    var scrollLeft = ((e.detail.current + 1) - 3) + 1;
    if (scrollLeft < 0) {
      scrollLeft = 0;
    }
    this.setData({
      scrollLeft: scrollLeft * (this.data.windowWidth / 3),
      currentTab: e.detail.current
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const tmp = app.globalData.occupations;
    var occupations = []
    var that = this;
    wx.getStorage({
      key: 'recommand',
      success(res) {
        console.log(res.data)
        res.data.forEach(x => {
          tmp.forEach(y => { if (y.id == x){
            // 将salary字符串转json对象
            if(typeof(y.salary)=='string'){
              y.salary = JSON.parse(y.salary)
            }
            occupations.push(y)
          }})

        });
        that.setData({
          occupations
        });

        console.log(that.data.occupations);
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