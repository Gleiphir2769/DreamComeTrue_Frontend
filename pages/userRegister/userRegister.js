import {api} from "../../api/api"
let timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alertVisible: false,
    alertContent: ''
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
  onRegister(e) {
    let self=this;
    api.userRegister(e.detail.value).then(data=>{
      data=data.data
      if(data.code===20000){
          api.login(e.detail.value).then(data2=>{
            console.log(data2.data.data)
            wx.setStorageSync('token', data2.data.data.token)
            wx.setStorageSync('role', data2.data.data.role)
            wx.setStorageSync('uid', data2.data.data.uid)
            self.showModal()
          })
      }else{
        self.showAlert(data.message)
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