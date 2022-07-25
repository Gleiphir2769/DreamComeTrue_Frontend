
// pages/project/project.js
import {
  api
} from '../../../../api/api'
Page({
  data: {
    Tabs : ['已报名', '申请中', '被拒绝'],
    TabCur:0,
    status:['unverified','agreed','disagreed']
  },
  tabSelect(e) {
    let TabCur = e.currentTarget.dataset.id;
    this.setData({
      TabCur: TabCur
    })
    this.loadTeams();
  },
  loadTeams() {
    let that = this
    let {
      status,
      TabCur
    } = this.data;
    let uid = wx.getStorageSync('uid');
    api.getTeamList(uid, status[TabCur]).then(res => {
      console.log(res, '获取能够参加的队伍')
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


})