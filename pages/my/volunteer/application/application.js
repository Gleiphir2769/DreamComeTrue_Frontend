// pages/project/project.js
import {
  api
} from '../../../../api/api'
Page({

  data: {
    Tabs: ['已通过','申请中', '未通过'],
    TabCur: 0,
    status: ['agreed','unverified', 'disagreed'],
  },
  tabSelect(e) {
    let TabCur = e.currentTarget.dataset.id;
    this.setData({
      TabCur: TabCur
    })
    this.loadProjects();
  },

  onLoad(options) {
    this.setData({
      uid: wx.getStorageSync('uid')
    })
  },

  loadProjects() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    let {
      status,
      TabCur
    } = this.data;
    let uid = that.data.uid;
    api.getProjectApplicationList(uid, status[TabCur]).then(res => {
      wx.hideLoading()
      if (res.data.code === 20000) {
        that.setData({
          projectLists: res.data.data
        })
      }
    })
  },

  onShow() {
    this.loadProjects()
  },
  detail(e) {
    let item = e.currentTarget.dataset.item
    item = JSON.stringify(item)
    wx.navigateTo({
      url: '../../../project/projectDetail/projectDetail?item=' + item,
    })
  }
})