// pages/my/project/project_detail/project_detail.js
import {api} from '../../../../api/my_project-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    projectTime: 0,
    // 当前页面处于那种状态
    page_status: '',
  },
  // 签到处理函数
  signin(e) {
    let uid = wx.getStorageSync('uid');
    let pid = this.data.item.id;
    let inTime = api.GetCurrentTimeStr()
    console.log("pid:" + pid)
    api.postSignIn(uid, pid, inTime).then(res=>{
      console.log("res.data:" + res.data.message)
      let mess = res.data.message;
      let code = res.data.code;
      if (code === 20000) {
        wx.showToast({
          title: '签到成功！',
          icon: 'success',
          duration: 2000 //持续的时间
        })
      } else if (code === 50006) {
        wx.showToast({
          title: '请勿重复签到！',
          icon: 'error',
          duration: 2000 //持续的时间
        })
      } else if (code === 50000) {
        wx.showToast({
          title: '签到失败！',
          icon: 'error',
          duration: 2000 //持续的时间
        })
      } else {
        wx.showToast({
          title: '签到失败！',
          icon: 'error',
          duration: 2000 //持续的时间
        })
      }
    });
  },

  // 签出处理函数
  signout(e) {
    let uid = wx.getStorageSync('uid');
    let pid = this.data.item.id;
    let outTime = api.GetCurrentTimeStr()
    console.log("pid:" + pid)
    api.putSignOut(uid, pid, outTime).then(res=>{
      console.log("res.data:" + res.data.message)
      let mess = res.data.message;
      let code = res.data.code;
      if (code === 20000) {
        wx.showToast({
          title: '签出成功！',
          icon: 'success',
          duration: 2000 //持续的时间
        })
      } else if (code === 50006) {
        wx.showToast({
          title: '请勿重复签出！',
          icon: 'error',
          duration: 2000 //持续的时间
        })
      } else if (code === 50000) {
        wx.showToast({
          title: '签出失败！',
          icon: 'error',
          duration: 2000 //持续的时间
        })
      } else {
        wx.showToast({
          title: '签出失败！',
          icon: 'error',
          duration: 2000 //持续的时间
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    let p = options.item
    console.log("onShow : p" + p)
    let res = JSON.parse(p)
    console.log("res: " + res)
    let status = options.status
    console.log("onLoad status :" + status)
    this.setData({
      item: res,
      page_status: status,
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
    let uid = wx.getStorageSync('uid');
    let pid = this.data.item.id;
    console.log("UID:" + uid + "PID:" + pid)
    api.getProjectTimeLong(uid, pid).then(res=>{
      console.log("getProjectTimeLong:" + res.data.proj_time)
      this.setData({
        projectTime: res.data.proj_time
      })
    }
    )
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

  }
})