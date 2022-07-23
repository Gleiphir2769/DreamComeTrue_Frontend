// pages/login/login.js
const app = getApp();
Page({

  data: {
    username: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    api.login({username:'',password:''}).then(data=>{
     if(data.code===50004){
       alert(data.message)
     }
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

  inputUsername(e) {
    this.setData({
      username: e.detail.value
    })
  },
  
  inputPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },

  login() {
    let that = this
    wx.request({
      url: app.globalData.domain + '/login',
      method: 'POST',
      header: {
        "Content-Type": "multipart/form-data"
      },
      data: {
        username: that.data.username,
        password: that.data.password
      },
      success(res) {
        console.log(res)
      }
    })
  }
})