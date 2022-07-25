import {myapi} from '../../api/my-api'
import {
  api
} from "../../api/api"
Page({
  data: {
    projectCount: 1,
    teamCount: 24,
    timeCount: 0,
    currentRole: 0,
    roles: ['志愿者', '志愿队伍', '志愿中心'],
    colors:['orange','olive','red'],
    menus: [],
    menuData: [{
      title: '个人资料',
      role: '志愿者'
    },{
        title: '我的队伍',
        role: '志愿者',
        url:'/pages/my/project/project?p=1&title=我的队伍'
      },
      {
        title: '我的项目',
        role: '志愿者',
        url:'/pages/my/project/project?p=2&title=我的项目'
      },
      // {
      //   title: '排行榜',
      //   role: '志愿者',
      //   url:'/pages/my/time/time'
      // },
      {
        title: '我的成员',
        role: '志愿队伍',
        url:'/pages/my/team/member/member'
      },
      {
        title: '加入队伍审核',
        role: '志愿队伍',
        url:'/pages/my/project/project?p=3&title=成员审核'
      },
      {
        title: '加入项目审核',
        role: '志愿队伍',
        url:'/pages/my/project/project?p=4&title=成员审核'
      },
      {
        title: '项目申请',
        role: '志愿队伍',
        url:'/pages/my/team/projectApplication/projectApplication'
      },
      {
        title: '我的项目',
        role: '志愿队伍',
        url:'/pages/my/team/myProject/myProject'
      },
      {
        title: '队伍审核',
        role: '志愿中心',
        url:'/pages/my/project/project?p=6&title=队伍审核'
      },
      {
        title: '项目审核',
        role: '志愿中心',
        url:'/pages/my/project/project?p=7&title=项目审核'
      }
    ],
    flag: true
  },
  loadMenu() {
    let {
      menus,
      menuData,
      role,
    } = this.data
    console.log(role)
    menus = menuData.filter(item => item.role === role)
    this.setData({
      menus
    })
  },
  switchRole() {
    let {
      currentRole
    } = this.data
    currentRole = (currentRole + 1) % 3
    this.setData({
      currentRole
    })
    this.loadMenu()
  },

  onLoad: function (options) {
    this.loadMenu()
    this.setData({
      uid: wx.getStorageSync('uid')
    })
    
  },
  logout() {
    wx.clearStorageSync()
  },


  onShow: function () {
    let that = this
    console.log(wx.getStorageSync('uid'))
    this.getUserInfo()
    let uid = Number(that.data.uid)
    // 查看总时长记录
    myapi.getTotalTime(uid).then(res=>{
      console.log(res, '查看总时长记录')
      if(res.data.code === 20000) {
        that.setData({
          timeCount: res.data.data.total_time
        })
      }
    })
  },
  getUserInfo() {
    let uid = wx.getStorageSync('uid');
    let self=this;
    if (uid) {
      let role=wx.getStorageSync('role')
      api.getUserInfo(uid).then(data => {
        data=data.data.data
        self.setData({
          userInfo:data,
          role
        })
        self.loadMenu()
    
      })
    }else{
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    }
  },
  isLogin() {
    return wx.getStorageSync('uid')
  }


})