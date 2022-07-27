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
  chooseRole() {

  },
  onOneClickLogin(e) {
    wx.request({
      url: 'https://dream.cihss.net/wxlogin',
      method: 'POST',
      data: {
        code: e.detail.code
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.setStorageSync('token', res.data.data.token)
        wx.setStorageSync('role', res.data.data.role)
        wx.setStorageSync('uid', res.data.data.uid)
        if (res.data.data.role == "test") {
          wx.showModal({
            title: '第一次注册',
            content: '请选择注册角色',
            confirmColor: "#000000",
            cancelColor: "#000000",
            confirmText: '志愿者',
            cancelText: '志愿队伍',
            success(res2) {
              if (res2.confirm) {
                wx.setStorageSync('role', "user")
                api.updateUserProfile(res.data.data.uid, {}).then(res => {
                  wx.setStorageSync('token', res.data.data.token)
                  wx.setStorageSync('role', res.data.data.role)
                  wx.setStorageSync('uid', res.data.data.uid)
                  wx.showModal({
                    title: '提示',
                    content: '登录成功',
                    cancelText:'返回首页',
                    confirmText:'完善资料',
                    success (res) {
                      if (res.confirm) {
                        wx.navigateTo({
                          url: '/pages/my/profile/profile',
                        })
                      } else if (res.cancel) {
                        wx.switchTab({
                          url: '/pages/index/index',
                        })
                      }
                    }
                  })
                })
              } else if (res2.cancel) {
                wx.setStorageSync('role', "master")
                api.updateUserProfile(res.data.data.uid, {}).then(res => {
                  wx.setStorageSync('token', res.data.data.token)
                  wx.setStorageSync('role', res.data.data.role)
                  wx.setStorageSync('uid', res.data.data.uid)
                  wx.switchTab({
                    url: '/pages/my/my',
                    success: function (e) {
                      var page = getCurrentPages().pop();
                      if (page == undefined || page == null) return;
                      page.onLoad();
                    }
                  })
                })
              }
            }
          })
        } else {
          wx.switchTab({
            url: '/pages/my/my',
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }
      }
    })



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
        icon: 'error',
        title: '手机格式不对',
      })
      wx.hideLoading()
      return
    }
    if (!e.detail.value.password) {
      wx.showToast({
        icon: 'error',
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
          url: '/pages/my/my',
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