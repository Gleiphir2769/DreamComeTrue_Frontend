// pages/login/login.js
import {
  api
} from "../../api/api"

let timer;
Page({

  data: {
    alertVisible: false,
    alertContent: ''
  },
  onOneClickLogin(e) {
    wx.showModal({
      title: '提示',
      content: '请选择注册角色',
      confirmColor:"#000000",
      cancelColor:"#000000",
      confirmText:'志愿者',
      cancelText:'志愿队伍',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    // wx.showActionSheet({
    //   itemList: ['志愿者', '志愿队伍'],
    //   success (res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail (res) {
    //     console.log(res.errMsg)
    //   }
    // })
    
    // console.log(e)

    // wx.request({
    //   url: 'https://dream.cihss.net/api/login',
    //   method: 'POST',
    //   data: {
    //     code: e.detail.code
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //     // 返回res.data.role 和 res.data.token
    //     if (res.data.role == "test") {
    //       // 第一次登录，与后端沟通后续完善信息事宜
    //     } else {

    //     }
    //   }
    // })
  },
  onLoad(options) {

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
  checkPhone(value) {
    const regex = /^1[3456789]\d{9}$/;
    return regex.test(value)
  },
  goHome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  checkPassword() {},

  onLogin(e) {
    wx.showLoading({
      title: '加载中',
    })
    let self = this;
    if (!this.checkPhone(e.detail.value.username)) {
      wx.showToast({
        icon:'error',
        title: '手机格式不对',
      })
      wx.hideLoading()
      return
    }
    if (!e.detail.value.password) {
      wx.showToast({
        icon:'error',
        title: '密码不能为空',
      })
      wx.hideLoading()
      return
    }
    api.login(e.detail.value).then(data => {
      wx.hideLoading()
      data = data.data
      // login success
      if (data.code === 20000) {

        wx.setStorageSync('token', data.data.token)
        wx.setStorageSync('role', data.data.role)
        wx.setStorageSync('uid', data.data.uid)

        wx.switchTab({
          url: '../../pages/my/my',
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          }
        })
      }
      // login failed
      else {
        self.showAlert("账号或者密码错误")
      }
    })
  }
})