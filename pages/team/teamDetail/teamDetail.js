// pages/team/teamDetail/teamDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      // 队伍详情应该是一个json数组,里面是字典
      teamDetail : [
        {
          name:1,
          leader:1,
          leaderTelephone:1,
          contactEmail:1,
          contact:1,
          contactTelephone:1,
          organizer:1,
          headcount:1,
          serveField:1,
          area:1,
          address:1
        }
      ],
      // 用户uid,这玩意从哪获取？
      uid : 1,
      tid : 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
        uid:options.uid,
        tid:options.tid
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      this.getTeamDetail()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      this.getTeamDetail()
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
      let tid=that.data.tid;
      wx.request({
        url: `https://dream.cihss.net/api/teams/${tid}`, //仅为示例，并非真实的接口地址
        method:"GET",
      
        success (res) {
          if(res.statusCode == 200){
            //成功
            //和后端还没通
            that.setData({
              teamDetail : res.data
            })
          }else{
            //失败
            // wx.showToast({
            //   title: '获取队伍详情失败',
            //   icon: 'none',
            //   duration: 2000
            // })
          }
        }
      })
    },
    // 提交入队申请
    joinTeam : function(){
      let that=this;
      let tid=that.data.tid;
      let uid=that.data.uid;
      wx.request({
        url: `https://dream.cihss.net/api/teams/${tid}/applications/${uid}`, //仅为示例，并非真实的接口地址
        method:"GET",
        success (res) {
          if(res.statusCode == 200){
            //成功
            //和后端还没通
            wx.showToast({
              title: '申请加入队伍成功',
              icon: 'none',
              duration: 2000
            })
          }else{
            //失败
            // wx.showToast({
            //   title: '申请加入队伍失败',
            //   icon: 'none',
            //   duration: 2000
            // })
          }
        }
      })
    },
})