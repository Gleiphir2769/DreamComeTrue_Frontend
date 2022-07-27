// pages/project/project.js
import {
  api
} from '../../api/project-api'
Page({

  data: {
    role: 'user',
    status: {
      unrelated: {
        "text": "可加入",
        "color": "red"
      },
      unverified: {
        "text": "审核中",
        "color": "blue"
      },
      agreed: {
        "text": "已通过",
        "color": "green"
      }
    }
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
  onUnload(){
    this.setData({
      projectLists:[]
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.showLoading({
      title: '获取中',
    })
    let that = this
    let uid = that.data.uid
    let role = wx.getStorageSync('role')
    // 获取能够参加的项目
    api.getProjects(uid).then(res => {
      wx.hideLoading()
      console.log(res, '获取能够参加的项目')
      if (res.data.code === 20000) {
        that.setData({
          projectLists: res.data.data,
          role
        })
      }
    })
  },


  detail(e) {
    let uid = wx.getStorageSync('uid')
    if (uid !== undefined) {
      let item = e.currentTarget.dataset.item
      item = JSON.stringify(item)
      wx.navigateTo({
        url: '../project/projectDetail/projectDetail?item=' + item,
      })
    } else {
      wx.showToast({
        title: '请先登录',
      })
    }
  }
})