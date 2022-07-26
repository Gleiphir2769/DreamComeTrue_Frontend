// pages/project/project.js
import {
  api
} from '../../../../api/api'
let timer;
Page({

  data: {
    Tabs: ['正在申请中', '正在进行中', '已结束'],
    TabCur: 0,
    status: ['pending', 'ongoing', 'finished'],
    alertVisible:false,
    alertContent:'',
    projectLists:[],
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
    wx.showModal({
      title: '签入',
      content: '是否要签入？',
      success:res=>{
       if (res.confirm) {
        api.signIn(uid, pid, inTime).then(res => {
          if(res.data.code==20000){
            that.showAlert("签入成功～")
          }else if(res.data.code==50006){
            that.showAlert("项目已经签入过了～")
          }else if(res.data.data==50000){
            that.showAlert("项目签入失败～")
          }else{
            that.showAlert("项目签入失败～")
          }
        })
       } else if (res.cancel) {
        console.log('用户点击取消----')
       }
      }
     })
  },
  onSignOut(e) {
    let uid = this.data.uid;
    let pid = e.target.dataset.pid;
    let that=this;
    let outTime = this.getDateTime()
    wx.showModal({
      title: '签出',
      content: '是否要签出？',
      success:res=>{
       if (res.confirm) {
        api.signOut(uid, pid, outTime).then(res => {
          if(res.data.code==20000){
            that.showAlert("签出成功～")
          }else if(res.data.data==50006){
            that.showAlert("项目已经签出过了～")
          }else if(res.data.data==50000){
            that.showAlert("项目签出失败～")
          }else{
            that.showAlert("项目签出失败～")
          }
        })
       } else if (res.cancel) {
        console.log('用户点击取消----')
       }
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
    console.log("detail item: " + item)
    item = JSON.stringify(item)
    let status = this.data.status[this.data.TabCur]
    console.log("status: "+ status)
    wx.navigateTo({
      url: '../../../project/projectDetail/projectDetail?item=' + item + '&status=' + status,
    })
  }
})