// pages/team/team.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //队伍列表是个json数组
    teamList : [
      {
        name : '小牛马',
        headcount : 1,
        teamStatus : 1,
        createTime : 1,
        area : '丰台',
        tid : 10
      },
      {
        name : '小牛马',
        headcount : 1,
        teamStatus : 1,
        createTime : 1,
        area : '丰台',
        tid : 15
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getTeamList()
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
    this.getTeamList()
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
  detail(e) {
    let id = e.currentTarget.dataset.index;
    console.log(id)
    wx.navigateTo({
      url: `../team/teamDetail/teamDetail?id=`+id,
    })
  },

  // 获取队伍列表
  getTeamList(){
    let that=this;
    wx.request({
      url: 'https://dream.cihss.net/api/teams',
      method:"GET",
     
      success (res) {
        if(res.statusCode == 200){
          //获得队伍列表
          that.setData({
            teamList: res.data
          });
          wx.showToast({
            title: '获取队伍列表失败',
            icon: 'none',
            duration: 2000
          });
        }else{
          //失败
          wx.showToast({
            title: '获取队伍列表失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },



})