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
    alertVisible: false,
    alertContent: '',
    sexPicker: ['男', '女'],
    sexIndex: 0,
    dateTime: '2022-07-25',
    userInfo: {},
    modalVisible: false,
    educationPicker: ['本科', '硕士', '博士', '其他'],
    fieldDict:{
      name:"真实姓名",
      email:"邮箱",
      specialty:'专业特长',
      telephone:'手机号码'
    },
    educationIndex: 3,
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
  getUserInfo() {
    wx.showLoading({
      title: '加载中',
    })
    let uid = wx.getStorageSync('uid');
    let self = this;
    let {
      educationPicker
    } = this.data;
    if (uid) {
      api.getUserInfo(uid).then(data => {
        wx.hideLoading()
        self.setData({
          userInfo: data.data.data,
          sexIndex: data.data.data.sex === '男' ? 0 : 1,
          educationIndex: educationPicker.indexOf(data.data.data.education) === -1 ? 3 : educationPicker.indexOf(data.data.data.education),
          date: data.data.data.birthDate
        })

      })
    } else {
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    }
  },

  checkEamil(val) {
    const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return reg.test(val)
  },
  // onUnload(){
  //   wx.navigateTo({
  //     url: '../../my/my',
  //   })
  // },
  checkPhone(value) {
    const regex = /^1[3456789]\d{9}$/;
    return regex.test(value)
  },
  onUpdate(e) {
    wx.showLoading({
      title: '更新中',
    })
    let uid = wx.getStorageSync('uid');
    let data = e.detail.value;
    let {
      sexPicker,
      sexIndex,
      educationIndex,
      educationPicker,
      dateTime,
      fieldDict
    } = this.data
    data.sex = sexPicker[sexIndex]
    data.education = educationPicker[educationIndex]
    let self = this;
    data.birthDate=dateTime;
    console.log(data)
    for (let i in data) {
      if (!data[i]) {
        this.showAlert(`${fieldDict[i]}不能为空`)
        wx.hideLoading()
        return
      }
    }
    if (!this.checkEamil(data.email)) {
      this.showAlert("邮箱格式不正确")
      wx.hideLoading()
      return
    }
    if (!this.checkPhone(data.telephone)) {
      this.showAlert("电话格式不正确")
      wx.hideLoading()
      return
    }
    api.updateUserProfile(uid, data).then(res => {
      wx.hideLoading()
      if (res.data.code !== 20000) {
        self.showAlert(res.data.message)
      } else {
        wx.showModal({
          title: '提示',
          content: '资料更新成功',
          confirmText:'返回我的',
          success (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/my/my',
              })
            } else if (res.cancel) {
         
            }
          }
        })
        
        // wx.switchTab({
        //   url: '/pages/my/my',
        // })
       
      }
    })

  },
  sexPickerChange(e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
  eduPickerChange(e) {
    this.setData({
      educationIndex: e.detail.value
    })
  },
  datePickerChange(e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  onLoad(options) {

    this.getUserInfo()
  },

})