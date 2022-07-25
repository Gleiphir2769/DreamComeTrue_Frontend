// pages/project/project.js
import {api} from '../../api/project-api'
Page({

  data: {

  },

  onLoad(options) {
    this.setData({
      uid: wx.getStorageSync('uid')
    })
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
    let that = this
    let uid = that.data.uid
    // 获取能够参加的项目
    api.getProjects(uid).then(res=>{
      console.log(res, '获取能够参加的项目')
      if(res.data.code === 20000) {
        that.setData({
          projectLists: res.data.data
        })
      }
    })
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
   * 跳转到项目详情
   */
  detail(e) {
    let item = e.currentTarget.dataset.item
    item = JSON.stringify(item)
    wx.navigateTo({
      url: '../project/projectDetail/projectDetail?item=' + item,
    })
  }
})