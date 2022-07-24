import {api} from "../../api/api"

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

    onLogin(e) {
        let self = this;
        api.login(e.detail.value).then(data => {
            data = data.data
            // login success
            if (data.code === 20000) {
                wx.setStorageSync('token', data.data.token)
                wx.setStorageSync('role', data.data.role)
                wx.setStorageSync('uid', data.data.uid)
                wx.switchTab({
                  url: '../../pages/my/my',
                })
            }
            // login failed
            else {
                self.showAlert(data.message)
            }
        })
    }
})