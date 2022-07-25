// pages/project/project.js
import {
  api
} from '../../../../api/api'
Page({

  data: {
    Tabs: ['审核中', '进行中', '已结束','已通过','未通过'],
    TabCur: 0,
    status: ['pending', 'ongoing', 'finished','agreed','disagreed']
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
    let that = this
    let {
      status,
      TabCur
    } = this.data;
    let uid = that.data.uid;
    if(TabCur>=3){
      api.getProjectApplicationList(uid, status[TabCur]).then(res => {
        console.log(1234,res.data.data)
        if (res.data.code === 20000) {
          that.setData({
            projectLists: res.data.data
          })
        }
      })
    }
    else{
      api.getProjectList(uid, status[TabCur]).then(res => {
        console.log(res, '获取能够参加的项目')
        if (res.data.code === 20000) {
          that.setData({
            projectLists: res.data.data
          })
        }
      })
    }
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