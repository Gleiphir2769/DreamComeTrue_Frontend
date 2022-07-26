
// pages/project/project.js
import {
  api
} from '../../../../api/api'
Page({
  data: {
    Tabs : ['已通过','审核中',  '未通过'],
    TabCur:0,
    status:['agreed','unverified','disagreed']
  },
  tabSelect(e) {
    let TabCur = e.currentTarget.dataset.id;
    this.setData({
      TabCur: TabCur
    })
    this.loadTeams();
  },
  loadTeams() {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    let {
      status,
      TabCur
    } = this.data;
    let uid=wx.getStorageSync('uid')
    api.getTeamList( uid,status[TabCur]).then(res => {
      wx.hideLoading()
      if (res.data.code === 20000) {
        that.setData({
          teamLists: res.data.data
        })
      }
    })
  },

  onLoad(options) {
      this.loadTeams()
  },
  detail(e) {
    let item = e.currentTarget.dataset.item
    item = JSON.stringify(item)
    wx.navigateTo({
      url: '../../../team/teamDetail/teamDetail?item=' + item,
    })
  }

})