// pages/team/teamDetail/teamDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      //队伍详情应该是一个json字典
      teamDetail = {},
      // 用户uid,这玩意从哪获取？
      uid = '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },

      // 获取队伍详情
    getTeamDetail(){
      let that=this;
      wx.request({
        url: 'https://www.baidu.com', //仅为示例，并非真实的接口地址
        method:"GET",
      
        success (res) {
          if(res.statusCode == 200){
            //成功
            that.setData({
              teamDetail: res.data
            })
          }else{
            //失败
            wx.showToast({
              title: '获取队伍详情失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    },
    // 提交入队申请
    joinTeam(){
      let that=this;
      wx.request({
        url: 'https://www.baidu.com', //仅为示例，并非真实的接口地址
        method:"POST",
        data:{
          uid: that.data.uid,
          gid: that.data.teamDetail.gid
        },
        success (res) {
          if(res.statusCode == 200){
            //成功
            wx.showToast({
              title: '申请加入队伍成功',
              icon: 'none',
              duration: 2000
            })
          }else{
            //失败
            wx.showToast({
              title: '申请加入队伍失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    },
})