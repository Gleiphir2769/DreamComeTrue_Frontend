import {
  api
} from "../../api/api"
Page({
  data: {
    projectCount: 1,
    teamCount: 24,
    timeCount: 1,
    userInfo:{},
    role:'',
    rolesDict:{
      'user':'志愿者',
      'master':'志愿队伍',
      'admin':'志愿中心'
    },
    roles: ['user', 'master', 'admin'],
    colors: {
      'user':'orange',
      'master':'olive',
      'admin':'red'
    },
    menus: [],
    menuData: [{
      title: '个人资料',
      role: 'user'
    }, {
      title: '我的队伍',
      role: 'user',
      url: '/pages/my/project/project?p=1&title=我的队伍'
    },
    {
      title: '我的项目',
      role: 'user',
      url: '/pages/my/project/project?p=2&title=我的项目'
    },
    {
      title: '我的时长',
      role: 'user'
    },
    {
      title: '发布项目',
      role: 'master'
    },
    {
      title: '加入队伍审核',
      role: 'master',
      url: '/pages/my/project/project?p=3&title=成员审核'
    },
    {
      title: '加入项目审核',
      role: 'master',
      url: '/pages/my/project/project?p=4&title=成员审核'
    },
    {
      title: '我的项目',
      role: 'master',
      url: '/pages/my/project/project?p=5&title=我的项目'
    },
    {
      title: '队伍审核',
      role: 'admin',
      url: '/pages/my/project/project?p=6&title=队伍审核'
    },
    {
      title: '项目审核',
      role: 'admin',
      url: '/pages/my/project/project?p=7&title=项目审核'
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
    this.getUserInfo()
  
  },
  logout() {
    wx.clearStorage()
  },
  onShow(){
    this.getUserInfo()
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