// pages/project/project.js
import {
  api
} from '../../../../api/project-api'
Page({

  data: {
    Tabs: ['申请中', '被拒绝', '正在进行中', '已结束'],
    TabCur: 0
  },

  onLoad(options) {
    this.setData({
      uid: wx.getStorageSync('uid')
    })
  },


  onShow() {
    let that = this
    let uid = that.data.uid
    // 获取能够参加的项目
    api.getProjects(uid).then(res => {
      console.log(res, '获取能够参加的项目')
      if (res.data.code === 20000) {
        that.setData({
          projectLists: res.data.data
        })
      }
    })
  },
  detail(e) {
    let item = e.currentTarget.dataset.item
    item = JSON.stringify(item)
    wx.navigateTo({
      url: '../../../project/projectDetail/projectDetail?item=' + item,
    })
  }
})