// pages/team/team.js
import {teamapi} from '../../api/team-api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //队伍列表是个json数组
    teamList : [],
    status:{
      "unrelated":{
        "text":"可加入",
        "color":"red"
      },
      "unverified":{
        "text":"审核中",
        "color":"blue"
      },
      "agreed":{
        "text":"已加入",
        "color":"green"
      },
      "disagreed":{
        "text":"未通过",
        "color":"orange"
      }   
    }
  },
  onShow(){
    this.onLoad()
  },
  onLoad(options) {
    this.getTeamList()
  },

  detail(e) {
    let item = e.currentTarget.dataset.item;
    item = JSON.stringify(item)
    wx.navigateTo({
      url: '../team/teamDetail/teamDetail?item=' + item,
    })
  },

  // 获取队伍列表
  getTeamList(){
    wx.showLoading({
      title: '获取中',
    })
    let that = this
    let uid=wx.getStorageSync('uid')
    teamapi.getTeamList(uid).then(res=>{
     wx.hideLoading()
      if(res.data.code === 20000) {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].createTime = res.data.data[i].createTime.substring(0, 10);
        }
        that.setData({
          teamList: res.data.data
        })
      }
    })
  },



})