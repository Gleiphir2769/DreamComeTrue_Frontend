import {
  api
} from "../../api/api"
let timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alertVisible: false,
    alertContent: ''
  },
  checkPhone(value) {
    const regex = /^1[3456789]\d{9}$/;
    return regex.test(value)
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
    }, 1500)
  },
  onRegister(e) {
    wx.showLoading({
      title: '加载中',
    })
    let self = this;
    if (!this.checkPhone(e.detail.value.username)) {
      self.showAlert("手机格式不对～")
      wx.hideLoading()
      return
    }
    if (e.detail.value.password.length < 6) {
      self.showAlert("密码至少为6位")
      wx.hideLoading()
      return
    }
    api.userRegister(e.detail.value).then(data => {
      data = data.data
      wx.hideLoading();
      if (data.code === 20000) {
        api.login(e.detail.value).then(data2 => {
          console.log(data2)
          wx.setStorage({
            key: 'token',
            data: data2.data.data.token,
            success: function (res) {
              wx.setStorage({
                key: 'uid',
                data: data2.data.data.uid,
                success: function (res) {
                  wx.setStorage({
                    key: 'role',
                    data: data2.data.data.role,
                    success: function (res) {
                      wx.showModal({
                        title: '提示',
                        content: '申请成功',
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
                    },
                  })
                },
              })
            },
          })
        })
      } else {
        self.showAlert("手机号已经注册")
      }
    })
  },
  hideModal() {
    this.setData({
      modalVisible: false
    })
  },
  showModal(e) {
    this.setData({
      modalVisible: true
    })
  },

})