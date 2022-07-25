// pages/team/team.js
import {teamapi} from '../../api/team-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //队伍列表是个json数组
    teamList : [
      {
        name : '小小1',
        headcount : 15,
        teamStatus : 1,
        createTime : 1,
        area : '丰台',
        tid : 10
      },
      {
        name : '小小2',
        headcount : 15,
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
    let item = e.currentTarget.dataset.item;
    item = JSON.stringify(item)
    wx.navigateTo({
      url: '../team/teamDetail/teamDetail?item=' + item,
    })
  },

  // 获取队伍列表
  getTeamList(){
    let that = this
    teamapi.getTeamList().then(res=>{
      console.log(res, '获取队伍列表')
      if(res.data.code === 20000) {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].createTime = res.data.data[i].createTime.substring(0, 10);
        }
        that.setData({
          teamList: res.data.data
        })
      }
    })
  },



})