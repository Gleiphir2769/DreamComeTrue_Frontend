// pages/team/teamDetail/teamDetail.js
import {
  teamapi
} from '../../../api/team-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: 'user',
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
        "text": "已加入",
        "color": "green"
      },
      "disagreed": {
        "text": "未通过",
        "color": "orange"
      }
    },
    // 队伍详情应该是一个json数组,里面是字典
    teamDetail: [{
      name: 1,
      leader: 1,
      leaderTelephone: 1,
      contactEmail: 1,
      contact: 1,
      contactTelephone: 1,
      organizer: 1,
      headcount: 1,
      serveField: 1,
      area: 1,
      address: 1
    }],
    // 用户uid,这玩意从哪获取？
    uid: 1,
    tid: 1,
  },

  onLoad: function (options) {
    let item = JSON.parse(options.item)
    let role = wx.getStorageSync('role')
    this.setData({
      item,
      role,
      uid: wx.getStorageSync('uid'),
      tid: item.id
    })
  },

  getTeamDetail() {
    let that = this
    let id = that.data.tid
    teamapi.getTeamDetail(id).then(res => {
      console.log(res, '获取队伍详情')
      //   if(res.data.code === 20000) {

      //   }
    })
  },

  // 提交入队申请
  joinTeam() {
    let that = this
    let tid = that.data.tid
    let uid = that.data.uid
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
      })
    }else{
      teamapi.joinTeam(tid, uid).then(res => {
        if (res.data.code === 20000) {
          wx.showToast({
            title: '审核中',
            icon: 'success',
            duration: 2000
          })
          item.joinStatus = "unverified"
          that.setData({
            item
          })
        }
      })
    }
   
  },
})