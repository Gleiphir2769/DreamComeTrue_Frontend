// pages/team/team.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //队伍列表是个json数组
    teamList = [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /**
   * 跳转到队伍详情
   */
  detail() {
    wx.navigateTo({
      url: '../team/teamDetail/teamDetail',
    })
  },

  // 获取队伍列表
  getTeamList(){
    let that=this;
    wx.request({
      url: 'https://www.baidu.com', //仅为示例，并非真实的接口地址
      method:"GET",
     
      success (res) {
        if(res.statusCode == 200){
          //获得队伍列表
          this.setData({
            teamList: res.data
          })
        }else{
          //失败
          wx.showToast({
            title: '获取队伍列表失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },



})