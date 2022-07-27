// pages/project/projectDetail/projectDetail.js
import {
  api
} from '../../../api/project-api'
Page({
  data: {
    item: {},
    status: {
      "unrelated": {
        "text": "可加入",
        "color": "red"
      },
      "unverified": {
        "text": "审核中",
        "color": "blue"
      },
      "agreed": {
        "text": "已通过",
        "color": "green"
      }
    },
    uid: null,
    pid: null,
    role: 'user',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    let role = wx.getStorageSync('role')
    this.setData({
      role
    })
  },
  onLoad: function (options) {
    let item = JSON.parse(options.item)
    console.log(item)
    this.setData({
      item,
      uid: wx.getStorageSync('uid'),
      pid: item.id
    })
  },

  // 加入
  apply() {
    let that = this
    let uid = that.data.uid
    let pid = that.data.pid
    let item = this.data.item
    if (item.joinStatus === "unverified") {
      wx.showToast({
        title: '审核中，请等待',
        icon: 'error',
        duration: 2000
      })
    }else if(item.joinStatus === "agreed"){
      wx.showToast({
        title: '不能重复加入',
        icon: 'error',
        duration: 2000
      })}
      else{
        api.apply(uid, pid).then(res => {

          if (res.data.code === 20000) {
            wx.showToast({
              title: '审核中',
              icon: 'success',
              duration: 2000,
            })
       
            item.joinStatus = "unverified"
            that.setData({
              item
            })
          } 
        })
      }
  
  }
})