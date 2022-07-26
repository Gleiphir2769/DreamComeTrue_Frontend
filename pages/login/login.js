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
  checkPassword() {},

  onLogin(e) {
    wx.showLoading({
      title: '加载中',
    })
    let self = this;
    if (!this.checkPhone(e.detail.value.username)) {
      self.showAlert("手机格式不对")
      wx.hideLoading()
      return
    }
    if (!e.detail.value.password) {
      self.showAlert("密码不能为空")
      wx.hideLoading()
      return
    }
    api.login(e.detail.value).then(data => {
      wx.hideLoading()
      data = data.data
      // login success
      if (data.code === 20000) {

        wx.setStorageSync('token', data.data.token)
        console.log(data.data.token)
        wx.setStorageSync('role', data.data.role)
        wx.setStorageSync('uid', data.data.uid)
        wx.switchTab({
          url: '../../pages/my/my',
        })
      }
      // login failed
      else {
        self.showAlert("账号或者密码错误")
      }
    })
  }
})