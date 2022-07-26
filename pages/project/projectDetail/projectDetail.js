// pages/project/projectDetail/projectDetail.js
import {api} from '../../../api/project-api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      item: {},
      uid: null,
      pid: null,
      status: null,
      role:'user'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow(){
      let role=wx.getStorageSync('role')
      this.setData({
        role
      })
    },
    onLoad: function (options) {
      let item = JSON.parse(options.item)
      this.setData({
          item,
          uid: wx.getStorageSync('uid'),
          pid: item.id
      })
    },
    
    // 加入
    apply() {
        let that = this
        let uid = that.data.uid
        let pid = that.data.pid
        api.apply(uid, pid).then(res=>{
            console.log(res, '加入')
            if(res.data.code === 20000) {
                wx.showToast({
                    title: '加入成功',
                    icon: 'success',
                    duration: 2000,
                })
            }
            else if (res.data.code === 50006) {
              wx.showToast({
                title: '不能重复加入',
                icon: 'error',
                duration: 2000
              })
            }
        })
    }
})