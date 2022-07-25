// pages/project/project.js
import {
  api
} from '../../../../api/api'
let timer;
Page({

  data: {
    Tabs: ['pending', 'ongoing', 'finished'],
    TabCur: 0,
    status: ['pending', 'ongoing', 'finished'],
    alertVisible:false,
    alertContent:'',
  },
  showAlert(alertContent) {
    let self = this;
    this.setData({
      alertVisible: true,
      alertContent
    })
    timer = setInterval(function () {
      self.setData({
        alertVisible: false,
      })
      clearInterval(timer)
    }, 1000)
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
  formatTime(item) {
    if (parseInt(item) < 10)
      return '0' + item
    return item
  },
  getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = this.formatTime(now.getMonth() + 1);
    var day = this.formatTime(now.getDate());
    var hour = this.formatTime(now.getHours());
    var minute = this.formatTime(now.getMinutes());
    var second = this.formatTime(now.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  },
  onSignIn(e) {
    let uid = this.data.uid;
    let pid = e.target.dataset.pid
    let inTime = this.getDateTime()
    let that=this;
    api.signIn(uid, pid, inTime).then(res => {
      if(res.data.code!==20000){
        that.showAlert("项目已经签到过了～")
      }else{
        that.showAlert("签到成功～")
      }
    })
  },
  onSignOut(e) {
    let uid = this.data.uid;
    let pid = e.target.dataset.pid;
    let that=this;
    let outTime = this.getDateTime()
    api.signOut(uid, pid, outTime).then(res => {
      if(res.data.code!==20000){
        that.showAlert("项目已经签出过了～")
      }else{
        that.showAlert("签出成功～")
      }
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
    api.getProjectList(uid, status[TabCur]).then(res => {
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