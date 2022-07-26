// pages/team/teamDetail/teamDetail.js
import {teamapi} from '../../../api/team-api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      role:'user',
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
        let item = JSON.parse(options.item)
        let role=wx.getStorageSync('role')
        this.setData({
            item,
            role,
            uid: wx.getStorageSync('uid'),
            tid: item.id
        })
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
    //   this.getTeamDetail()
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
        let that = this
        let id = that.data.tid
        teamapi.getTeamDetail(id).then(res=>{
          console.log(res, '获取队伍详情')
        //   if(res.data.code === 20000) {

        //   }
        })
    },

    // 提交入队申请
    joinTeam() {
        let that = this
        let tid = that.data.tid
        let uid = that.data.uid
        teamapi.joinTeam(tid, uid).then(res=>{
          console.log(res, '提交入队申请')
          if(res.data.code === 20000) {
            wx.showToast({
                title: '加入成功',
                icon: 'success',
                duration: 2000
            })
          }else{
            wx.showToast({
              title: '不能重复加入',
              image: '../../../images/icons/wrong.png',
              duration: 2000
          })
          }
        })
    },
})