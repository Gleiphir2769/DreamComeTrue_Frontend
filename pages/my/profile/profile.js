import {
  api
} from "../../../api/api"
let timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alertVisible: false,
    alertContent: "",
    sexPicker: ['男', '女'],
    date: '2022-07-25',
    userInfo:{},
    modalVisible: false,
    educationPicker: ['本科', '硕士', '博士', '其他']
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
    }, 2000)
  },
  getUserInfo() {
    let uid = wx.getStorageSync('uid');
    let self = this;
    if (uid) {
      api.getUserInfo(uid).then(data => {
        self.setData({
          userInfo:data.data.data
        })

      })
    } else {
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    }
  },
  onUpdate(e) {
    let uid = wx.getStorageSync('uid');
    let data = e.detail.value;
    let {
      sexPicker,
      educationPicker
    } = this.data
    if (data.sex) {
      data.sex = sexPicker[data.sex]
    } else {
      data.sex = sexPicker[0]
    }
    if (data.edcation) {
      data.education = educationPicker[data.education]
    } else {
      data.edcation = educationPicker[0]
    }
    for(let i in data){
      if(!data[i]){
        this.showAlert(`${i} cannot be null`)
        return
      }
    }
    api.updateUserProfile(uid,data).then(res=>{
      console.log(res)
    })

  },
  onLoad(options) {
    
    this.getUserInfo()
  },

})